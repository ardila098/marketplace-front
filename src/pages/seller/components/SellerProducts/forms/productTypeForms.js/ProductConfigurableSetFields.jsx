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
        <Form.Item
          label="Precio anterior base"
          name="compareAtPrice"
          dependencies={['price']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const price = Number(getFieldValue('price') || 0)
                const compareAtPrice = Number(value || 0)

                if (!compareAtPrice || compareAtPrice > price) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  new Error('El precio anterior debe ser mayor al precio actual')
                )
              },
            }),
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.List name="parts">
          {(fields, { add, remove }) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              {fields.map(field => (
                <Row gutter={12} key={field.key} align="middle">
                  <Col xs={24} md={10}>
                    <Form.Item
                      {...field}
                      label="Nombre de la pieza"
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: 'La pieza es obligatoria' }]}
                    >
                      <Input placeholder="Ej: Brasier, Panty" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={5}>
                    <Form.Item
                      {...field}
                      label="Mínimo"
                      name={[field.name, 'minSelect']}
                      rules={[{ required: true, message: 'Requerido' }]}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={5}>
                    <Form.Item
                      {...field}
                      label="Máximo"
                      name={[field.name, 'maxSelect']}
                      rules={[{ required: true, message: 'Requerido' }]}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={4}>
                    <Button
                      danger
                      block
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      style={{ marginTop: 6 }}
                    />
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
      </Col>
    </Row>
  )
}

export default ProductConfigurableSetFields