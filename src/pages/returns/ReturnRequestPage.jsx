import { Button, Card, Form, Input, Select, Space, Typography, message } from 'antd'
import { useState } from 'react'

import { returnService } from '../../services/returnService'

const REASON_OPTIONS = [
  { label: 'Garantia', value: 'warranty' },
  { label: 'Cambio', value: 'change' },
  { label: 'Producto incorrecto', value: 'wrong_item' },
  { label: 'Producto en mal estado', value: 'damaged' },
  { label: 'Otro', value: 'other' },
]

const ReturnRequestPage = () => {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)

  const handleSubmit = async values => {
    setSaving(true)

    try {
      await returnService.create(values)
      message.success('Recibimos tu solicitud. Te contactaremos pronto.')
      form.resetFields()
    } catch (error) {
      message.error(error?.message || 'No se pudo crear la solicitud')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: '0 20px' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Typography.Title level={1} style={{ margin: 0, letterSpacing: 0 }}>
            Reclamos y garantias
          </Typography.Title>
          <Typography.Text type="secondary">
            Ingresa los datos de tu orden para revisar tu solicitud.
          </Typography.Text>
        </div>

        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Numero de orden"
              name="orderNumber"
              rules={[{ required: true, message: 'Ingresa el numero de orden' }]}
            >
              <Input placeholder="ORD-..." />
            </Form.Item>

            <Form.Item
              label="Correo usado en la compra"
              name="email"
              rules={[
                { required: true, message: 'Ingresa tu correo' },
                { type: 'email', message: 'Ingresa un correo valido' },
              ]}
            >
              <Input placeholder="correo@ejemplo.com" />
            </Form.Item>

            <Form.Item label="Telefono" name="phone">
              <Input placeholder="Numero de contacto" />
            </Form.Item>

            <Form.Item
              label="Motivo"
              name="reason"
              initialValue="warranty"
              rules={[{ required: true, message: 'Selecciona el motivo' }]}
            >
              <Select options={REASON_OPTIONS} />
            </Form.Item>

            <Form.Item
              label="Detalle"
              name="details"
              rules={[{ required: true, message: 'Cuéntanos que sucedio' }]}
            >
              <Input.TextArea rows={4} placeholder="Describe el caso de forma breve" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={saving}>
              Enviar solicitud
            </Button>
          </Form>
        </Card>
      </Space>
    </div>
  )
}

export default ReturnRequestPage
