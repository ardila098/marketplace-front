import { Alert, Col, Form, InputNumber, Row } from 'antd'

const ProductVariantFields = () => {
  return (
    <Row gutter={16}>
      <Col xs={24}>
        <Alert
          type="info"
          showIcon
          message="Producto con variantes"
          description="Primero guarda el producto base. Luego podrás agregar variantes como talla, color, capacidad o volumen desde la tabla."
          style={{ marginBottom: 16 }}
        />
      </Col>

      <Col xs={24} md={6}>
        <Form.Item label="Precio base" name="price">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={6}>
        <Form.Item label="Precio anterior base" name="compareAtPrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default ProductVariantFields