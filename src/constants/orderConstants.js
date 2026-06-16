export const ORDER_STATUS = Object.freeze({
  PENDING: {
    value: 0,
    label: 'Pendiente',
  },
  CONFIRMED: {
    value: 1,
    label: 'Confirmada',
  },
  COMPLETED: {
    value: 2,
    label: 'Completada',
  },
  CANCELLED: {
    value: 3,
    label: 'Cancelada',
  },
})

export const PAYMENT_STATUS = Object.freeze({
  PENDING: {
    value: 0,
    label: 'Pendiente',
  },
  PAID: {
    value: 1,
    label: 'Pagado',
  },
  FAILED: {
    value: 2,
    label: 'Fallido',
  },
  REFUNDED: {
    value: 3,
    label: 'Reembolsado',
  },
})

export const FULFILLMENT_STATUS = Object.freeze({
  PENDING: {
    value: 0,
    label: 'Pendiente',
  },
  PROCESSING: {
    value: 1,
    label: 'En preparación',
  },
  READY_TO_SHIP: {
    value: 2,
    label: 'Lista para enviar',
  },
  SHIPPED: {
    value: 3,
    label: 'Enviada',
  },
  DELIVERED: {
    value: 4,
    label: 'Entregada',
  },
  CANCELLED: {
    value: 5,
    label: 'Cancelada',
  },
})

export const PAYMENT_METHODS = Object.freeze({
  MANUAL: {
    value: 0,
    label: 'Manual',
  },
  WOMPI: {
    value: 1,
    label: 'Wompi',
  },
})

export const ORDER_STATUS_VALUES = Object.freeze(
  Object.values(ORDER_STATUS).map(status => status.value)
)

export const PAYMENT_STATUS_VALUES = Object.freeze(
  Object.values(PAYMENT_STATUS).map(status => status.value)
)

export const FULFILLMENT_STATUS_VALUES = Object.freeze(
  Object.values(FULFILLMENT_STATUS).map(status => status.value)
)

export const PAYMENT_METHOD_VALUES = Object.freeze(
  Object.values(PAYMENT_METHODS).map(method => method.value)
)
