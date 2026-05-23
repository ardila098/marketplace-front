import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const ProductConfigurableSetFields = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={8}>
        <Form.Item label="Precio base" name="price">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Precio anterior base" name="compareAtPrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.List name="parts">
          {(fields, { add, remove }) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              {fields.map(field => (
                <Row gutter={12} key={field.key}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...field}
                      label="Nombre de la pieza"
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: 'La pieza es obligatoria' }]}
                    >
                      <Input placeholder="Ej: Brasier" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      {...field}
                      label="Key"
                      name={[field.name, 'key']}
                      rules={[{ required: true, message: 'El key es obligatorio' }]}
                    >
                      <Input placeholder="Ej: brasier" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={3}>
                    <Form.Item
                      {...field}
                      label="Mínimo"
                      name={[field.name, 'minSelect']}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={3}>
                    <Form.Item
                      {...field}
                      label="Máximo"
                      name={[field.name, 'maxSelect']}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col xs={2} style={{margin:'auto'}}>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    >
                    </Button>
                  </Col>
                </Row>
              ))}

              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
                onClick={() =>
                  add({
                    required: true,
                    minSelect: 1,
                    maxSelect: 1,
                    isActive: true,
                  })
                }
              >
                Agregar pieza
              </Button>
            </Space>
          )}
        </Form.List>
      </Col >
    </Row >
  )
}

export default ProductConfigurableSetFields