import { Button, Col, Divider, Empty, message, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductImageGallery from '../../components/products/ProductImageGallery'
import VariantSelector from '../../components/products/VariantSelector'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { addCartItem, openCartDrawer } from '../../store/slices/cartSlice'
import { PageShell } from '../../styles/layoutStyles'
import { currency } from '../../utils/formatters'
import useStoreProductDetail from './hooks/useStoreProductDetail'

const StorefrontProductDetailPage = () => {
  const dispatch = useDispatch()
  const { storeSlug, productSlug } = useParams()
  const { product, loading } = useStoreProductDetail(storeSlug, productSlug)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    setSelectedVariant(product?.variants?.[0] || null)
  }, [product])

  const images = useMemo(() => {
    if (!product) return []
    return [selectedVariant?.image, ...(product.images || [])]
      .filter(Boolean)
      .map(file => getUploadUrl(UPLOAD_ROUTES.products.images, file))
  }, [selectedVariant, product])

  if (loading) {
    return (
      <PageShell>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><Spin size="large" /></div>
      </PageShell>
    )
  }

  if (!product) {
    return (
      <PageShell>
        <Empty description="Producto no encontrado en esta tienda" />
      </PageShell>
    )
  }

  const categoryLabel = product.category?.name || product.category
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
              <Typography.Text type="secondary">{product.store?.name}{categoryLabel ? ` · ${categoryLabel}` : ''}</Typography.Text>
              <Typography.Title style={{ marginBottom: 8, letterSpacing: '-.05em' }}>{product.name}</Typography.Title>
              <Typography.Title level={3}>{currency(selectedVariant?.price || product.price)}</Typography.Title>
              <Typography.Paragraph type="secondary">{product.description}</Typography.Paragraph>
            </div>
            {product.variants?.length > 0 && (
              <VariantSelector variants={product.variants} selectedVariant={selectedVariant} onChange={setSelectedVariant} />
            )}
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
