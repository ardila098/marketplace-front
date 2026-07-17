import { Button, Card, Col, Form, Input, InputNumber, Row, Spin, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import StoreThemePreview from '../../components/storefront/StoreThemePreview'
import { storeService } from '../../services/storeService'
import { buildStoreTheme, neutralTheme } from '../../styles/themePresets'

const StoreDesignPage = () => {
  const [form] = Form.useForm()
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState(neutralTheme)

  const loadStore = useCallback(async () => {
    setLoading(true)

    try {
      const response = await storeService.getMyStore()
      const currentStore = response.data
      const currentTheme = buildStoreTheme(currentStore)

      setStore(currentStore)
      setTheme(currentTheme)
      form.setFieldsValue(currentTheme)
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
      ...values,
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
        theme: values,
      })
      const savedStore = response.data
      const savedTheme = buildStoreTheme(savedStore)

      setStore(savedStore)
      setTheme(savedTheme)
      form.setFieldsValue(savedTheme)
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

              <Button type="primary" htmlType="submit" loading={saving}>
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
