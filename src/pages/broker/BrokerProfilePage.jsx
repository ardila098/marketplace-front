import { Button, Card, Col, Form, Input, Row, Space, Switch, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { brokerService } from '../../services/brokerService'

const getProfileValues = profile => ({
  slug: profile?.slug,
  displayName: profile?.displayName,
  title: profile?.title,
  companyName: profile?.companyName,
  summary: profile?.summary,
  city: profile?.city,
  phone: profile?.phone,
  whatsapp: profile?.whatsapp,
  email: profile?.email,
  servicesText: (profile?.services || []).join('\n'),
  isPublished: profile?.isPublished !== false,
})

const BrokerProfilePage = () => {
  const [form] = Form.useForm()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadProfile = useCallback(async () => {
    setLoading(true)

    try {
      const response = await brokerService.getMyProfile()
      setProfile(response.data)
      form.setFieldsValue(getProfileValues(response.data))
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar tu perfil')
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const handleSave = async values => {
    setSaving(true)

    try {
      const response = await brokerService.updateMyProfile({
        ...values,
        services: String(values.servicesText || '')
          .split('\n')
          .map(value => value.trim())
          .filter(Boolean),
      })

      setProfile(response.data)
      form.setFieldsValue(getProfileValues(response.data))
      message.success('Landing actualizada correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar tu perfil')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Mi landing
        </Typography.Title>
        <Typography.Text type="secondary">
          Configura como te ven los clientes que solicitan asesoria de credito.
        </Typography.Text>
      </div>

      {profile?.publicPath && (
        <Card>
          <Typography.Text type="secondary">URL publica</Typography.Text>
          <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
            {`${window.location.origin}${profile.publicPath}`}
          </Typography.Paragraph>
        </Card>
      )}

      <Card loading={loading}>
        <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ isPublished: true }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Nombre visible" name="displayName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
                <Input addonBefore="/brokers/" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Titulo" name="title">
                <Input placeholder="Asesor de credito" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Empresa o marca" name="companyName">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Ciudad" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Telefono" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="WhatsApp" name="whatsapp">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Correo publico" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Landing publicada" name="isPublished" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Descripcion" name="summary">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Servicios" name="servicesText" extra="Escribe un servicio por linea.">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={saving}>
            Guardar landing
          </Button>
        </Form>
      </Card>
    </Space>
  )
}

export default BrokerProfilePage
