import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, Select, Space, Switch, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import {
  LANDING_DOMAIN_STATUS,
  LANDING_DOMAIN_STATUS_OPTIONS,
  LANDING_PAGE_STATUS,
  LANDING_PAGE_STATUS_OPTIONS,
  LANDING_PAGE_TEMPLATE_OPTIONS,
  getLandingDomainStatusColor,
  getLandingDomainStatusLabel,
  getLandingStatusColor,
  getLandingStatusLabel,
} from '../../constants/landingPages'
import { ROLES } from '../../constants/roles'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { useAuth } from '../../hooks/useAuth'
import { landingPageService } from '../../services/landingPageService'
import {
  FieldGrid,
  FullWidthInputNumber,
  ImagePlaceholder,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  ThumbnailImage,
  Toolbar,
} from '../../styles/dashboardStyles'
import { currency } from '../../utils/formatters'
import {
  ColorGrid,
  DashboardFormSection,
  DashboardSectionTitle,
  PublicPathText,
} from './styles'

const arrayToText = values => (values || []).join(', ')
const textToArray = value => String(value || '').split(',').map(item => item.trim()).filter(Boolean)

const pairsToText = (values = [], leftKey, rightKey) => (
  values.map(item => [item?.[leftKey], item?.[rightKey]].filter(Boolean).join(' | ')).join('\n')
)

const textToPairs = (value, leftKey, rightKey) => (
  String(value || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [left, ...rightParts] = line.split('|')

      return {
        [leftKey]: String(left || '').trim(),
        [rightKey]: rightParts.join('|').trim(),
      }
    })
    .filter(item => item[leftKey] || item[rightKey])
)

const getPublicUrl = landing => {
  if (landing?.domain?.url) return landing.domain.url
  if (!landing?.slug) return ''

  return `${window.location.origin}/l/${landing.slug}`
}

const getFormValues = landing => ({
  name: landing?.name,
  slug: landing?.slug,
  template: landing?.template || 'product_focus',
  status: landing?.status || LANDING_PAGE_STATUS.DRAFT.value,
  isActive: landing?.isActive !== false,
  domainHostname: landing?.domain?.hostname,
  domainStatus: landing?.domain?.status || LANDING_DOMAIN_STATUS.NOT_CONFIGURED.value,
  domainRejectionReason: landing?.domain?.rejectionReason,
  brandName: landing?.brand?.name,
  brandLogo: landing?.brand?.logo,
  brandWhatsapp: landing?.brand?.whatsapp,
  brandEmail: landing?.brand?.email,
  brandInstagram: landing?.brand?.instagram,
  primaryColor: landing?.theme?.primaryColor || '#111111',
  accentColor: landing?.theme?.accentColor || '#f5c542',
  backgroundColor: landing?.theme?.backgroundColor || '#ffffff',
  textColor: landing?.theme?.textColor || '#111111',
  heroEyebrow: landing?.hero?.eyebrow,
  heroTitle: landing?.hero?.title,
  heroSubtitle: landing?.hero?.subtitle,
  heroCtaText: landing?.hero?.ctaText || 'Comprar ahora',
  heroImage: landing?.hero?.image,
  offerTitle: landing?.offer?.title,
  offerPrice: landing?.offer?.price,
  offerCompareAtPrice: landing?.offer?.compareAtPrice,
  offerBadge: landing?.offer?.badge,
  productName: landing?.product?.name,
  productDescription: landing?.product?.description,
  productImages: landing?.product?.images || [],
  productColors: arrayToText(landing?.product?.colors),
  productSizes: arrayToText(landing?.product?.sizes),
  productPackItems: arrayToText(landing?.product?.packItems),
  productBenefits: arrayToText(landing?.product?.benefits),
  sectionBenefits: arrayToText(landing?.sections?.benefits),
  testimonialsText: pairsToText(landing?.sections?.testimonials, 'name', 'text'),
  faqsText: pairsToText(landing?.sections?.faqs, 'question', 'answer'),
  guarantee: landing?.sections?.guarantee,
  termsUrl: landing?.formSettings?.termsUrl,
  successMessage: landing?.formSettings?.successMessage,
})

