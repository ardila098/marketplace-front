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

const ItemInfo = ({ item }) => {
  const compareAtPrice = getItemCompareAtPrice(item)
  const discountPercentage = getItemDiscountPercentage(item)
  const hasDiscount = compareAtPrice > item?.price

  return (
    <ProductHeader>
      <StoreText>{item?.store?.name}</StoreText>

      <ProductTitle>{item?.name}</ProductTitle>

      <CategoryText>{item?.category?.name}</CategoryText>

      <PriceRow>
        <PriceText>{formatPrice(item?.price)}</PriceText>

        {hasDiscount && <ComparePrice>{formatPrice(compareAtPrice)}</ComparePrice>}
      </PriceRow>

      {hasDiscount && <DiscountText>{discountPercentage}% de reducción</DiscountText>}

      {item?.description && <Description>{item?.description}</Description>}
    </ProductHeader>
  )
}

export default ItemInfo
