import { useEffect, useMemo, useState } from 'react'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { buildRoute, ROUTES } from '../../constants/routes'
import { currency } from '../../utils/formatters'
import { useSelector } from 'react-redux'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { getItemLabel } from '../../helpers/catalogProduct'

import {
  ProductImageLink,
  ProductCardWrapper,
  ImageWrap,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductMeta,
  ProductPrice,
  ImagePlaceholder,
  PriceRow,
  ComparePrice,
  DiscountBadge,
  NewBadge,
  VariantPreview,
  PreviewButton,
  PreviewImage,
  Dot,
} from './style'

const getImage = item => {
  return item?.image || item?.images?.[0] || null
}

const getItemId = item => {
  return String(item?.itemId || item?._id || item?.sku || item?.image || '')
}

const ProductCard = ({ product, storeSlug, detailPath, cardStyle = 'classic' }) => {
  const { translate } = useDictionaryTranslation()
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const previews = useMemo(() => {
    return (product.itemsPreview || product.variants || []).slice(0, 5)
  }, [product])
  const defaultSelectedItem = product.selectedItem || previews[0] || product
  const [selectedItemId, setSelectedItemId] = useState(getItemId(defaultSelectedItem))

  useEffect(() => {
    setSelectedItemId(getItemId(defaultSelectedItem))
  }, [product._id, defaultSelectedItem])

  const selectedItem = previews.find(item => getItemId(item) === selectedItemId) || defaultSelectedItem
  const selectedItemKey = getItemId(selectedItem)
  const selectedItemLabel = getItemLabel(selectedItem)
  const shouldShowItemLabel = selectedItemLabel && selectedItemLabel !== product.name
  const mainImage = getImage(selectedItem) || getImage(product) || getImage(product?.variants?.[0])
  const price = selectedItem?.price || product.minPrice || product.variants?.[0]?.price || product.price || 0
  const compareAtPrice = selectedItem?.compareAtPrice || product.compareAtPrice || 0
  const discountPercentage = compareAtPrice > price
    ? selectedItem?.discountPercentage || product.selectedItem?.discountPercentage || product.maxDiscountPercentage || 0
    : 0
  const targetRoute = detailPath || (storeSlug
    ? resolutionMode === 'host'
      ? `/products/${product.slug}`
      : buildRoute(ROUTES.STOREFRONT_PRODUCT_DETAIL, {
          storeSlug,
          productSlug: product.slug,
        })
    : buildRoute(ROUTES.VERTICAL_PRODUCT_DETAIL, { id: product._id }))

  return (
    <ProductCardWrapper hoverable bordered={false} $variant={cardStyle}>
      <ProductImageLink to={targetRoute} aria-label={`Ver detalle de ${product.name}`}>
        <ImageWrap $variant={cardStyle}>
          {product.isNew && <NewBadge>{translate('new')}</NewBadge>}
          {mainImage ? (
            <ProductImage
              src={getUploadUrl(UPLOAD_ROUTES.products.images, mainImage)}
              alt={product.name}
            />
          ) : (
            <ImagePlaceholder>{product.name?.charAt(0) || 'P'}</ImagePlaceholder>
          )}
        </ImageWrap>
      </ProductImageLink>

      <ProductInfo $variant={cardStyle}>
        <ProductName $variant={cardStyle}>{product.name}</ProductName>

        {shouldShowItemLabel && <ProductMeta>{selectedItemLabel}</ProductMeta>}

        <PriceRow $variant={cardStyle}>
          <ProductPrice>{currency(price)}</ProductPrice>
          {compareAtPrice > price && <ComparePrice>{currency(compareAtPrice)}</ComparePrice>}
          {discountPercentage > 0 && (
            <DiscountBadge>
              -{discountPercentage}%
            </DiscountBadge>
          )}
        </PriceRow>

        {!!previews.length && (
          <VariantPreview $variant={cardStyle}>
            {previews.map((variant, index) => {
              const image = getImage(variant)
              const itemId = getItemId(variant)
              const key = `${itemId || image || 'preview'}-${index}`

              return (
                <PreviewButton
                  key={key}
                  type="button"
                  $variant={cardStyle}
                  $active={itemId === selectedItemKey}
                  title={getItemLabel(variant) || product.name}
                  onClick={() => setSelectedItemId(itemId)}
                >
                  {image ? (
                    <PreviewImage
                      src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                      alt={getItemLabel(variant) || product.name}
                    />
                  ) : (
                    <Dot
                      $color={variant.attributes?.hex || variant.hex}
                      title={variant.attributes?.color}
                    />
                  )}
                </PreviewButton>
              )
            })}
          </VariantPreview>
        )}
      </ProductInfo>
    </ProductCardWrapper>
  )
}

export default ProductCard
