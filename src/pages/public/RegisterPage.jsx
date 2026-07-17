import { Button, Card, Form, Input, Select, Typography, message } from 'antd'
import { PageShell } from '../../styles/layoutStyles'

const RegisterPage = () => {
  const handleSubmit = () => {
    message.success('Registro listo para conectar con /auth/register')
  }

  return (
    <PageShell>
      <Card style={{ maxWidth: 520, margin: '0 auto' }}>
        <Typography.Title level={2}>Crear cuenta</Typography.Title>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={{ role: 'customer' }}>
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
          <Form.Item label="Contraseña" name="password" rules={[{ required: true }]}><Input.Password /></Form.Item>
          <Form.Item label="Tipo de cuenta" name="role"><Select options={[{ label: 'Cliente', value: 'customer' }, { label: 'Seller / Marca', value: 'seller' }]} /></Form.Item>
          <Button type="primary" htmlType="submit" block>Crear cuenta</Button>
        </Form>
      </Card>
    </PageShell>
  )
}

export default RegisterPage
