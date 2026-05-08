import { Col, Empty, Row } from 'antd'
import ProductCard from '../products/ProductCard'

const StorefrontProductGrid = ({ products = [], storeSlug }) => {
  if (!products.length) return <Empty description="Esta tienda todavía no tiene productos publicados" />

  return (
    <Row gutter={[22, 22]}>
      {products.map(product => (
        <Col xs={24} sm={12} lg={8} key={product._id}>
          <ProductCard product={product} storeSlug={storeSlug} />
        </Col>
      ))}
    </Row>
  )
}

export default StorefrontProductGrid
