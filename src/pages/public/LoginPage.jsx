import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'
import { login } from '../../store/slices/authSlice'
import { PageShell } from '../../styles/layoutStyles'

const redirectByRole = {
  [ROLES.ADMIN.value]: ROUTES.ADMIN_DASHBOARD,
  [ROLES.SELLER.value]: ROUTES.SELLER_DASHBOARD,
  [ROLES.CUSTOMER.value]: ROUTES.MARKETPLACE,
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)

  const handleSubmit = async values => {
    const response = await dispatch(login(values)).unwrap()

    const redirectTo = redirectByRole[response.user.role] || ROUTES.MARKETPLACE

    navigate(redirectTo, { replace: true })
  }

  return (
    <PageShell>
      <Card
        style={{ maxWidth: 480, margin: '0 auto', borderRadius: 24 }}
        bordered={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2}>
              Iniciar sesión
            </Typography.Title>

            <Typography.Paragraph type="secondary">
              Ingresa con tu cuenta para acceder a tu panel.
            </Typography.Paragraph>
          </div>

          {error && (
            <Typography.Text type="danger">
              {error}
            </Typography.Text>
          )}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'El email es obligatorio' },
                { type: 'email', message: 'Ingresa un email válido' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: 'La contraseña es obligatoria' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Ingresar
            </Button>
          </Form>
        </Space>
      </Card>
    </PageShell>
  )
}

export default LoginPage