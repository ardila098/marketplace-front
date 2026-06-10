export const getCartItemImage = item => {
  return item.imageSnapshot || item.product?.images?.[0] || null
}

export const getCartItemName = item => {
  return item.productNameSnapshot || item.product?.name || 'Producto'
}

export const getCartItemDescription = item => {
  if (Number(item.productType) === 3) {
    const selectedItems = item.selectedItems || []

    const partsLabel = selectedItems
      .map(selectedItem => {
        return `${selectedItem.partNameSnapshot}: ${selectedItem.optionLabelSnapshot}`
      })
      .filter(Boolean)
      .join(' / ')

    return [item.itemNameSnapshot, partsLabel].filter(Boolean).join(' · ')
  }

  return item.itemNameSnapshot || 'Opción seleccionada'
}

export const getCartItemSubtotal = item => {
  return Number(item.priceSnapshot || 0) * Number(item.quantity || 1)
}
