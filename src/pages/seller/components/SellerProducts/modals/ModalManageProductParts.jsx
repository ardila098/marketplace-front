import { Button, Form, Input, Modal, Space } from 'antd'

const ModalManageProductParts = ({
  open,
  product,
  loading = false,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm()

  const handleFinish = values => {
    onSubmit?.({
      productId: product?._id || product?.id,
      payload: {
        name: values.name,
        required: true,
        minSelect: 1,
        maxSelect: 1,
        isActive: true,
      },
    })

    form.resetFields()
  }

  return (
    <Modal
      title={`Agregar pieza${product?.name ? ` - ${product.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Nombre de la pieza"
          name="name"
          rules={[{ required: true, message: 'El nombre es obligatorio' }]}
        >
          <Input placeholder="Ej: Brasier, Panty" />
        </Form.Item>

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar pieza
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default ModalManageProductParts