const buildPayload = values => ({
  name: values.name,
  slug: values.slug,
  template: values.template,
  status: values.status,
  isActive: values.isActive,
  domain: {
    hostname: values.domainHostname,
    status: values.domainStatus,
    rejectionReason: values.domainRejectionReason,
  },
  brand: {
    name: values.brandName,
    logo: values.brandLogo,
    whatsapp: values.brandWhatsapp,
    email: values.brandEmail,
    instagram: values.brandInstagram,
  },
  theme: {
    primaryColor: values.primaryColor,
    accentColor: values.accentColor,
    backgroundColor: values.backgroundColor,
    textColor: values.textColor,
  },
  hero: {
    eyebrow: values.heroEyebrow,
    title: values.heroTitle,
    subtitle: values.heroSubtitle,
    ctaText: values.heroCtaText,
    image: values.heroImage,
  },
  offer: {
    title: values.offerTitle,
    price: values.offerPrice,
    compareAtPrice: values.offerCompareAtPrice,
    currency: 'COP',
    badge: values.offerBadge,
  },
  product: {
    name: values.productName,
    description: values.productDescription,
    images: values.productImages || [],
    colors: textToArray(values.productColors),
    sizes: textToArray(values.productSizes),
    packItems: textToArray(values.productPackItems),
    benefits: textToArray(values.productBenefits),
  },
  sections: {
    benefits: textToArray(values.sectionBenefits),
    testimonials: textToPairs(values.testimonialsText, 'name', 'text'),
    faqs: textToPairs(values.faqsText, 'question', 'answer'),
    guarantee: values.guarantee,
  },
  formSettings: {
    termsUrl: values.termsUrl,
    successMessage: values.successMessage,
  },
})

const renderImage = landing => {
  const image = landing.coverImage || landing.hero?.image || landing.product?.images?.[0]

  if (!image) {
    return <ImagePlaceholder $width={54} $height={42} $radius={8} />
  }

  return (
    <ThumbnailImage
      src={getUploadUrl(UPLOAD_ROUTES.landings.images, image)}
      alt={landing.name}
    />
  )
}

