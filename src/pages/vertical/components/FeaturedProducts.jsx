import { Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { buildRoute, ROUTES } from '../../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

import {
  FeaturedProductsRow,
  FeaturedProductCol,
  FeaturedProductCard,
  FeaturedProductHeader,
  VerticalName,
  ViewMoreText,
  ProductImagesRow,
  ProductImage,
  FeaturedStoresLabel,
  FeaturedStoresText,
} from '../../vertical/styles/styleFeaturedProducts'

const FeaturedProducts = ({ data = [] }) => {
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()

  const handleProductClick = productId => {
    navigate(buildRoute(ROUTES.VERTICAL_PRODUCT_DETAIL, { id: productId }))
  }

  const handleViewMoreClick = verticalId => {
    navigate(`/vertical/${verticalId}`)
  }

  return (
    <FeaturedProductsRow gutter={[16, 16]}>
      {data.map(item => {
        const { vertical, products = [] } = item

        if (!vertical?._id) return null

        return (
          <FeaturedProductCol key={vertical._id} xs={24} sm={12} lg={6}>
            <FeaturedProductCard>
              <FeaturedProductHeader justify="space-between" align="middle">
                <VerticalName>{vertical.name}</VerticalName>

                <ViewMoreText onClick={() => handleViewMoreClick(vertical._id)}>
                  {translate('catalog.explore')}
                </ViewMoreText>
              </FeaturedProductHeader>

              <ProductImagesRow gutter={8}>
                {products.slice(0, 3).map(product => (
                  <Col key={product._id} span={8}>
                    <ProductImage
                      src={getUploadUrl(UPLOAD_ROUTES.products.images, product.image)}
                      alt={product.name}
                      onClick={() => handleProductClick(product._id)}
                    />
                  </Col>
                ))}
              </ProductImagesRow>

              <FeaturedStoresLabel>{translate('officialStores')}</FeaturedStoresLabel>

              <FeaturedStoresText>
                {products[0]?.store?.name || translate('stores')}
              </FeaturedStoresText>
            </FeaturedProductCard>
          </FeaturedProductCol>
        )
      })}
    </FeaturedProductsRow>
  )
}

export default FeaturedProducts
