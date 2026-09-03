import { useState } from 'react'
import { UPLOAD_ROUTES, getUploadUrl } from '../../../constants/uploadRoutes'
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

const buildOptionState = product =>
  Object.fromEntries(
    (product?.options || [])
      .filter(option => option?.key)
      .map(option => [option.key, ''])
  )

const SectionConversion = ({ landing, section, isPreview, onSubmit }) => {
  const conversion = resolveConversion(landing)
  const products = conversion.products || []
  const isOrder = conversion.mode === 'order' || landing?.landingType === 'product'
  const isLeadMode = !isOrder

  const productItems = (products || []).map(product => ({
    product,
    quantity: 1,
    options: buildOptionState(product),
  }))

  const [orderItems, setOrderItems] = useState(productItems)
  const [values, setValues] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fields = conversion.fields || []
  const title = section?.data?.title || conversion.title || 'Completa tus datos'
  const subtitle = section?.data?.subtitle || conversion.subtitle || ''
  const sideImage = section?.data?.sideImage || products?.[0]?.image || ''
  const note = section?.data?.note || ''
  const variant = section?.settings?.variant || 'sideCard'

  const updateValue = (key, value) => {
    setValues(current => ({ ...current, [key]: value }))
  }

  const updateProductOption = (productKey, optionKey, value) => {
    setOrderItems(items =>
      items.map(item => {
        if (item.product.key !== productKey) return item
        return { ...item, options: { ...item.options, [optionKey]: value } }
      })
    )
  }

  const updateQuantity = (productKey, quantity) => {
    setOrderItems(items =>
      items.map(item =>
        item.product.key === productKey ? { ...item, quantity: Math.max(Number(quantity) || 1, 1) } : item
      )
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
          key: item.product.key,
          label: item.product.name,
          quantity: item.quantity,
          options: Object.entries(item.options)
            .filter(([, value]) => value)
            .map(([key, value]) => {
              const option = (item.product.options || []).find(optionItem => optionItem.key === key)
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
    }
  }

  const total = orderItems.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  )

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)

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
        ;(item.product.options || []).forEach(option => {
          if (option.required && !item.options[option.key]) {
            missingOptions.push(`${item.product.name}: ${option.label || option.key}`)
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
      await onSubmit?.(buildPayload())
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
          {orderItems.map(item => (
            <div key={item.product.key} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 16, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
                {item.product.image || item.product.images?.[0] ? (
                  <div style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', flex: '0 0 auto' }}>
                    <img
                      src={toImage(item.product.image || item.product.images[0], UPLOAD_ROUTES.landings.images)}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800 }}>{item.product.name}</div>
                  {item.product.description && (
                    <div style={{ color: 'var(--lp-muted)', fontSize: '0.86rem' }}>{item.product.description}</div>
                  )}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 8 }}>
                    <strong>{formatCurrency(item.product.price)}</strong>
                    {item.product.compareAtPrice > item.product.price && (
                      <span style={{ color: 'var(--lp-muted)', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                        {formatCurrency(item.product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ flex: '0 0 auto' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    disabled={isPreview}
                    onChange={event => updateQuantity(item.product.key, event.target.value)}
                    style={{ width: 64, minHeight: 36, marginLeft: 6, borderRadius: 8, border: '1px solid rgba(0,0,0,0.16)', padding: '0 8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                {(item.product.options || []).map(option => {
                  const selected = item.options[option.key]

                  return (
                    <div key={option.key}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 6 }}>
                        {option.label || option.key}
                        {option.required && <span style={{ color: 'var(--lp-accent)' }}> *</span>}
                      </div>

                      {option.control === 'color' ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {(option.options || []).map(choice => (
                            <button
                              type="button"
                              key={choice.value}
                              onClick={() => updateProductOption(item.product.key, option.key, choice.value)}
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
                              onClick={() => updateProductOption(item.product.key, option.key, choice.value)}
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
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', paddingTop: 14 }}>
            <span>Total ({totalItems} item{totalItems === 1 ? '' : 's'})</span>
            <span>{formatCurrency(total)}</span>
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
        style={{
          display: 'grid',
          gridTemplateColumns: sideImage || isLeadMode ? 'minmax(0, 1fr) minmax(360px, 0.8fr)' : '1fr',
          gap: 40,
          alignItems: 'center',
        }}
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
