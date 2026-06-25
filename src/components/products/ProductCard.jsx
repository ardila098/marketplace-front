import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { currency } from '../../utils/formatters'

import {
  ProductLink,
  ProductCardWrapper,
  ImageWrap,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductMeta,
  ProductPrice,
  VariantPreview,
  PreviewImage,
  Dot,
} from './style'

const getImage = item => {
  return item?.image || item?.images?.[0] || null
}

const ProductCard = ({ product }) => {
  const mainImage = getImage(product) || getImage(product?.variants?.[0])
  const price = product.minPrice || product.variants?.[0]?.price || product.price || 0
  const previews = (product.itemsPreview || product.variants || []).slice(0, 5)

  return (
    <ProductLink to={buildRoute(ROUTES.VERTICAL_PRODUCT_DETAIL, { id: product._id })}>
      <ProductCardWrapper hoverable bordered={false}>
        <ImageWrap>
          {mainImage && (
            <ProductImage
              src={getUploadUrl(UPLOAD_ROUTES.products.images, mainImage)}
              alt={product.name}
            />
          )}
        </ImageWrap>

        <ProductInfo>
          <ProductName>{product.name}</ProductName>

          <ProductMeta>{product.store?.name || product.category}</ProductMeta>

          <ProductPrice>{currency(price)}</ProductPrice>

          {!!previews.length && (
            <VariantPreview>
              {previews.map((variant, index) => {
                const image = getImage(variant)
                const key = `${variant._id || variant.itemId || variant.sku || image || 'preview'}-${index}`

                return image ? (
                  <PreviewImage
                    key={key}
                    src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                    alt={variant.name || product.name}
                  />
                ) : (
                  <Dot
                    key={key}
                    $color={variant.attributes?.hex || variant.hex}
                    title={variant.attributes?.color}
                  />
                )
              })}
            </VariantPreview>
          )}
        </ProductInfo>
      </ProductCardWrapper>
    </ProductLink>
  )
}

export default ProductCard