const LandingPagesPage = () => {
  const [form] = Form.useForm()
  const { role } = useAuth()
  const [landings, setLandings] = useState([])
  const [selectedLanding, setSelectedLanding] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const isAdmin = Number(role) === ROLES.ADMIN.value

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = isAdmin
        ? await landingPageService.adminList()
        : await landingPageService.listMy()

      setLandings(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las landings')
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openDrawer = useCallback(landing => {
    setSelectedLanding(landing || null)
    form.setFieldsValue(getFormValues(landing))
    setDrawerOpen(true)
  }, [form])

  const closeDrawer = () => {
    setDrawerOpen(false)
    setSelectedLanding(null)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const payload = buildPayload(values)

      if (selectedLanding) {
        await landingPageService.update(selectedLanding._id, payload)
      } else {
        await landingPageService.create(payload)
      }

      message.success('Landing guardada')
      closeDrawer()
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la landing')
    } finally {
      setSaving(false)
    }
  }

  const columns = useMemo(() => [
    {
      title: '',
      width: 76,
      render: (_, landing) => renderImage(landing),
    },
    {
      title: 'Landing',
      render: (_, landing) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{landing.name}</Typography.Text>
          <Typography.Text type="secondary">{landing.product?.name || landing.offer?.title || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Oferta',
      render: (_, landing) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{currency(landing.offer?.price)}</Typography.Text>
          {landing.offer?.badge && <Typography.Text type="secondary">{landing.offer.badge}</Typography.Text>}
        </Space>
      ),
    },
    {
      title: 'Estado',
      render: (_, landing) => (
        <Space>
          <Tag color={getLandingStatusColor(landing.status)}>
            {getLandingStatusLabel(landing.status)}
          </Tag>
          {!landing.isActive && <Tag>Inactiva</Tag>}
        </Space>
      ),
    },
    {
      title: 'URL',
      render: (_, landing) => (
        <Space direction="vertical" size={2}>
          <PublicPathText copyable={{ text: getPublicUrl(landing) }}>
            {getPublicUrl(landing)}
          </PublicPathText>
          {landing.domain?.hostname && (
            <Space size={6} wrap>
              <Tag color={getLandingDomainStatusColor(landing.domain.status)}>
                {getLandingDomainStatusLabel(landing.domain.status)}
              </Tag>
              <Typography.Text type="secondary">{landing.domain.hostname}</Typography.Text>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, landing) => (
        <Button onClick={() => openDrawer(landing)}>
          Editar
        </Button>
      ),
    },
  ], [openDrawer])

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>{isAdmin ? 'Landings' : 'Mis landings'}</PageTitle>
          <PageDescription>
            Crea paginas de venta rapidas para productos, packs o campanas puntuales.
          </PageDescription>
        </PageIntro>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => openDrawer(null)}>
          Nueva landing
        </Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={landings}
        loading={loading}
        scroll={{ x: 960 }}
      />

      <Drawer
        title={selectedLanding ? 'Editar landing' : 'Nueva landing'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={760}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={getFormValues()}
          onFinish={handleSubmit}
        >
          <DashboardFormSection>
            <DashboardSectionTitle>Configuracion</DashboardSectionTitle>
            <FieldGrid>
              <Form.Item label="Nombre interno" name="name" rules={[{ required: true }]}>
                <Input placeholder="Landing pack camisetas" />
              </Form.Item>
              <Form.Item label="Slug" name="slug">
                <Input placeholder="pack-camisetas" />
              </Form.Item>
            </FieldGrid>

            <FieldGrid>
              <Form.Item label="Plantilla" name="template">
                <Select options={LANDING_PAGE_TEMPLATE_OPTIONS} />
              </Form.Item>
              <Form.Item label="Estado" name="status">
                <Select options={LANDING_PAGE_STATUS_OPTIONS} />
              </Form.Item>
              <Form.Item label="Activa" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </FieldGrid>
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Dominio</DashboardSectionTitle>
            <Form.Item label="Dominio personalizado" name="domainHostname">
              <Input placeholder="promo.tumarca.com" />
            </Form.Item>

            {isAdmin && (
              <FieldGrid>
                <Form.Item label="Estado del dominio" name="domainStatus">
                  <Select options={LANDING_DOMAIN_STATUS_OPTIONS} />
                </Form.Item>
                <Form.Item label="Motivo de rechazo" name="domainRejectionReason">
                  <Input />
                </Form.Item>
              </FieldGrid>
            )}

            {selectedLanding?.domain?.verificationRecord && (
              <Space direction="vertical" size={4}>
                <Typography.Text strong>Registro DNS para verificar</Typography.Text>
                <Typography.Text type="secondary">
                  Agrega este registro TXT en el DNS del dominio y luego el admin puede marcarlo como verificado.
                </Typography.Text>
                <PublicPathText copyable>{selectedLanding.domain.verificationRecord.type}</PublicPathText>
                <PublicPathText copyable>{selectedLanding.domain.verificationRecord.name}</PublicPathText>
                <PublicPathText copyable>{selectedLanding.domain.verificationRecord.value}</PublicPathText>
              </Space>
            )}
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Marca</DashboardSectionTitle>
            <FieldGrid>
              <Form.Item label="Nombre visible" name="brandName">
                <Input />
              </Form.Item>
              <Form.Item label="WhatsApp" name="brandWhatsapp">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="brandEmail">
                <Input />
              </Form.Item>
              <Form.Item label="Instagram" name="brandInstagram">
                <Input />
              </Form.Item>
            </FieldGrid>

            <ImageUploadField
              label="Logo"
              name="brandLogo"
              folder={UPLOAD_FOLDERS.landings.logos}
              uploadRoute={UPLOAD_ROUTES.landings.logos}
              maxCount={1}
              multiple={false}
            />
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Colores</DashboardSectionTitle>
            <ColorGrid>
              <Form.Item label="Principal" name="primaryColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Acento" name="accentColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Fondo" name="backgroundColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Texto" name="textColor">
                <Input type="color" />
              </Form.Item>
            </ColorGrid>
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Portada</DashboardSectionTitle>
            <Form.Item label="Eyebrow" name="heroEyebrow">
              <Input placeholder="Oferta por tiempo limitado" />
            </Form.Item>
            <Form.Item label="Titulo principal" name="heroTitle">
              <Input />
            </Form.Item>
            <Form.Item label="Subtitulo" name="heroSubtitle">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Texto del boton" name="heroCtaText">
              <Input />
            </Form.Item>
            <ImageUploadField
              label="Imagen portada"
              name="heroImage"
              folder={UPLOAD_FOLDERS.landings.images}
              uploadRoute={UPLOAD_ROUTES.landings.images}
              maxCount={1}
              multiple={false}
            />
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Oferta y producto</DashboardSectionTitle>
            <FieldGrid>
              <Form.Item label="Titulo oferta" name="offerTitle">
                <Input placeholder="Pack x3" />
              </Form.Item>
              <Form.Item label="Precio" name="offerPrice">
                <FullWidthInputNumber min={0} />
              </Form.Item>
              <Form.Item label="Precio anterior" name="offerCompareAtPrice">
                <FullWidthInputNumber min={0} />
              </Form.Item>
              <Form.Item label="Etiqueta" name="offerBadge">
                <Input placeholder="Envio gratis" />
              </Form.Item>
            </FieldGrid>

            <Form.Item label="Nombre producto" name="productName">
              <Input />
            </Form.Item>
            <Form.Item label="Descripcion producto" name="productDescription">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Colores" name="productColors">
              <Input placeholder="Negro, Blanco, Azul" />
            </Form.Item>
            <Form.Item label="Tallas" name="productSizes">
              <Input placeholder="S, M, L, XL" />
            </Form.Item>
            <Form.Item label="Items del pack" name="productPackItems">
              <Input.TextArea rows={2} placeholder="Camiseta 1, Camiseta 2, Camiseta 3" />
            </Form.Item>
            <Form.Item label="Beneficios del producto" name="productBenefits">
              <Input.TextArea rows={2} placeholder="Tela premium, no destine, envio rapido" />
            </Form.Item>
            <ImageUploadField
              label="Galeria"
              name="productImages"
              folder={UPLOAD_FOLDERS.landings.images}
              uploadRoute={UPLOAD_ROUTES.landings.images}
              maxCount={8}
            />
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Contenido adicional</DashboardSectionTitle>
            <Form.Item label="Beneficios de compra" name="sectionBenefits">
              <Input.TextArea rows={2} placeholder="Pago seguro, cambios faciles, garantia" />
            </Form.Item>
            <Form.Item label="Garantia" name="guarantee">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item label="Testimonios" name="testimonialsText">
              <Input.TextArea rows={3} placeholder="Nombre | Texto del testimonio" />
            </Form.Item>
            <Form.Item label="Preguntas frecuentes" name="faqsText">
              <Input.TextArea rows={3} placeholder="Pregunta | Respuesta" />
            </Form.Item>
          </DashboardFormSection>

          <DashboardFormSection>
            <DashboardSectionTitle>Formulario</DashboardSectionTitle>
            <Form.Item label="URL terminos" name="termsUrl">
              <Input />
            </Form.Item>
            <Form.Item label="Mensaje de exito" name="successMessage">
              <Input.TextArea rows={2} />
            </Form.Item>
          </DashboardFormSection>

          <Button type="primary" htmlType="submit" loading={saving} block>
            Guardar landing
          </Button>
        </Form>
      </Drawer>
    </PageStack>
  )
}

export default LandingPagesPage
