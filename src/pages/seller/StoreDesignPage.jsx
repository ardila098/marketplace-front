import { Button, Card, Col, Form, Input, InputNumber, Row, Typography, message } from 'antd'
import { useState } from 'react'
import StoreThemePreview from '../../components/storefront/StoreThemePreview'
import { neutralTheme } from '../../styles/themePresets'

const StoreDesignPage = () => {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState(neutralTheme)

  const handleValuesChange = (_, values) => setTheme({ ...neutralTheme, ...values })
  const handleSubmit = async values => {
    console.log(values)
    setSaving(true)
    message.success('')
    setSaving(false)
  }

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="Diseño de la tienda">
          <Typography.Paragraph type="secondary">
            Para el MVP conviene permitir color principal, banner, logo y bordes. Más adelante se pueden agregar fuentes y bloques personalizados.
          </Typography.Paragraph>
          <Form form={form} layout="vertical" initialValues={neutralTheme} onValuesChange={handleValuesChange} onFinish={handleSubmit}>
            <Form.Item label="Color principal" name="primaryColor"><Input type="color" /></Form.Item>
            <Form.Item label="Fondo" name="backgroundColor"><Input type="color" /></Form.Item>
            <Form.Item label="Superficie" name="surfaceColor"><Input type="color" /></Form.Item>
            <Form.Item label="Texto" name="textColor"><Input type="color" /></Form.Item>
            <Form.Item label="Radio de borde" name="borderRadius"><InputNumber min={4} max={32} /></Form.Item>
            <Button type="primary" htmlType="submit" loading={saving}>Guardar diseño</Button>
          </Form>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <StoreThemePreview theme={theme} />
      </Col>
    </Row>
  )
}

export default StoreDesignPage
