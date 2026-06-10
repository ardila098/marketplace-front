import { formatPrice } from '../../../helpers/formatPrice'
import {
  getItemCompareAtPrice,
  getItemDiscountPercentage,
  getItemPrice,
} from '../../../helpers/catalogProduct'

import {
  ProductHeader,
  StoreText,
  ProductTitle,
  CategoryText,
  PriceRow,
  PriceText,
  ComparePrice,
  DiscountText,
  Description,
} from '../styles/styles'

const ItemInfo = ({ product, selectedItem }) => {
  const price = getItemPrice(selectedItem) || product.price || 0
  const compareAtPrice = getItemCompareAtPrice(selectedItem) || product.compareAtPrice || 0

  const discountPercentage = getItemDiscountPercentage(selectedItem)
  const hasDiscount = compareAtPrice > price

  return (
    <ProductHeader>
      <StoreText>{product.store?.name}</StoreText>

      <ProductTitle>{product.name}</ProductTitle>

      <CategoryText>{product.category?.name}</CategoryText>

      <PriceRow>
        <PriceText>{formatPrice(price)}</PriceText>

        {hasDiscount && <ComparePrice>{formatPrice(compareAtPrice)}</ComparePrice>}
      </PriceRow>

      {hasDiscount && <DiscountText>{discountPercentage}% de reducción</DiscountText>}

      {product.description && <Description>{product.description}</Description>}
    </ProductHeader>
  )
}

export default ItemInfo
