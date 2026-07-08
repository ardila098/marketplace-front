import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

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

  dispatchOrder: (id, payload = {}) => {
    return DataService.patch(API_ROUTES.orders.dispatch(id), payload)
  },
}
