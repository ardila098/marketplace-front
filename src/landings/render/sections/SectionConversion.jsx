import { useState } from 'react'
import { UPLOAD_ROUTES, getUploadUrl } from '../../../constants/uploadRoutes'
import {
  LANDING_PAYMENT_METHODS,
  LANDING_WOMPI_DISCOUNT_PERCENT,
} from '../../../constants/landingPages'
import { currency as formatCurrency } from '../../../utils/formatters'
import { resolveConversion } from '../../defaults'
import {
  LpButton,
  LpCard,
  LpCheckboxLabel,
  LpContainer,
  LpField,
  LpFieldGrid,
  LpForm,
  LpInput,
  LpMediaFrame,
  LpSection,
  LpSubtitle,
  LpTextarea,
  LpTitle,
} from '../LandingStyles'

const CUSTOMER_KEYS = [
  'fullName',
  'firstName',
  'lastName',
  'email',
  'phone',
  'whatsapp',
  'department',
  'city',
  'neighborhood',
  'address',
  'addressExtra',
]

const toImage = (fileName, route) => getUploadUrl(route, fileName)

const buildOptionState = source =>
  Object.fromEntries(
    (source?.options || [])
      .filter(option => option?.key)
      .map(option => [option.key, ''])
  )

const SectionConversion = ({ landing, section, isPreview, onSubmit }) => {
  const conversion = resolveConversion(landing)
  const products = conversion.products || []
  const isOrder = conversion.mode === 'order' || landing?.landingType === 'product'
  const isLeadMode = !isOrder

  const productItems = (products || []).flatMap(product => {
    const packItems = product.packItems?.length ? product.packItems : []

    if (!packItems.length) {
      return [{ product, packItem: null, quantity: 1, options: buildOptionState(product) }]
    }

    return packItems.map(packItem => ({
      product,
      packItem,
      quantity: 1,
      options: buildOptionState(packItem),
    }))
  })

  const [orderItems, setOrderItems] = useState(productItems)
  const [values, setValues] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(
    isOrder ? LANDING_PAYMENT_METHODS.WOMPI.value : null
  )

  const fields = conversion.fields || []
  const title = section?.data?.title || conversion.title || 'Completa tus datos'
  const subtitle = section?.data?.subtitle || conversion.subtitle || ''
  const sideImage = section?.data?.sideImage || products?.[0]?.image || ''
  const note = section?.data?.note || ''
  const variant = section?.settings?.variant || 'sideCard'

  const updateValue = (key, value) => {
    setValues(current => ({ ...current, [key]: value }))
  }

  const updateProductOption = (productKey, itemKey, optionKey, value) => {
    setOrderItems(items =>
      items.map(item => {
        if (item.product.key !== productKey) return item
        const currentItemKey = item.packItem?.key || ''
        if (currentItemKey !== (itemKey || '')) return item
        return { ...item, options: { ...item.options, [optionKey]: value } }
      })
    )
  }

  const updateQuantity = (productKey, itemKey, quantity) => {
    setOrderItems(items =>
      items.map(item => {
        if (item.product.key !== productKey) return item
        const currentItemKey = item.packItem?.key || ''
        if (currentItemKey !== (itemKey || '')) return item
        return { ...item, quantity: Math.max(Number(quantity) || 1, 1) }
      })
    )
  }

  const buildPayload = () => {
    const customer = {}
    const answers = []

    fields.forEach(field => {
      const value = values[field.key] || ''

      if (CUSTOMER_KEYS.includes(field.key)) {
        customer[field.key] = value
      } else {
        answers.push({ key: field.key, label: field.label, value })
      }
    })

    const items = isOrder
      ? orderItems.map(item => ({
          productKey: item.product.key,
          itemKey: item.packItem?.key || '',
          label: item.packItem?.name || item.product.name,
          quantity: item.packItem ? 1 : item.quantity,
          options: Object.entries(item.options)
            .filter(([, value]) => value)
            .map(([key, value]) => {
              const source = item.packItem || item.product
              const option = (source.options || []).find(optionItem => optionItem.key === key)
              const choice = (option?.options || []).find(itemChoice => itemChoice.value === value)
              return { key, label: option?.label || key, value: choice?.label || value }
            }),
        }))
      : []

    return {
      customer,
      answers,
      items,
      message: values.message || '',
      termsAccepted,
      paymentMethod: isOrder ? paymentMethod : undefined,
    }
  }

  const countedPacks = new Set()
  const total = orderItems.reduce((sum, item) => {
    const price = Number(item.product.price) || 0

    if (item.packItem) {
      if (countedPacks.has(item.product.key)) return sum
      countedPacks.add(item.product.key)
      return sum + price
    }

    return sum + price * item.quantity
  }, 0)

  const wompiDiscount =
    paymentMethod === LANDING_PAYMENT_METHODS.WOMPI.value
      ? Math.round((total * LANDING_WOMPI_DISCOUNT_PERCENT) / 100)
      : 0
  const payableTotal = Math.max(total - wompiDiscount, 0)

  const packGroups = new Set(
    orderItems.filter(item => item.packItem).map(item => item.product.key)
  )
  const totalItems =
    packGroups.size +
    orderItems.filter(item => !item.packItem).reduce((sum, item) => sum + item.quantity, 0)

  const handleSubmit = async event => {
    event?.preventDefault()
    setError('')

    const requiredMissing = fields
      .filter(field => field.required)
      .filter(field => {
        const value = values[field.key]
        return !value || !String(value).trim()
      })
      .map(field => field.label)

    if (requiredMissing.length) {
      setError(`Completa los campos: ${requiredMissing.join(', ')}`)
      return
    }

    if (!termsAccepted) {
      setError('Debes aceptar términos y tratamiento de datos')
      return
    }

    if (isOrder) {
      const missingOptions = []
      orderItems.forEach(item => {
        const source = item.packItem || item.product
        const entityLabel = item.packItem?.name || item.product.name
        ;(source.options || []).forEach(option => {
          if (option.required && !item.options[option.key]) {
            missingOptions.push(`${entityLabel}: ${option.label || option.key}`)
          }
        })
      })

      if (missingOptions.length) {
        setError(`Debes escoger: ${missingOptions.join(', ')}`)
        return
      }
    }

    if (isPreview) return

    setSaving(true)

    try {
      const response = await onSubmit?.(buildPayload())

      if (response?.data?.paymentCheckout?.paymentUrl) {
        window.location.href = response.data.paymentCheckout.paymentUrl
        return
      }

      setSubmitted(true)
    } catch (submitError) {
      setError(submitError?.message || 'No se pudo enviar la solicitud')
    } finally {
      setSaving(false)
    }
  }

  if (submitted) {
    return (
      <LpSection>
        <LpContainer style={{ maxWidth: 680 }}>
          <LpCard $cardStyle="rounded" style={{ padding: 'clamp(28px, 6vw, 64px)', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <LpTitle as="h2">{conversion.successTitle || '¡Listo!'}</LpTitle>
            <LpSubtitle $center style={{ margin: '14px auto 0' }}>
              {conversion.successMessage || 'Recibimos tu solicitud. Te contactaremos muy pronto.'}
            </LpSubtitle>
            {landing?.brand?.whatsapp ? (
              <a
                href={`https://wa.me/${String(landing.brand.whatsapp).replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 20,
                  padding: '11px 20px',
                  borderRadius: 999,
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                Escríbenos por WhatsApp
              </a>
            ) : null}
          </LpCard>
        </LpContainer>
      </LpSection>
    )
  }

  const formContent = (
    <LpCard
      $cardStyle={variant === 'sideCard' ? 'shadow' : 'bordered'}
      style={{ padding: 'clamp(22px, 3vw, 36px)', width: '100%' }}
    >
      {isOrder && products?.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          {orderItems.map((item, index) => {
            const entity = item.packItem || item.product
            const entityName = item.packItem?.name || item.product.name
            const image = entity.image || item.product.image || item.product.images?.[0]
            const isPackLead =
              item.packItem &&
              orderItems.findIndex(candidate => candidate.product.key === item.product.key) === index
            const isPackProduct = Boolean(item.packItem)

            return (
            <div
              key={`${item.product.key}-${item.packItem?.key || 'producto'}`}
              style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 16, marginBottom: 14 }}
            >
              <div className="LpPackItemHead">
                {image ? (
                  <div style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', flex: '0 0 auto' }}>
                    <img
                      src={toImage(image, UPLOAD_ROUTES.landings.images)}
                      alt={entityName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {item.packItem && item.product.name ? (
                    <div style={{ color: 'var(--lp-muted)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.product.name}
                    </div>
                  ) : null}
                  <div style={{ fontWeight: 800 }}>{entityName}</div>
                  {(entity.description || item.product.description) && (
                    <div style={{ color: 'var(--lp-muted)', fontSize: '0.86rem' }}>
                      {entity.description || item.product.description}
                    </div>
                  )}
                  {(!isPackProduct || isPackLead) && (
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 8 }}>
                      <strong>{formatCurrency(item.product.price)}</strong>
                      {item.product.compareAtPrice > item.product.price && (
                        <span style={{ color: 'var(--lp-muted)', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                          {formatCurrency(item.product.compareAtPrice)}
                        </span>
                      )}
                      {isPackProduct && item.product.badge ? (
                        <span style={{ color: 'var(--lp-accent)', fontSize: '0.8rem', fontWeight: 800 }}>{item.product.badge}</span>
                      ) : null}
                    </div>
                  )}
                </div>
                {!isPackProduct ? (
                  <div style={{ flex: '0 0 auto' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    disabled={isPreview}
                    onChange={event => updateQuantity(item.product.key, '', event.target.value)}
                    style={{ width: 64, minHeight: 36, marginLeft: 6, borderRadius: 8, border: '1px solid rgba(0,0,0,0.16)', padding: '0 8px' }}
                  />
                  </div>
                ) : (
                  <span style={{ color: 'var(--lp-muted)', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Incluido en el pack
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                {(entity.options || []).map(option => {
                  const selected = item.options[option.key]

                  return (
                    <div key={option.key}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 6 }}>
                        {option.label || option.key}
                        {isPackProduct && item.packItem?.name ? ` · ${item.packItem.name}` : ''}
                        {option.required && <span style={{ color: 'var(--lp-accent)' }}> *</span>}
                      </div>

                      {option.control === 'color' ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {(option.options || []).map(choice => (
                            <button
                              type="button"
                              key={choice.value}
                              onClick={() => updateProductOption(item.product.key, item.packItem?.key || '', option.key, choice.value)}
                              aria-label={choice.label}
                              title={choice.label}
                              disabled={isPreview}
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: 999,
                                border: selected === choice.value ? '3px solid var(--lp-primary)' : '1px solid rgba(0,0,0,0.16)',
                                background: choice.hex || '#eee',
                                cursor: 'pointer',
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {(option.options || []).map(choice => (
                            <button
                              type="button"
                              key={choice.value}
                              onClick={() => updateProductOption(item.product.key, item.packItem?.key || '', option.key, choice.value)}
                              disabled={isPreview}
                              style={{
                                minHeight: 34,
                                padding: '0 14px',
                                borderRadius: 999,
                                border: selected === choice.value ? '2px solid var(--lp-primary)' : '1px solid rgba(0,0,0,0.18)',
                                background: selected === choice.value ? 'var(--lp-primary)' : 'var(--lp-bg)',
                                color: selected === choice.value ? '#fff' : 'var(--lp-text)',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              {choice.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            )
          })}

          <div className="LpTotalRow">
            <span>Total ({totalItems} item{totalItems === 1 ? '' : 's'})</span>
            <span>
              {paymentMethod === LANDING_PAYMENT_METHODS.WOMPI.value && wompiDiscount > 0 ? (
                <span style={{ color: 'var(--lp-muted)', textDecoration: 'line-through', marginRight: 8, fontSize: '0.9rem' }}>
                  {formatCurrency(total)}
                </span>
              ) : null}
              {formatCurrency(payableTotal)}
            </span>
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 18, padding: '16px 0 4px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 2 }}>
              ¿Cómo quieres pagar?
            </div>
            <div className="LpPaymentMethods">
              <button
                type="button"
                onClick={() => setPaymentMethod(LANDING_PAYMENT_METHODS.WOMPI.value)}
                disabled={isPreview}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  border:
                    paymentMethod === LANDING_PAYMENT_METHODS.WOMPI.value
                      ? '2px solid var(--lp-primary)'
                      : '1px solid rgba(0,0,0,0.16)',
                  background:
                    paymentMethod === LANDING_PAYMENT_METHODS.WOMPI.value
                      ? 'color-mix(in srgb, var(--lp-primary) 8%, transparent)'
                      : 'transparent',
                }}
              >
                <strong>Pagar con Wompi</strong>
                <div style={{ color: 'var(--lp-muted)', fontSize: '0.78rem' }}>
                  En línea · {LANDING_WOMPI_DISCOUNT_PERCENT}% de descuento
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod(LANDING_PAYMENT_METHODS.CASH_ON_DELIVERY.value)}
                disabled={isPreview}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  border:
                    paymentMethod === LANDING_PAYMENT_METHODS.CASH_ON_DELIVERY.value
                      ? '2px solid var(--lp-primary)'
                      : '1px solid rgba(0,0,0,0.16)',
                  background:
                    paymentMethod === LANDING_PAYMENT_METHODS.CASH_ON_DELIVERY.value
                      ? 'color-mix(in srgb, var(--lp-primary) 8%, transparent)'
                      : 'transparent',
                }}
              >
                <strong>Contra entrega</strong>
                <div style={{ color: 'var(--lp-muted)', fontSize: '0.78rem' }}>
                  Pagas cuando recibes
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <LpForm onSubmit={handleSubmit} noValidate>
        <LpFieldGrid>
          {fields.map(field => {
            const full = !field.halfWidth
            const value = values[field.key] || ''

            if (field.type === 'textarea') {
              return (
                <LpField key={field.key} $full>
                  {field.label}
                  {field.required && ' *'}
                  <LpTextarea
                    value={value}
                    disabled={isPreview}
                    placeholder={field.placeholder}
                    rows={3}
                    onChange={event => updateValue(field.key, event.target.value)}
                  />
                </LpField>
              )
            }

            return (
              <LpField key={field.key} $full={full}>
                {field.label}
                {field.required && ' *'}
                <LpInput
                  type={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : field.type === 'date' ? 'date' : 'text'}
                  value={value}
                  disabled={isPreview}
                  placeholder={field.placeholder}
                  onChange={event => updateValue(field.key, event.target.value)}
                />
              </LpField>
            )
          })}
        </LpFieldGrid>

        <LpCheckboxLabel>
          <input
            type="checkbox"
            checked={termsAccepted}
            disabled={isPreview}
            onChange={event => setTermsAccepted(event.target.checked)}
          />
          <span>
            {conversion.termsUrl ? (
              <a href={conversion.termsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                {conversion.termsLabel || 'Acepto términos y tratamiento de datos'}
              </a>
            ) : (
              conversion.termsLabel || 'Acepto términos y tratamiento de datos'
            )}
          </span>
        </LpCheckboxLabel>

        {error && <div style={{ color: '#dc2626', fontSize: '0.88rem' }}>{error}</div>}

        <LpButton as="button" type="submit" $variant="accent" disabled={isPreview || saving} style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
          {saving ? 'Enviando…' : conversion.ctaLabel || 'Enviar solicitud'}
        </LpButton>

        {note && <div style={{ textAlign: 'center', color: 'var(--lp-muted)', fontSize: '0.85rem' }}>{note}</div>}
      </LpForm>
    </LpCard>
  )

  if (variant === 'centered') {
    return (
      <LpSection>
        <LpContainer style={{ maxWidth: 720, textAlign: 'center', display: 'grid', justifyItems: 'center' }}>
          {section?.data?.eyebrow && <div style={{ color: 'var(--lp-primary)', fontWeight: 800 }}>{section.data.eyebrow}</div>}
          <LpTitle as="h2" style={{ marginTop: 12 }}>{title}</LpTitle>
          {subtitle && <LpSubtitle $center>{subtitle}</LpSubtitle>}
          <div style={{ width: '100%', marginTop: 28, textAlign: 'left' }}>{formContent}</div>
        </LpContainer>
      </LpSection>
    )
  }

  return (
    <LpSection>
      <LpContainer
        className={sideImage || isLeadMode ? 'LpConversionGrid' : ''}
        style={sideImage || isLeadMode ? undefined : { display: 'block' }}
      >
        {sideImage || isLeadMode ? (
          <div style={{ minWidth: 0 }}>
            {section?.data?.eyebrow && <div style={{ color: 'var(--lp-primary)', fontWeight: 800, marginBottom: 12 }}>{section.data.eyebrow}</div>}
            <LpTitle as="h2">{title}</LpTitle>
            {subtitle && <LpSubtitle>{subtitle}</LpSubtitle>}
            {sideImage ? (
              <LpMediaFrame style={{ marginTop: 26, maxWidth: 460 }} $ratio="4 / 5">
                <img
                  src={toImage(sideImage, UPLOAD_ROUTES.landings.images)}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </LpMediaFrame>
            ) : null}
          </div>
        ) : null}

        {formContent}
      </LpContainer>
    </LpSection>
  )
}

export default SectionConversion
