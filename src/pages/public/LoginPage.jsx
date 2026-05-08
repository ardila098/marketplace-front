import { Alert, Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, setDemoSession } from '../../store/slices/authSlice'
import { PageShell } from '../../styles/layoutStyles'

const redirectByRole = {
  admin: '/admin',
  seller: '/seller',
  customer: '/marketplace'
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(state => state.auth.loading)

  const handleSubmit = async values => {
    const response = await dispatch(login(values)).unwrap()
    const role = response.user?.role
    navigate(redirectByRole[role] || '/marketplace')
  }

  const handleDemoLogin = role => {
    dispatch(setDemoSession({
      token: `demo-${role}-token`,
      user: {
        name: role === 'admin' ? 'Admin Demo' : role === 'seller' ? 'Seller Demo' : 'Cliente Demo',
        email: `${role}@demo.com`,
        role
      }
    }))
    navigate(redirectByRole[role] || '/marketplace')
  }

  return (
    <PageShell>
      <Card style={{ maxWidth: 480, margin: '0 auto', borderRadius: 24 }} bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2}>Iniciar sesión</Typography.Title>
            <Typography.Paragraph type="secondary">Conecta con el backend real o usa acceso demo para revisar módulos y permisos.</Typography.Paragraph>
          </div>
          <Alert type="info" showIcon message="Acceso demo" description="Mientras conectamos el backend, puedes entrar como admin, seller o customer para validar menús y layouts." />
          <Select placeholder="Entrar como demo" onChange={handleDemoLogin} options={[
            { label: 'Admin demo', value: 'admin' },
            { label: 'Seller demo', value: 'seller' },
            { label: 'Customer demo', value: 'customer' }
          ]} />
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
            <Form.Item label="Contraseña" name="password" rules={[{ required: true }]}><Input.Password /></Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>Ingresar</Button>
          </Form>
        </Space>
      </Card>
    </PageShell>
  )
}

export default LoginPage
