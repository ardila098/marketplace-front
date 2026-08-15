import { Button, Card, Col, Form, Input, Row, Space, Spin, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { platformService } from '../../services/platformService'
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

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Card title="Marca" style={{ marginBottom: 18 }}>
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

          <Card title="Portada" style={{ marginBottom: 18 }}>
            <Row gutter={20}>
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
                <Form.Item
                  label="Texto antes del slider de verticales"
                  name={['hero', 'verticalsSubtitle']}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="SEO" style={{ marginBottom: 18 }}>
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

          <Card title="Footer">
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
