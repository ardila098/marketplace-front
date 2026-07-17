export const getItemId = item => {
  return item?.itemId || item?._id
}

export const getItemImage = item => {
  return item?.image || item?.images?.[0] || null
}

export const getItemPrice = item => {
  return item?.price || 0
}

export const getItemCompareAtPrice = item => {
  return item?.compareAtPrice || null
}

export const getItemDiscountPercentage = item => {
  return item?.discountPercentage || 0
}

export const getItemLabel = item => {
  return item?.referenceName || item?.name
}
