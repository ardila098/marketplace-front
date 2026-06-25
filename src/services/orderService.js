import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const orderService = {
  myOrders: async params => {
    const response = await DataService.get(API_ROUTES.orders.myOrders, params)
    return normalizeListResponse(response)
  },

  sellerOrders: async params => {
    const response = await DataService.get(API_ROUTES.orders.sellerOrders, params)
    return normalizeListResponse(response)
  },

  adminOrders: async params => {
    const response = await DataService.get(API_ROUTES.orders.adminOrders, params)
    return normalizeListResponse(response)
  },

  getById: async id => {
    const response = await DataService.get(API_ROUTES.orders.byId(id))
    return normalizeItemResponse(response)
  },

  lookupOrder: payload => {
    return DataService.post(API_ROUTES.orders.lookup, payload)
  },

  getSellerOrderById: async id => {
    const response = await DataService.get(API_ROUTES.orders.sellerById(id))

    return normalizeItemResponse(response)
  },

  dispatchSellerOrder: (id, payload = {}) => {
    return DataService.patch(API_ROUTES.orders.sellerDispatch(id), payload)
  },
}
