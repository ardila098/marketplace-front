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
  return item?.variantReference || item?.referenceName || item?.sku || item?.name
}

export const getItemAttributesLabel = attributes => {
  if (!Array.isArray(attributes)) return ''

  return attributes
    .map(attribute => {
      if (!attribute) return ''
      if (typeof attribute === 'string') return attribute

      const label = attribute.labelSnapshot || attribute.label || attribute.name || attribute.key
      const value = attribute.valueSnapshot || attribute.value || attribute.option

      return [label, value].filter(Boolean).join(': ')
    })
    .filter(Boolean)
    .join(' / ')
}
