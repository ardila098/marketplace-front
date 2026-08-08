export const ORDER_STATUS = Object.freeze({
  PENDING_PAYMENT: {
    value: 'pending_payment',
    labelKey: 'orders.status.pendingPayment',
  },
  PAID: {
    value: 'paid',
    labelKey: 'orders.status.paid',
  },
  CANCELLED: {
    value: 'cancelled',
    labelKey: 'orders.status.cancelled',
  },
  COMPLETED: {
    value: 'completed',
    labelKey: 'orders.status.completed',
  },
})

export const PAYMENT_STATUS = Object.freeze({
  PENDING: {
    value: 'pending',
    labelKey: 'orders.status.pending',
  },
  APPROVED: {
    value: 'approved',
    labelKey: 'orders.status.approved',
  },
  REJECTED: {
    value: 'rejected',
    labelKey: 'orders.status.rejected',
  },
  FAILED: {
    value: 'failed',
    labelKey: 'orders.status.failed',
  },
  CANCELLED: {
    value: 'cancelled',
    labelKey: 'orders.status.cancelled',
  },
  REFUNDED: {
    value: 'refunded',
    labelKey: 'orders.status.refunded',
  },
})

export const FULFILLMENT_STATUS = Object.freeze({
  WAITING_STORES: {
    value: 'waiting_stores',
    labelKey: 'orders.status.waitingStores',
  },
  CONSOLIDATING: {
    value: 'consolidating',
    labelKey: 'orders.status.consolidating',
  },
  READY_TO_SHIP: {
    value: 'ready_to_ship',
    labelKey: 'orders.status.readyToShip',
  },
  SHIPPED: {
    value: 'shipped',
    labelKey: 'orders.status.shipped',
  },
  DELIVERED: {
    value: 'delivered',
    labelKey: 'orders.status.delivered',
  },
  CANCELLED: {
    value: 'cancelled',
    labelKey: 'orders.status.cancelled',
  },
})

export const PAYMENT_METHODS = Object.freeze({
  WOMPI: {
    value: 'wompi',
    labelKey: 'orders.payment.wompi',
  },
})

export const STORE_ORDER_STATUS = Object.freeze({
  PENDING: {
    value: 'pending',
    labelKey: 'orders.status.pending',
  },
  PREPARING: {
    value: 'preparing',
    labelKey: 'orders.status.preparing',
  },
  SENT_TO_PLATFORM: {
    value: 'sent_to_platform',
    labelKey: 'orders.status.sentToPlatform',
  },
  RECEIVED_BY_PLATFORM: {
    value: 'received_by_platform',
    labelKey: 'orders.status.receivedByPlatform',
  },
  SHIPPED: {
    value: 'shipped',
    labelKey: 'orders.status.shipped',
  },
  DELIVERED: {
    value: 'delivered',
    labelKey: 'orders.status.delivered',
  },
  CANCELLED: {
    value: 'cancelled',
    labelKey: 'orders.status.cancelled',
  },
})

export const SALES_CHANNEL = Object.freeze({
  MARKETPLACE: {
    value: 'marketplace',
    label: 'Marketplace',
  },
  STOREFRONT: {
    value: 'storefront',
    label: 'Tienda',
  },
})

export const PAYOUT_STATUS = Object.freeze({
  PENDING: {
    value: 'pending',
    labelKey: 'orders.status.pending',
  },
  PROCESSING: {
    value: 'processing',
    labelKey: 'orders.status.processing',
  },
  PAID: {
    value: 'paid',
    labelKey: 'orders.status.paid',
  },
  CANCELLED: {
    value: 'cancelled',
    labelKey: 'orders.status.cancelled',
  },
})

const values = object => Object.freeze(Object.values(object).map(item => item.value))

export const ORDER_STATUS_VALUES = values(ORDER_STATUS)
export const PAYMENT_STATUS_VALUES = values(PAYMENT_STATUS)
export const FULFILLMENT_STATUS_VALUES = values(FULFILLMENT_STATUS)
export const PAYMENT_METHOD_VALUES = values(PAYMENT_METHODS)
export const STORE_ORDER_STATUS_VALUES = values(STORE_ORDER_STATUS)
export const PAYOUT_STATUS_VALUES = values(PAYOUT_STATUS)
export const SALES_CHANNEL_VALUES = values(SALES_CHANNEL)
