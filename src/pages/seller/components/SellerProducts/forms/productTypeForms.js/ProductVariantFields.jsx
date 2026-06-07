import { Alert, Col, Row } from 'antd'

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
    </Row>
  )
}

export default ProductVariantFields
