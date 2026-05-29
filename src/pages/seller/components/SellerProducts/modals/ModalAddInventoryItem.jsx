import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from 'antd'

const ModalAddInventoryItem = ({
  open,
  product,
  loading = false,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm()

  const parts = product?.parts || []
  const references = product?.references || []

  const handleFinish = values => {
    onSubmit?.({
      productId: product?._id || product?.id,
      payload: {
        referenceId: values.referenceId,
        partId: values.partId,
        stock: values.stock || 0,
        lowStockThreshold: values.lowStockThreshold || 0,
        attributes: [
          {
            labelSnapshot: 'Talla',
            valueSnapshot: values.size,
          },
        ],
        images: [],
        isActive: true,
      },
    })

    form.resetFields()
  }

  return (
    <Modal
      title={`Agregar inventario${product?.name ? ` - ${product.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          stock: 0,
          lowStockThreshold: 0,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Referencia"
              name="referenceId"
              rules={[{ required: true, message: 'Selecciona una referencia' }]}
            >
              <Select placeholder="Ej: Negro">
                {references.map(reference => (
                  <Select.Option key={reference._id} value={reference._id}>
                    {reference.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Pieza"
              name="partId"
              rules={[{ required: true, message: 'Selecciona una pieza' }]}
            >
              <Select placeholder="Ej: Brasier">
                {parts.map(part => (
                  <Select.Option key={part._id} value={part._id}>
                    {part.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Talla"
              name="size"
              rules={[{ required: true, message: 'La talla es obligatoria' }]}
            >
              <Input placeholder="Ej: S, M, XL, 34B" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: 'El stock es obligatorio' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Alerta stock bajo" name="lowStockThreshold">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Space style={{ width: '100%', justifyContent: 'flex-end', marginTop: 24 }}>
          <Button onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar inventario
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default ModalAddInventoryItem