import { Col, Empty, Row } from 'antd'
import ProductCard from '../products/ProductCard'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const StorefrontProductGrid = ({ products = [], storeSlug }) => {
  const { translate } = useDictionaryTranslation()

  if (!products.length) {
    return <Empty description={translate('catalog.noStoreProducts')} />
  }

  return (
    <Row gutter={[18, 18]}>
      {products.map(product => (
        <Col xs={24} sm={12} lg={8} key={product._id}>
          <ProductCard product={product} storeSlug={storeSlug} />
        </Col>
      ))}
    </Row>
  )
}

export default StorefrontProductGrid
