import { Button, Checkbox, Empty, Form, Input, Select, Space, Spin, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { landingPageService } from '../../services/landingPageService'
import { currency } from '../../utils/formatters'
import {
  BenefitCard,
  BenefitGrid,
  BenefitPanel,
  BenefitTitle,
  Eyebrow,
  FaqGrid,
  FaqItem,
  GalleryGrid,
  GalleryImage,
  HeaderContact,
  HeroDescription,
  HeroImage,
  HeroImageWrap,
  HeroSection,
  HeroText,
  HeroTitle,
  LandingBrand,
  LandingButton,
  LandingCanvas,
  LandingHeader,
  LandingLogo,
  LeadDrawer,
  LeadForm,
  LeadFormActions,
  LeadFormGrid,
  LeadSelectionCard,
  LeadSelectionHint,
  LeadSelectionTitle,
  OfferBadge,
  OfferCompare,
  OfferPrice,
  OfferRow,
  OptionList,
  OptionPill,
  ProductCopy,
  ProductPanel,
  Section,
  SectionHeader,
  SectionTitle,
  StickyCtaBar,
  StickyCtaInner,
  TestimonialCard,
  TestimonialGrid,
} from './styles'

const asOptions = values => (values || []).map(value => ({ label: value, value }))

const getImages = landing => {
  const images = [
    landing?.hero?.image,
    ...(landing?.product?.images || []),
  ].filter(Boolean)

  return [...new Set(images)]
}

const getPrimaryImage = landing => getImages(landing)[0] || ''

const getSelectionLabels = landing => {
  const packItems = landing?.product?.packItems || []

  if (packItems.length) return packItems
  return [landing?.product?.name || landing?.offer?.title || 'Producto']
}

const getBenefits = landing => [
  ...(landing?.product?.benefits || []),
  ...(landing?.sections?.benefits || []),
].filter(Boolean)

const LandingPublicPage = ({ host, initialLanding = null }) => {
  const { slug } = useParams()
  const [form] = Form.useForm()
  const [landing, setLanding] = useState(initialLanding)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(!initialLanding)
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const loadLanding = useCallback(async () => {
    if (initialLanding) {
      setLanding(initialLanding)
      setLoading(false)
      return
    }

    if (!slug && !host) {
      setLanding(null)
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const response = host
        ? await landingPageService.resolvePublic({ host })
        : await landingPageService.getPublicBySlug(slug)
      setLanding(response.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar la landing')
    } finally {
      setLoading(false)
    }
  }, [host, initialLanding, slug])

  useEffect(() => {
    loadLanding()
  }, [loadLanding])

  const images = useMemo(() => getImages(landing), [landing])
  const primaryImage = getPrimaryImage(landing)
  const selectionLabels = getSelectionLabels(landing)
  const colorOptions = asOptions(landing?.product?.colors)
  const sizeOptions = asOptions(landing?.product?.sizes)
  const benefits = getBenefits(landing)
  const logoUrl = getUploadUrl(UPLOAD_ROUTES.landings.logos, landing?.brand?.logo)
  const heroImageUrl = getUploadUrl(UPLOAD_ROUTES.landings.images, primaryImage)
  const whatsappUrl = landing?.brand?.whatsapp
    ? `https://wa.me/${String(landing.brand.whatsapp).replace(/\D/g, '')}`
    : ''

  const openLeadDrawer = () => {
    setSubmitted(false)
    setDrawerOpen(true)
  }

  const closeLeadDrawer = () => {
    setDrawerOpen(false)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      await landingPageService.createLead(landing?.slug || slug, {
        customer: values.customer,
        selections: values.selections || [],
        message: values.message,
        termsAccepted: values.termsAccepted,
        estimatedValue: landing?.offer?.price || 0,
      })

      setSubmitted(true)
      form.resetFields()
      message.success(landing?.formSettings?.successMessage || 'Solicitud enviada correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo enviar la solicitud')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <LandingCanvas>
        <Section>
          <Spin />
        </Section>
      </LandingCanvas>
    )
  }

  if (!landing) {
    return (
      <LandingCanvas>
        <Section>
          <Empty description="Landing no disponible" />
        </Section>
      </LandingCanvas>
    )
  }

  return (
    <LandingCanvas $theme={landing.theme}>
      <LandingHeader>
        <LandingBrand>
          {logoUrl ? (
            <LandingLogo src={logoUrl} alt={landing.brand?.name || landing.name} />
          ) : (
            landing.brand?.name || landing.name
          )}
        </LandingBrand>
        {whatsappUrl && (
          <HeaderContact href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </HeaderContact>
        )}
      </LandingHeader>

      <HeroSection $template={landing.template}>
        <HeroText>
          {landing.hero?.eyebrow && <Eyebrow>{landing.hero.eyebrow}</Eyebrow>}
          <HeroTitle>{landing.hero?.title || landing.product?.name || landing.name}</HeroTitle>
          {landing.hero?.subtitle && <HeroDescription>{landing.hero.subtitle}</HeroDescription>}

          <OfferRow>
            <OfferPrice>{currency(landing.offer?.price)}</OfferPrice>
            {landing.offer?.compareAtPrice > landing.offer?.price && (
              <OfferCompare>{currency(landing.offer.compareAtPrice)}</OfferCompare>
            )}
            {landing.offer?.badge && <OfferBadge>{landing.offer.badge}</OfferBadge>}
          </OfferRow>

          <Space size="middle" wrap>
            <LandingButton size="large" onClick={openLeadDrawer}>
              {landing.hero?.ctaText || 'Comprar ahora'}
            </LandingButton>
            {landing.offer?.title && <Typography.Text>{landing.offer.title}</Typography.Text>}
          </Space>
        </HeroText>

        {heroImageUrl && (
          <HeroImageWrap>
            <HeroImage src={heroImageUrl} alt={landing.product?.name || landing.name} />
          </HeroImageWrap>
        )}
      </HeroSection>

      <Section>
        <ProductPanel>
          <ProductCopy bordered={false}>
            <SectionHeader>
              <SectionTitle level={2}>{landing.product?.name || landing.offer?.title || landing.name}</SectionTitle>
            </SectionHeader>

            {landing.product?.description && (
              <Typography.Paragraph>{landing.product.description}</Typography.Paragraph>
            )}

            {!!landing.product?.packItems?.length && (
              <>
                <Typography.Text strong>Incluye</Typography.Text>
                <OptionList>
                  {landing.product.packItems.map(item => <OptionPill key={item}>{item}</OptionPill>)}
                </OptionList>
              </>
            )}

            {!!landing.product?.colors?.length && (
              <>
                <Typography.Text strong>Colores</Typography.Text>
                <OptionList>
                  {landing.product.colors.map(item => <OptionPill key={item}>{item}</OptionPill>)}
                </OptionList>
              </>
            )}

            {!!landing.product?.sizes?.length && (
              <>
                <Typography.Text strong>Tallas</Typography.Text>
                <OptionList>
                  {landing.product.sizes.map(item => <OptionPill key={item}>{item}</OptionPill>)}
                </OptionList>
              </>
            )}
          </ProductCopy>

          {!!benefits.length && (
            <BenefitPanel bordered={false}>
              <BenefitTitle>Beneficios del producto</BenefitTitle>
              <BenefitGrid>
                {benefits.slice(0, 6).map(benefit => (
                  <BenefitCard key={benefit}>{benefit}</BenefitCard>
                ))}
              </BenefitGrid>
            </BenefitPanel>
          )}
        </ProductPanel>
      </Section>

      {images.length > 1 && (
        <Section>
          <SectionHeader>
            <SectionTitle level={2}>Mira los detalles</SectionTitle>
          </SectionHeader>
          <GalleryGrid>
            {images.map(image => (
              <GalleryImage
                key={image}
                src={getUploadUrl(UPLOAD_ROUTES.landings.images, image)}
                alt={landing.product?.name || landing.name}
              />
            ))}
          </GalleryGrid>
        </Section>
      )}

      {!!landing.sections?.testimonials?.length && (
        <Section>
          <SectionHeader>
            <SectionTitle level={2}>Clientes felices</SectionTitle>
          </SectionHeader>
          <TestimonialGrid>
            {landing.sections.testimonials.map(item => (
              <TestimonialCard key={`${item.name}-${item.text}`} bordered={false}>
                <Typography.Paragraph>{item.text}</Typography.Paragraph>
                <Typography.Text strong>{item.name}</Typography.Text>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </Section>
      )}

      {(landing.sections?.guarantee || landing.sections?.faqs?.length > 0) && (
        <Section>
          <SectionHeader>
            <SectionTitle level={2}>Compra con tranquilidad</SectionTitle>
            {landing.sections?.guarantee && (
              <Typography.Paragraph>{landing.sections.guarantee}</Typography.Paragraph>
            )}
          </SectionHeader>

          {!!landing.sections?.faqs?.length && (
            <FaqGrid>
              {landing.sections.faqs.map(item => (
                <FaqItem key={`${item.question}-${item.answer}`} bordered={false}>
                  <Typography.Text strong>{item.question}</Typography.Text>
                  <Typography.Paragraph>{item.answer}</Typography.Paragraph>
                </FaqItem>
              ))}
            </FaqGrid>
          )}
        </Section>
      )}

      <StickyCtaBar>
        <StickyCtaInner>
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{landing.offer?.title || landing.product?.name || landing.name}</Typography.Text>
            <Typography.Text>{currency(landing.offer?.price)}</Typography.Text>
          </Space>
          <LandingButton onClick={openLeadDrawer}>
            {landing.hero?.ctaText || 'Comprar ahora'}
          </LandingButton>
        </StickyCtaInner>
      </StickyCtaBar>

      <LeadDrawer
        title={submitted ? 'Solicitud recibida' : 'Completa tus datos'}
        open={drawerOpen}
        onClose={closeLeadDrawer}
        width={520}
      >
        {submitted ? (
          <Space direction="vertical" size="middle">
            <Typography.Title level={3}>Listo</Typography.Title>
            <Typography.Paragraph>
              {landing.formSettings?.successMessage || 'Recibimos tu solicitud. Te contactaremos muy pronto.'}
            </Typography.Paragraph>
            <Button type="primary" onClick={closeLeadDrawer}>Cerrar</Button>
          </Space>
        ) : (
          <LeadForm form={form} layout="vertical" onFinish={handleSubmit}>
            {selectionLabels.map((label, index) => (
              <LeadSelectionCard key={`${label}-${index}`}>
                <Form.Item label={label} name={['selections', index, 'label']} initialValue={label} hidden>
                  <Input />
                </Form.Item>
                <LeadSelectionTitle>{label}</LeadSelectionTitle>
                <LeadSelectionHint>Escoge las opciones para este item.</LeadSelectionHint>
                <LeadFormGrid>
                  {!!colorOptions.length && (
                    <Form.Item label="Color" name={['selections', index, 'color']} rules={[{ required: true }]}>
                      <Select options={colorOptions} />
                    </Form.Item>
                  )}
                  {!!sizeOptions.length && (
                    <Form.Item label="Talla" name={['selections', index, 'size']} rules={[{ required: true }]}>
                      <Select options={sizeOptions} />
                    </Form.Item>
                  )}
                  {!colorOptions.length && !sizeOptions.length && (
                    <Typography.Text type="secondary">Sin opciones adicionales.</Typography.Text>
                  )}
                </LeadFormGrid>
              </LeadSelectionCard>
            ))}

            <LeadFormGrid>
              <Form.Item label="Nombre" name={['customer', 'firstName']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Apellidos" name={['customer', 'lastName']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </LeadFormGrid>

            <LeadFormGrid>
              <Form.Item label="WhatsApp" name={['customer', 'whatsapp']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Correo electronico" name={['customer', 'email']} rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
            </LeadFormGrid>

            <LeadFormGrid>
              <Form.Item label="Departamento" name={['customer', 'department']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Ciudad" name={['customer', 'city']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </LeadFormGrid>

            <LeadFormGrid>
              <Form.Item label="Barrio" name={['customer', 'neighborhood']}>
                <Input />
              </Form.Item>
              <Form.Item label="Direccion" name={['customer', 'address']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </LeadFormGrid>

            <Form.Item label="Complemento" name={['customer', 'addressExtra']}>
              <Input placeholder="Torre, bloque, apartamento o indicaciones" />
            </Form.Item>

            <Form.Item label="Notas" name="message">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="termsAccepted"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Debes aceptar terminos y tratamiento de datos'))
                  ),
                },
              ]}
            >
              <Checkbox>
                Acepto terminos, condiciones y tratamiento de datos.
              </Checkbox>
            </Form.Item>

            <LeadFormActions>
              <LandingButton htmlType="submit" loading={saving} block>
                Enviar solicitud
              </LandingButton>
            </LeadFormActions>
          </LeadForm>
        )}
      </LeadDrawer>
    </LandingCanvas>
  )
}

export default LandingPublicPage
