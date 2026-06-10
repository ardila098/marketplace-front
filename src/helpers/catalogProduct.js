export const getItemId = item => {
  console.log(item)
  return item?._id || item?.itemId
}

export const getItemImage = item => {
  console.log(item)
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
