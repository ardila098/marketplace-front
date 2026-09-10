import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Segmented,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  Typography,
  message,
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { platformService } from '../../services/platformService'
import FeaturedProductsPicker from './components/FeaturedProductsPicker'
import {
  mergePlatformSettings,
  setPlatformSettings,
} from '../../store/slices/platformSlice'

const { TextArea } = Input

const getSettingsFormValues = settings => {
  const mergedSettings = mergePlatformSettings(settings)

  return {
    ...mergedSettings,
    seo: {
      ...mergedSettings.seo,
      keywords: Array.isArray(mergedSettings.seo?.keywords)
        ? mergedSettings.seo.keywords.join(', ')
        : mergedSettings.seo?.keywords || '',
    },
  }
}

const AdminSettingsPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeSection, setActiveSection] = useState('brand')

  useEffect(() => {
    let mounted = true

    platformService.getSettings()
      .then(response => {
        if (!mounted) return

        form.setFieldsValue(getSettingsFormValues(response.data))
      })
      .catch(error => {
        message.error(error.message || 'No se pudo cargar la configuracion')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [form])

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const response = await platformService.updateSettings(values)
      const settings = mergePlatformSettings(response.data)

      form.setFieldsValue(getSettingsFormValues(settings))
      dispatch(setPlatformSettings(settings))
      message.success(response.message || 'Configuracion actualizada correctamente')
    } catch (error) {
      message.error(error.message || 'No se pudo guardar la configuracion')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" size={18} style={{ width: '100%' }}>
        <div>
          <Typography.Title level={3} style={{ marginBottom: 4 }}>
            Configuracion de plataforma
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Administra la marca, los textos principales y el footer del marketplace.
          </Typography.Paragraph>
        </div>

        <Segmented
          block
          value={activeSection}
          onChange={setActiveSection}
          options={[
            { label: 'Marca y navegacion', value: 'brand' },
            { label: 'Vista inicial y verticales', value: 'home' },
            { label: 'SEO y footer', value: 'seo' },
          ]}
          style={{ marginBottom: 18 }}
        />

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            disabled={uploading}
            style={{ marginBottom: 18 }}
          >
            Guardar configuracion
          </Button>

          <Card
            title="Marca"
            style={{
              marginBottom: 18,
              display: activeSection === 'brand' ? undefined : 'none',
            }}
          >
            <Row gutter={20}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nombre de la plataforma"
                  name="name"
                  rules={[{ required: true, message: 'Ingresa el nombre de la plataforma' }]}
                >
                  <Input placeholder="Cooqys" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Logo"
                  name="logo"
                  folder={UPLOAD_FOLDERS.platform.logos}
                  uploadRoute={UPLOAD_ROUTES.platform.logos}
                  maxCount={1}
                  multiple={false}
                  onUploadingChange={setUploading}
                />
              </Col>
            </Row>
          </Card>

          <Card
            title="Navegacion"
            style={{
              marginBottom: 18,
              display: activeSection === 'brand' ? undefined : 'none',
            }}
          >
            <Row gutter={20}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Navbar transparente sobre la portada"
                  name={['navigation', 'transparentOnHome']}
                  valuePropName="checked"
                  extra="El navbar queda integrado en la portada y toma color al hacer scroll."
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Color del navbar"
                  name={['navigation', 'backgroundColor']}
                  extra="Se usa al hacer scroll o cuando no esta en modo transparente."
                >
                  <Input type="color" style={{ width: '100%', height: 42, padding: 4 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Color del texto del navbar"
                  name={['navigation', 'textColor']}
                  extra="Aplica a marca, menu y acciones internas del navbar."
                >
                  <Input type="color" style={{ width: '100%', height: 42, padding: 4 }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            title="Portada"
            style={{
              marginBottom: 18,
              display: activeSection === 'home' ? undefined : 'none',
            }}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Typography.Text strong style={{ display: 'block', marginBottom: 4 }}>
                  Showcase de productos (portada premium)
                </Typography.Text>
                <Typography.Paragraph type="secondary" style={{ margin: '0 0 18px' }}>
                  Activalo, elige productos del catalogo o imagenes PNG y configura fondo, texto y contenedor.
                </Typography.Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Mostrar showcase de productos"
                  name={['hero', 'showcaseEnabled']}
                  valuePropName="checked"
                  extra="Al activarlo, la portada muestra los productos seleccionados con slider."
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Texto del boton del producto"
                  name={['hero', 'productCtaLabel']}
                >
                  <Input placeholder="Ver producto" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Productos del slider de la portada"
                  name={['hero', 'featuredProducts']}
                  extra="Filtra por vertical para encontrar productos del catalogo. El orden de la lista es el orden del slider."
                >
                  <FeaturedProductsPicker />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contenido del slider"
                  name={['hero', 'showcaseContentType']}
                  extra="Productos usa el catalogo; Imagenes usa PNG/WebP subidos a continuacion."
                >
                  <Select
                    options={[
                      { label: 'Slider de productos', value: 'products' },
                      { label: 'Slider de imagenes / marca', value: 'brand' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Estilo del contenedor del slider"
                  name={['hero', 'slideFrameStyle']}
                  extra="Cristal y transparente dejan resaltar las imagenes PNG sobre el fondo."
                >
                  <Select
                    options={[
                      { label: 'Solido (blanco)', value: 'solid' },
                      { label: 'Efecto cristal', value: 'glass' },
                      { label: 'Transparente', value: 'transparent' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <ImageUploadField
                  label="Imagenes del slider de marca (PNG / WebP)"
                  name={['hero', 'slideImages']}
                  folder={UPLOAD_FOLDERS.platform.banners}
                  uploadRoute={UPLOAD_ROUTES.platform.banners}
                  maxCount={12}
                  multiple
                  onUploadingChange={setUploading}
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tipo de fondo"
                  name={['hero', 'backgroundType']}
                  extra="El color usa el fondo seleccionado; la imagen usa la imagen de portada."
                >
                  <Select
                    options={[
                      { label: 'Color solido', value: 'color' },
                      { label: 'Imagen', value: 'image' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Alto del slider de verticales"
                  name={['hero', 'verticalsImageHeight']}
                  extra="Controla que tan grande se ve el banner de cada vertical."
                >
                  <Slider min={260} max={720} step={10} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Color de fondo" name={['hero', 'backgroundColor']}>
                  <Input type="color" style={{ width: '100%', height: 42, padding: 4 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Posicion de la imagen"
                  name={['hero', 'backgroundPosition']}
                >
                  <Select
                    options={[
                      { label: 'Centro', value: 'center' },
                      { label: 'Superior', value: 'top' },
                      { label: 'Inferior', value: 'bottom' },
                      { label: 'Izquierda', value: 'left' },
                      { label: 'Derecha', value: 'right' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Overlay sobre la imagen"
                  name={['hero', 'overlayEnabled']}
                  valuePropName="checked"
                  extra="Usalo para mejorar la legibilidad del texto."
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Opacidad del overlay" name={['hero', 'overlayOpacity']}>
                  <Slider min={0} max={0.85} step={0.05} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Segundos entre productos del showcase"
                  name={['hero', 'showcaseAutoplaySeconds']}
                >
                  <Slider min={2} max={30} step={1} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Segundos del slider de productos relacionados"
                  name={['hero', 'relatedAutoplaySeconds']}
                >
                  <Slider min={2} max={30} step={1} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Texto superior" name={['hero', 'eyebrow']}>
                  <Input placeholder="Marketplace multi-vertical" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Imagen de portada"
                  name={['hero', 'backgroundImage']}
                  folder={UPLOAD_FOLDERS.platform.banners}
                  uploadRoute={UPLOAD_ROUTES.platform.banners}
                  maxCount={1}
                  multiple={false}
                  onUploadingChange={setUploading}
                />
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Titulo principal"
                  name={['hero', 'title']}
                  rules={[{ required: true, message: 'Ingresa el titulo principal' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Descripcion" name={['hero', 'subtitle']}>
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Boton principal" name={['hero', 'primaryCtaLabel']}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Boton secundario" name={['hero', 'secondaryCtaLabel']}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Typography.Text strong style={{ display: 'block', marginBottom: 4 }}>
                  Seccion de verticales
                </Typography.Text>
                <Typography.Paragraph type="secondary" style={{ margin: '0 0 18px' }}>
                  Controla como se presentan las verticales debajo de la portada.
                </Typography.Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Mostrar seccion de verticales"
                  name={['hero', 'verticalsEnabled']}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Formato de verticales"
                  name={['hero', 'verticalsLayout']}
                  extra="Showcase rota automáticamente cada vertical; Slider usa el carrusel de tarjetas."
                >
                  <Select
                    options={[
                      { label: 'Showcase automatico', value: 'showcase' },
                      { label: 'Slider de tarjetas', value: 'slider' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Titulo de la seccion"
                  name={['hero', 'verticalsTitle']}
                >
                  <Input placeholder="Verticales destacadas" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Texto antes de la seccion"
                  name={['hero', 'verticalsSubtitle']}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Typography.Text strong style={{ display: 'block', marginBottom: 4 }}>
                  Apariencia del showcase de verticales
                </Typography.Text>
                <Typography.Paragraph type="secondary" style={{ margin: '0 0 14px' }}>
                  Aplica cuando el formato elegido es Showcase automatico.
                </Typography.Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Posicion del slider"
                  name={['hero', 'verticalsImageSide']}
                >
                  <Select
                    options={[
                      { label: 'Imagen a la izquierda', value: 'left' },
                      { label: 'Imagen a la derecha', value: 'right' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Estilo del contenedor del slider"
                  name={['hero', 'verticalsFrameStyle']}
                >
                  <Select
                    options={[
                      { label: 'Solido', value: 'solid' },
                      { label: 'Efecto cristal', value: 'glass' },
                      { label: 'Transparente', value: 'transparent' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tipo de fondo de la seccion"
                  name={['hero', 'verticalsBackgroundType']}
                >
                  <Select
                    options={[
                      { label: 'Color solido', value: 'color' },
                      { label: 'Imagen', value: 'image' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Color de fondo de la seccion"
                  name={['hero', 'verticalsBackgroundColor']}
                >
                  <Input type="color" style={{ width: '100%', height: 42, padding: 4 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Imagen de fondo de la seccion"
                  name={['hero', 'verticalsBackgroundImage']}
                  folder={UPLOAD_FOLDERS.platform.banners}
                  uploadRoute={UPLOAD_ROUTES.platform.banners}
                  maxCount={1}
                  multiple={false}
                  onUploadingChange={setUploading}
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Posicion de la imagen de fondo"
                  name={['hero', 'verticalsBackgroundPosition']}
                >
                  <Select
                    options={[
                      { label: 'Centro', value: 'center' },
                      { label: 'Superior', value: 'top' },
                      { label: 'Inferior', value: 'bottom' },
                      { label: 'Izquierda', value: 'left' },
                      { label: 'Derecha', value: 'right' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Overlay sobre el fondo"
                  name={['hero', 'verticalsOverlayEnabled']}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Opacidad del overlay"
                  name={['hero', 'verticalsOverlayOpacity']}
                >
                  <Slider min={0} max={0.85} step={0.05} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Segundos entre verticales del showcase"
                  name={['hero', 'verticalsAutoplaySeconds']}
                >
                  <Slider min={2} max={30} step={1} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            title="SEO"
            style={{
              marginBottom: 18,
              display: activeSection === 'seo' ? undefined : 'none',
            }}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Titulo SEO" name={['seo', 'title']}>
                  <Input placeholder="Cooqys" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Descripcion SEO" name={['seo', 'description']}>
                  <TextArea rows={3} maxLength={170} showCount />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Palabras clave" name={['seo', 'keywords']}>
                  <Input placeholder="marketplace, tiendas, ecommerce" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <ImageUploadField
                  label="Imagen para compartir"
                  name={['seo', 'image']}
                  folder={UPLOAD_FOLDERS.platform.banners}
                  uploadRoute={UPLOAD_ROUTES.platform.banners}
                  maxCount={1}
                  multiple={false}
                  onUploadingChange={setUploading}
                />
              </Col>
            </Row>
          </Card>

          <Card title="Footer" style={{ display: activeSection === 'seo' ? undefined : 'none' }}>
            <Form.Item label="Descripcion del marketplace" name={['footer', 'description']}>
              <TextArea rows={3} />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              disabled={uploading}
            >
              Guardar configuracion
            </Button>
          </Card>
        </Form>
      </Space>
    </Spin>
  )
}

export default AdminSettingsPage
