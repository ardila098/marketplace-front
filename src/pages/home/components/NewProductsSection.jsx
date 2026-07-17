import { Col, Row, Spin, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ProductCard from '../../../components/products/ProductCard'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { catalogService } from '../../../services/catalogService'

const NewProductsSection = () => {
  const { translate } = useDictionaryTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      const response = await catalogService.getCatalog({
        isNew: 'true',
        limit: 8,
      })
      setProducts(response.data || [])
    } catch (error) {
      console.error(error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if (!loading && !products.length) return null

  return (
    <section>
      <Typography.Text type="secondary">{translate('home.newProductsSubtitle')}</Typography.Text>
      <Typography.Title level={3} style={{ marginTop: 4, marginBottom: 18, letterSpacing: 0 }}>
        {translate('home.newProductsTitle')}
      </Typography.Title>

      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[18, 18]}>
          {products.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}

export default NewProductsSection
