import { Button, Card, Form, Input, Select, message } from 'antd'

const StoreFormPage = () => {
  const handleSubmit = values => {
    message.success('Tienda guardada localmente. Conecta este submit a /seller/store.')
  }

  return (
    <Card title="Mi tienda">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Nombre" name="name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}><Input addonBefore="/stores/" /></Form.Item>
        <Form.Item label="Vertical" name="vertical" rules={[{ required: true }]}>
          <Select options={[{ label: 'Tech', value: 'tech' }, { label: 'Mujer', value: 'woman' }, { label: 'Hogar', value: 'home' }, { label: 'Ropa', value: 'clothing' }]} />
        </Form.Item>
        <Form.Item label="Descripción" name="description"><Input.TextArea rows={4} /></Form.Item>
        <Button type="primary" htmlType="submit">Guardar tienda</Button>
      </Form>
    </Card>
  )
}

export default StoreFormPage
