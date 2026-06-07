import { useNavigate } from 'react-router-dom'
import { Spin, Empty } from 'antd'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import {
  ProductGrid,
  ProductCard,
  CardImageContainer,
  CardImage,
  CardContent,
  ProductTitle,
  PriceSection,
  PriceText,
  ViewButton,
} from '../../vertical/styles/styleVerticalPage'

const VerticalProductsGrid = ({ products = [], loadingProducts }) => {
  const navigate = useNavigate()

  const formatPrice = price => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price || 0)
  }

  if (loadingProducts) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" tip="Buscando el mejor inventario..." />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Empty
        description="Aún no hay productos disponibles en esta categoría"
        image={Empty.PRESENTED_IMAGE_DEFAULT}
      />
    )
  }

  return (
    <ProductGrid>
      {products.map(product => {
        const firstImage = product.image
        const productImageUrl =
          getUploadUrl(UPLOAD_ROUTES.products.images, firstImage) ||
          'https://via.placeholder.com/300?text=Sin+Imagen'

        return (
          <ProductCard key={product._id} onClick={() => navigate(`/vertical/products/${product._id}`)}>
            <CardImageContainer>
              <CardImage src={productImageUrl} alt={product.name} />
            </CardImageContainer>

            <CardContent>
              <ProductTitle title={product.name}>{product.name}</ProductTitle>
              <PriceSection>
                <PriceText>{formatPrice(product.price)}</PriceText>
                <ViewButton>Ver Detalle →</ViewButton>
              </PriceSection>
            </CardContent>
          </ProductCard>
        )
      })}
    </ProductGrid>
  )
}

export default VerticalProductsGrid
