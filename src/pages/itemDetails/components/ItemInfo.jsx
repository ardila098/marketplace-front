import { formatPrice } from '../../../helpers/formatPrice'
import {
  getItemCompareAtPrice,
  getItemDiscountPercentage,
  getItemLabel,
} from '../../../helpers/catalogProduct'

import {
  ProductHeader,
  ProductTitle,
  CategoryText,
  ReferenceText,
  PriceRow,
  PriceText,
  ComparePrice,
  DiscountText,
  Description,
} from '../styles/styles'

const ItemInfo = ({ item, selectedReference }) => {
  const displayItem = selectedReference || item
  const compareAtPrice = getItemCompareAtPrice(displayItem)
  const discountPercentage = getItemDiscountPercentage(displayItem)
  const hasDiscount = compareAtPrice > displayItem?.price
  const referenceLabel = selectedReference?._id !== item?._id
    ? getItemLabel(selectedReference)
    : ''

  return (
    <ProductHeader>
      <ProductTitle>{item?.name}</ProductTitle>

      {referenceLabel && <ReferenceText>{referenceLabel}</ReferenceText>}

      <CategoryText>{item?.category?.name}</CategoryText>

      <PriceRow>
        <PriceText>{formatPrice(displayItem?.price)}</PriceText>

        {hasDiscount && <ComparePrice>{formatPrice(compareAtPrice)}</ComparePrice>}
      </PriceRow>

      {hasDiscount && <DiscountText>{discountPercentage}% de reducción</DiscountText>}

      {item?.description && <Description>{item?.description}</Description>}
    </ProductHeader>
  )
}

export default ItemInfo
