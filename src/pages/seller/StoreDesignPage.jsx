import { Button, Card, Col, Form, Input, InputNumber, Row, Spin, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import StoreThemePreview from '../../components/storefront/StoreThemePreview'
import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { storeService } from '../../services/storeService'
import { buildStoreTheme, neutralTheme } from '../../styles/themePresets'

const THEME_FIELDS = [
  'primaryColor',
  'backgroundColor',
  'surfaceColor',
  'textColor',
  'mutedTextColor',
  'borderRadius',
]

const SeoPanel = styled.section`
  border-top: 1px solid #f0f0f0;
  margin-top: 18px;
  padding-top: 18px;
`

const pickThemeValues = values => THEME_FIELDS.reduce((theme, field) => {
  if (values[field] !== undefined) {
    theme[field] = values[field]
  }

  return theme
}, {})

const getFormValues = store => {
  const theme = buildStoreTheme(store)
  const storefront = store?.storefront || {}

  return {
    ...theme,
    seoTitle: storefront.seoTitle || '',
    seoDescription: storefront.seoDescription || '',
    seoKeywords: Array.isArray(storefront.seoKeywords)
      ? storefront.seoKeywords.join(', ')
      : storefront.seoKeywords || '',
    socialImage: storefront.socialImage || '',
    tracking: {
      googleAnalyticsId: storefront.tracking?.googleAnalyticsId || '',
      googleTagManagerId: storefront.tracking?.googleTagManagerId || '',
      searchConsoleVerification: storefront.tracking?.searchConsoleVerification || '',
    },
  }
}

const StoreDesignPage = () => {
  const [form] = Form.useForm()
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [theme, setTheme] = useState(neutralTheme)

  const loadStore = useCallback(async () => {
    setLoading(true)

    try {
      const response = await storeService.getMyStore()
      const currentStore = response.data
      const currentTheme = buildStoreTheme(currentStore)

      setStore(currentStore)
      setTheme(currentTheme)
      form.setFieldsValue(getFormValues(currentStore))
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar el diseno de la tienda')
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    loadStore()
  }, [loadStore])

  const handleValuesChange = (_, values) => {
    setTheme({
      ...neutralTheme,
      ...pickThemeValues(values),
    })
  }

  const handleSubmit = async values => {
    if (!store?._id) {
      message.warning('Primero debes crear tu tienda')
      return
    }

    setSaving(true)

    try {
      const response = await storeService.updateStorefront(store._id, {
        theme: pickThemeValues(values),
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        seoKeywords: values.seoKeywords,
        socialImage: values.socialImage,
        tracking: values.tracking,
      })
      const savedStore = response.data
      const savedTheme = buildStoreTheme(savedStore)

      setStore(savedStore)
      setTheme(savedTheme)
      form.setFieldsValue(getFormValues(savedStore))
      message.success('Diseno guardado correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar el diseno')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Diseno de la tienda">
            <Typography.Paragraph type="secondary">
              Configura una identidad visual simple para que tu tienda publica se sienta propia.
            </Typography.Paragraph>

            <Form
              form={form}
              layout="vertical"
              initialValues={neutralTheme}
              onValuesChange={handleValuesChange}
              onFinish={handleSubmit}
            >
              <Form.Item label="Color principal" name="primaryColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Fondo" name="backgroundColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Superficie" name="surfaceColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Texto" name="textColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Texto secundario" name="mutedTextColor">
                <Input type="color" />
              </Form.Item>
              <Form.Item label="Radio de borde" name="borderRadius">
                <InputNumber min={4} max={32} style={{ width: '100%' }} />
              </Form.Item>

              <SeoPanel>
                <Typography.Title level={5}>SEO y medicion</Typography.Title>

                <Form.Item label="Titulo SEO" name="seoTitle">
                  <Input placeholder={store?.name || 'Mi tienda'} />
                </Form.Item>

                <Form.Item label="Descripcion SEO" name="seoDescription">
                  <Input.TextArea rows={3} maxLength={170} showCount />
                </Form.Item>

                <Form.Item label="Palabras clave" name="seoKeywords">
                  <Input placeholder="moda, accesorios, tecnologia" />
                </Form.Item>

                <ImageUploadField
                  label="Imagen para compartir"
                  name="socialImage"
                  folder={UPLOAD_FOLDERS.stores.banners}
                  uploadRoute={UPLOAD_ROUTES.stores.banners}
                  maxCount={1}
                  multiple={false}
                  onUploadingChange={setUploading}
                />

                <Form.Item
                  label="Google Analytics ID"
                  name={['tracking', 'googleAnalyticsId']}
                >
                  <Input placeholder="G-XXXXXXXXXX" />
                </Form.Item>

                <Form.Item
                  label="Google Tag Manager ID"
                  name={['tracking', 'googleTagManagerId']}
                >
                  <Input placeholder="GTM-XXXXXXX" />
                </Form.Item>

                <Form.Item
                  label="Verificacion de Search Console"
                  name={['tracking', 'searchConsoleVerification']}
                >
                  <Input placeholder="Codigo de verificacion" />
                </Form.Item>
              </SeoPanel>

              <Button type="primary" htmlType="submit" loading={saving} disabled={uploading}>
                Guardar diseno
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <StoreThemePreview theme={theme} />
        </Col>
      </Row>
    </Spin>
  )
}

export default StoreDesignPage
