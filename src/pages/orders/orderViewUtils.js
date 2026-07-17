export const formatOrderDate = value => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getOrderTotal = order => {
  return order?.totalPaid ?? order?.total ?? 0
}

export const getStoreOrderCustomer = storeOrder => {
  return storeOrder?.order?.customer || {}
}

export const getStoreOrderPaymentStatus = storeOrder => {
  return storeOrder?.order?.paymentStatus
}

export const getStoreName = storeOrder => {
  return storeOrder?.store?.name || storeOrder?.storeNameSnapshot || '-'
}

export const getItemName = (item, fallback = '') => {
  return item?.productNameSnapshot || item?.productName || fallback
}

export const getItemDescription = item => {
  return item?.itemNameSnapshot || item?.referenceSnapshot?.label || ''
}

export const getItemsPreview = (items, fallback = '-') => {
  const productNames = (items || []).slice(0, 2).map(item => getItemName(item, fallback))
  return productNames.length ? productNames.join(', ') : '-'
}

export const getItemsCount = items => {
  return (items || []).reduce((total, item) => total + Number(item.quantity || 0), 0)
}

export const getAddressLine = shippingAddress => {
  if (!shippingAddress) return '-'

  return [
    shippingAddress.address,
    shippingAddress.neighborhood,
    shippingAddress.city,
    shippingAddress.department,
  ].filter(Boolean).join(', ')
}

export const getAdminOrderItems = order => {
  if (order?.items?.length) return order.items

  return (order?.storeOrders || []).flatMap(storeOrder => {
    return (storeOrder.items || []).map(item => ({
      ...item,
      storeName: getStoreName(storeOrder),
    }))
  })
}
