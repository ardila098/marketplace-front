import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants/routes'
import { authService } from '../../services/authService'
import { PageShell } from '../../styles/layoutStyles'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async values => {
    setLoading(true)

    try {
      await authService.register(values)
      message.success('Cuenta creada correctamente')
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (error) {
      message.error(error?.message || 'No se pudo crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <Card style={{ maxWidth: 520, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2}>
              Crear cuenta
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              Crea una cuenta de cliente para comprar y consultar tus pedidos.
            </Typography.Paragraph>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'El nombre es obligatorio' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'El email es obligatorio' },
                { type: 'email', message: 'Ingresa un email valido' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Telefono" name="phone">
              <Input />
            </Form.Item>

            <Form.Item
              label="Contrasena"
              name="password"
              rules={[{ required: true, message: 'La contrasena es obligatoria' }]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
              Crear cuenta
            </Button>
          </Form>
        </Space>
      </Card>
    </PageShell>
  )
}

export default RegisterPage
