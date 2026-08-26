import { Button, Card, Col, Form, Input, Row, Select, Space, Spin, Switch, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import StatusTag from '../../components/common/StatusTag'
import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { STORE_BUSINESS_TYPE_OPTIONS, STORE_BUSINESS_TYPES } from '../../constants/businessTypes'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { storeService } from '../../services/storeService'
import { verticalsServices } from '../../services/verticalsServices'

const getStoreValues = store => ({
  name: store?.name,
  slug: store?.slug,
  businessType: store?.businessType || STORE_BUSINESS_TYPES.RETAIL.value,
  verticals: store?.verticals?.length
    ? store.verticals.map(vertical => vertical?._id || vertical)
    : [store?.vertical?._id || store?.vertical].filter(Boolean),
  description: store?.description,
  logo: store?.logo,
  banner: store?.banner,
  isPublished: store?.storefront?.isPublished !== false,
  seoTitle: store?.storefront?.seoTitle,
  seoDescription: store?.storefront?.seoDescription,
  customDomain: store?.storefront?.customDomain?.hostname,
  contact: {
    email: store?.settings?.contact?.email,
    phone: store?.settings?.contact?.phone,
    whatsapp: store?.settings?.contact?.whatsapp,
    address: store?.settings?.contact?.address,
    instagram: store?.settings?.contact?.instagram,
  },
})

const getDomainRecords = domain => {
  if (domain?.dnsRecords?.length) return domain.dnsRecords

  return [domain?.cnameRecord, domain?.verificationRecord].filter(Boolean)
}

const DomainDnsInstructions = ({ domain, loading, onSync }) => {
  if (!domain?.hostname) return null

  const records = getDomainRecords(domain)

  return (
    <Card
      title="Configuracion de dominio"
      extra={(
        <Button size="small" loading={loading} onClick={onSync}>
          Verificar ahora
        </Button>
      )}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space wrap>
          <StatusTag status={domain.status || 'not_configured'} />
          {domain.cloudflareHostnameStatus && (
            <Typography.Text type="secondary">
              Cloudflare: {domain.cloudflareHostnameStatus}
            </Typography.Text>
          )}
          {domain.sslStatus && (
            <Typography.Text type="secondary">
              SSL: {domain.sslStatus}
            </Typography.Text>
          )}
        </Space>

        <Typography.Paragraph style={{ marginBottom: 0 }}>
          Agrega estos registros en el DNS del dominio. Cuando el CNAME apunte a Cooqys,
          usa el boton de verificacion para actualizar el estado.
        </Typography.Paragraph>

        {records.map((record, index) => (
          <Card size="small" key={`${record.type}-${record.name}-${index}`}>
            <Row gutter={[12, 8]}>
              <Col xs={24} md={6}>
                <Typography.Text type="secondary">Tipo</Typography.Text>
                <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                  {record.type}
                </Typography.Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <Typography.Text type="secondary">Nombre</Typography.Text>
                <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                  {record.name}
                </Typography.Paragraph>
              </Col>
              <Col xs={24} md={10}>
                <Typography.Text type="secondary">Valor</Typography.Text>
                <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                  {record.value}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Card>
        ))}

        {domain.rejectionReason && (
          <Typography.Text type="danger">{domain.rejectionReason}</Typography.Text>
        )}
      </Space>
    </Card>
  )
}

const StoreFormPage = () => {
  const [form] = Form.useForm()
  const [store, setStore] = useState(null)
  const [verticals, setVerticals] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [syncingDomain, setSyncingDomain] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [storeResponse, verticalsResponse] = await Promise.all([
        storeService.getMyStore(),
        verticalsServices.list({ active: true }),
      ])

      const currentStore = storeResponse.data
      setStore(currentStore)
      setVerticals(verticalsResponse.data || [])
      form.setFieldsValue(getStoreValues(currentStore))
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar la configuracion de la tienda')
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const identityPayload = {
        name: values.name,
        slug: values.slug,
        vertical: values.verticals?.[0],
        verticals: values.verticals,
        description: values.description,
        logo: values.logo,
        banner: values.banner,
        settings: {
          ...(store?.settings || {}),
          contact: {
            email: values.contact?.email || '',
            phone: values.contact?.phone || '',
            whatsapp: values.contact?.whatsapp || '',
            address: values.contact?.address || '',
            instagram: values.contact?.instagram || '',
          },
        },
      }

      const savedStore = store
        ? (await storeService.update(store._id, identityPayload)).data
        : (await storeService.create(identityPayload)).data

      const storefront = await storeService.updateStorefront(savedStore._id, {
        slug: values.slug,
        isPublished: values.isPublished,
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        customDomain: values.customDomain,
      })

      setStore(storefront.data)
      form.setFieldsValue(getStoreValues(storefront.data))
      message.success('Tienda guardada correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la tienda')
    } finally {
      setSaving(false)
    }
  }

  const handleSyncDomain = async () => {
    if (!store?._id) return

    setSyncingDomain(true)

    try {
      const response = await storeService.syncDomain(store._id)
      setStore(response.data)
      form.setFieldsValue(getStoreValues(response.data))
      message.success('Dominio sincronizado correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo verificar el dominio')
    } finally {
      setSyncingDomain(false)
    }
  }

  const domain = store?.storefront?.customDomain

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
            Mi tienda
          </Typography.Title>
          <Typography.Text type="secondary">
            Configura la tienda publica, su ruta, SEO basico, contacto y dominio personalizado.
          </Typography.Text>
        </div>

        {store && (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card>
                <Typography.Text type="secondary">Estado tienda</Typography.Text>
                <div style={{ marginTop: 8 }}><StatusTag status={store.status} /></div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Typography.Text type="secondary">Ruta publica</Typography.Text>
                <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                  {store.storefront?.publicUrl}
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Typography.Text type="secondary">Dominio</Typography.Text>
                <div style={{ marginTop: 8 }}>
                  <StatusTag status={domain?.status || 'not_configured'} />
                </div>
              </Card>
            </Col>
          </Row>
        )}

        <Card>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ isPublished: true }}
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Ruta de tienda" name="slug" rules={[{ required: true }]}>
                  <Input addonBefore="/stores/" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Tipo de negocio" name="businessType">
                  <Select disabled options={STORE_BUSINESS_TYPE_OPTIONS} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Verticales donde vende" name="verticals" rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    showSearch
                    optionFilterProp="label"
                    placeholder="Selecciona una o varias verticales"
                    options={verticals.map(vertical => ({
                      label: vertical.name,
                      value: vertical._id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Publicada" name="isPublished" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Descripcion" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Logo"
                  name="logo"
                  folder={UPLOAD_FOLDERS.stores.logos}
                  uploadRoute={UPLOAD_ROUTES.stores.logos}
                  maxCount={1}
                  multiple={false}
                />
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Banner"
                  name="banner"
                  folder={UPLOAD_FOLDERS.stores.banners}
                  uploadRoute={UPLOAD_ROUTES.stores.banners}
                  maxCount={1}
                  multiple={false}
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Titulo SEO" name="seoTitle">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Dominio personalizado" name="customDomain">
                  <Input placeholder="tienda.com" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Descripcion SEO" name="seoDescription">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Typography.Title level={5} style={{ marginTop: 6 }}>
                  Datos de contacto
                </Typography.Title>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Correo de contacto" name={['contact', 'email']}>
                  <Input placeholder="ventas@tienda.com" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Telefono" name={['contact', 'phone']}>
                  <Input placeholder="+57 300 000 0000" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="WhatsApp" name={['contact', 'whatsapp']}>
                  <Input placeholder="+57 300 000 0000" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Instagram" name={['contact', 'instagram']}>
                  <Input placeholder="https://instagram.com/tienda" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Direccion" name={['contact', 'address']}>
                  <Input placeholder="Ciudad, direccion o zona de despacho" />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar tienda
            </Button>
          </Form>
        </Card>

        <DomainDnsInstructions
          domain={domain}
          loading={syncingDomain}
          onSync={handleSyncDomain}
        />
      </Space>
    </Spin>
  )
}

export default StoreFormPage
