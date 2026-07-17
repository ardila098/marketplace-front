import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { formatPrice } from '../../../helpers/formatPrice'
import {
  getItemCompareAtPrice,
  getItemDiscountPercentage,
  getItemImage,
  getItemPrice,
} from '../../../helpers/catalogProduct'

import ThumbnailList from './ThumbnailList'

import {
  ProductCard,
  CardImageContainer,
  CardImage,
  CardContent,
  PriceBlock,
  PriceText,
  ComparePrice,
  ProductTitle,
  ProductMeta,
  ProductSubMeta,
  ProductBadgeLine,
  DiscountText,
  ViewButton,
} from './styles'

const ProductCatalogCard = ({ product }) => {
  const navigate = useNavigate()
  const items = product?.itemsPreview || []

  const [selectedItem, setSelectedItem] = useState(product?.selectedItem || items[0])

  const image = getItemImage(selectedItem)
  const price = getItemPrice(selectedItem)
  const compareAtPrice = getItemCompareAtPrice(selectedItem)
  const discountPercentage = getItemDiscountPercentage(selectedItem)

  const hasDiscount = compareAtPrice > price

  const handleOpenDetail = () => {
    navigate(`/vertical/products/${product._id}`)
  }

  const handleImageKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpenDetail()
    }
  }

  return (
    <ProductCard>
      <CardImageContainer
        role="link"
        tabIndex={0}
        onClick={handleOpenDetail}
        onKeyDown={handleImageKeyDown}
      >
        <CardImage
          src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
          alt={product.name}
        />
      </CardImageContainer>

      {items.length > 1 && (
        <ThumbnailList
          items={items}
          selectedItem={selectedItem}
          onChangeItem={setSelectedItem}
        />
      )}

      <CardContent>
        <PriceBlock>
          <PriceText>{formatPrice(price)}</PriceText>

          {hasDiscount && (
            <ComparePrice>
              {formatPrice(compareAtPrice)}
            </ComparePrice>
          )}
        </PriceBlock>

        <ProductTitle title={product.name}>
          {product.name}
        </ProductTitle>

        <ProductMeta>
          {product.category?.name || 'Sin categoría'}
        </ProductMeta>

        {items.length > 1 && (
          <ProductSubMeta>
            {items.length} opciones
          </ProductSubMeta>
        )}

        <ProductBadgeLine>
          {hasDiscount ? (
            <DiscountText>
              {discountPercentage}% de reducción
            </DiscountText>
          ) : (
            'Nuevo · Envío Gratis'
          )}
        </ProductBadgeLine>

        <ViewButton>
          Ver detalle
        </ViewButton>
      </CardContent>
    </ProductCard>
  )
}

export default ProductCatalogCard
