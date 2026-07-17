import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

const cleanParams = params => {
  return Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value)
  )
}

export const orderService = {
  getOrders: async params => {
    const response = await DataService.get(API_ROUTES.orders.base, params)
    return normalizeListResponse(response)
  },

  getOrderById: async id => {
    const response = await DataService.get(API_ROUTES.orders.byId(id))
    return normalizeItemResponse(response)
  },

  lookupOrder: payload => {
    return DataService.post(API_ROUTES.orders.lookup, payload)
  },

  getPaymentResult: async params => {
    const response = await DataService.get(
      API_ROUTES.orders.paymentResult,
      cleanParams(params)
    )
    return normalizeItemResponse(response)
  },

  markStoreOrderSentToPlatform: id => {
    return DataService.patch(API_ROUTES.orders.storeOrderSentToPlatform(id))
  },

  markStoreOrderReceivedByPlatform: id => {
    return DataService.patch(API_ROUTES.orders.storeOrderReceivedByPlatform(id))
  },

  getPendingPayouts: async params => {
    const response = await DataService.get(API_ROUTES.orders.pendingPayouts, params)
    return normalizeListResponse(response)
  },

  getPayouts: async params => {
    const response = await DataService.get(API_ROUTES.orders.payouts, params)
    return normalizeListResponse(response)
  },

  getPayoutSummary: async params => {
    const response = await DataService.get(API_ROUTES.orders.payoutSummary, params)
    return normalizeItemResponse(response)
  },

  createPayout: payload => {
    return DataService.post(API_ROUTES.orders.payouts, payload)
  },

  markPayoutPaid: (id, payload = {}) => {
    return DataService.patch(API_ROUTES.orders.payPayout(id), payload)
  },

  dispatchOrder: id => {
    return DataService.patch(API_ROUTES.orders.storeOrderSentToPlatform(id))
  },
}
