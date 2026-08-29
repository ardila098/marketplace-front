import { Col, Empty, Row } from 'antd'
import ProductCard from '../products/ProductCard'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const StorefrontProductGrid = ({ products = [], storeSlug, cardStyle = 'classic' }) => {
  const { translate } = useDictionaryTranslation()
  const columnProps = cardStyle === 'compact'
    ? { xs: 12, sm: 8, lg: 6 }
    : { xs: 24, sm: 12, lg: 8 }

  if (!products.length) {
    return <Empty description={translate('catalog.noStoreProducts')} />
  }

  return (
    <Row gutter={[18, 18]}>
      {products.map(product => (
        <Col {...columnProps} key={product._id}>
          <ProductCard product={product} storeSlug={storeSlug} cardStyle={cardStyle} />
        </Col>
      ))}
    </Row>
  )
}

export default StorefrontProductGrid
