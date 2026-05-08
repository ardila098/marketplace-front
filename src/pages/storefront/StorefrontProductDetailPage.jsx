import { Button, Col, Divider, message, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../../components/products/ProductImageGallery'
import VariantSelector from '../../components/products/VariantSelector'
import { mockProducts } from '../../data/mockData'
import { addCartItem, openCartDrawer } from '../../store/slices/cartSlice'
import { PageShell } from '../../styles/layoutStyles'
import { currency } from '../../utils/formatters'

const StorefrontProductDetailPage = () => {
  const dispatch = useDispatch()
  const { storeSlug, productSlug } = useParams()
  const product = mockProducts.find(item => item.store.slug === storeSlug && item.slug === productSlug) || mockProducts[0]
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const images = useMemo(() => [selectedVariant?.image, ...(product.images || [])].filter(Boolean), [selectedVariant, product])

  const handleAddToCart = () => {
    dispatch(addCartItem({ product, variant: selectedVariant, quantity: 1 }))
    dispatch(openCartDrawer())
    message.success('Producto agregado al carrito')
  }

  return (
    <PageShell>
      <Row gutter={[42, 42]}>
        <Col xs={24} md={12}><ProductImageGallery images={images} /></Col>
        <Col xs={24} md={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Typography.Text type="secondary">{product.store?.name} · {product.category}</Typography.Text>
              <Typography.Title style={{ marginBottom: 8, letterSpacing: '-.05em' }}>{product.name}</Typography.Title>
              <Typography.Title level={3}>{currency(selectedVariant?.price || product.price)}</Typography.Title>
              <Typography.Paragraph type="secondary">{product.description}</Typography.Paragraph>
            </div>
            <VariantSelector variants={product.variants} selectedVariant={selectedVariant} onChange={setSelectedVariant} />
            <Divider />
            <Button type="primary" size="large" block disabled={!selectedVariant || selectedVariant.stock <= 0} onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </Space>
        </Col>
      </Row>
    </PageShell>
  )
}

export default StorefrontProductDetailPage
