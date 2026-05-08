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
}