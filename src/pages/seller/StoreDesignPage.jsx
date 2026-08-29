import { Button, Col, Form, Input, Row, Select, Spin, Switch, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import StoreThemePreview from '../../components/storefront/StoreThemePreview'
import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import {
  STOREFRONT_SECTION_DEFAULTS,
  STOREFRONT_SECTION_OPTIONS,
  STOREFRONT_TEMPLATES,
  STOREFRONT_TEMPLATE_OPTIONS,
} from '../../constants/storefrontTemplates'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { storeService } from '../../services/storeService'
import { FullWidthInputNumber } from '../../styles/dashboardStyles'
import { buildStoreTheme, neutralTheme } from '../../styles/themePresets'
import {
  DesignCard,
  SectionSwitchCard,
  SectionSwitchGrid,
  SeoPanel,
  SwitchDescription,
  SwitchHeader,
  SwitchTitle,
} from './storeDesignStyles'

const THEME_FIELDS = [
  'primaryColor',
  'backgroundColor',
  'surfaceColor',
  'textColor',
  'mutedTextColor',
  'borderRadius',
]

const DEFAULT_TEMPLATE = STOREFRONT_TEMPLATES.CLASSIC.value

const pickThemeValues = values => THEME_FIELDS.reduce((theme, field) => {
  if (values[field] !== undefined) {
    theme[field] = values[field]
  }

  return theme
}, {})

const getSectionValues = store => ({
  ...STOREFRONT_SECTION_DEFAULTS,
  ...(store?.storefront?.sections || {}),
})

const getFormValues = store => {
  const theme = buildStoreTheme(store)
  const storefront = store?.storefront || {}

  return {
    ...theme,
    template: storefront.template || DEFAULT_TEMPLATE,
    sections: getSectionValues(store),
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
  const [preview, setPreview] = useState({
    theme: neutralTheme,
    template: DEFAULT_TEMPLATE,
    sections: STOREFRONT_SECTION_DEFAULTS,
  })

  const loadStore = useCallback(async () => {
    setLoading(true)

    try {
      const response = await storeService.getMyStore()
      const currentStore = response.data
      const currentTheme = buildStoreTheme(currentStore)
      const currentTemplate = currentStore?.storefront?.template || DEFAULT_TEMPLATE
      const currentSections = getSectionValues(currentStore)

      setStore(currentStore)
      setPreview({
        theme: currentTheme,
        template: currentTemplate,
        sections: currentSections,
      })
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
    setPreview({
      theme: {
        ...neutralTheme,
        ...pickThemeValues(values),
      },
      template: values.template || DEFAULT_TEMPLATE,
      sections: {
        ...STOREFRONT_SECTION_DEFAULTS,
        ...(values.sections || {}),
      },
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
        template: values.template,
        sections: values.sections,
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
      setPreview({
        theme: savedTheme,
        template: savedStore?.storefront?.template || DEFAULT_TEMPLATE,
        sections: getSectionValues(savedStore),
      })
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
          <DesignCard title="Diseno de la tienda">
            <Typography.Paragraph type="secondary">
              Configura una identidad visual simple para que tu tienda publica se sienta propia.
            </Typography.Paragraph>

            <Form
              form={form}
              layout="vertical"
              initialValues={{
                ...neutralTheme,
                template: DEFAULT_TEMPLATE,
                sections: STOREFRONT_SECTION_DEFAULTS,
              }}
              onValuesChange={handleValuesChange}
              onFinish={handleSubmit}
            >
              <Form.Item label="Plantilla" name="template">
                <Select options={STOREFRONT_TEMPLATE_OPTIONS} />
              </Form.Item>

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
                <FullWidthInputNumber min={4} max={32} />
              </Form.Item>

              <SeoPanel>
                <Typography.Title level={5}>Secciones visibles</Typography.Title>
                <SectionSwitchGrid>
                  {STOREFRONT_SECTION_OPTIONS.map(section => (
                    <SectionSwitchCard key={section.key}>
                      <SwitchHeader align="start">
                        <SwitchTitle>{section.label}</SwitchTitle>
                        <Form.Item name={['sections', section.key]} valuePropName="checked" noStyle>
                          <Switch />
                        </Form.Item>
                      </SwitchHeader>
                      <SwitchDescription type="secondary">
                        {section.description}
                      </SwitchDescription>
                    </SectionSwitchCard>
                  ))}
                </SectionSwitchGrid>
              </SeoPanel>

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
          </DesignCard>
        </Col>

        <Col xs={24} lg={12}>
          <StoreThemePreview
            sections={preview.sections}
            template={preview.template}
            theme={preview.theme}
          />
        </Col>
      </Row>
    </Spin>
  )
}

export default StoreDesignPage
