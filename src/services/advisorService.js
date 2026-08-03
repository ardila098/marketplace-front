import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const advisorService = {
  adminList: async params => {
    const response = await DataService.get(API_ROUTES.advisors.admin, params)
    return normalizeListResponse(response)
  },

  adminUpdate: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.advisors.adminById(id), payload)
    return normalizeItemResponse(response, 'Asesor actualizado correctamente')
  },

  getSummary: async () => {
    const response = await DataService.get(API_ROUTES.advisors.summary)
    return normalizeItemResponse(response)
  },

  getStores: async () => {
    const response = await DataService.get(API_ROUTES.advisors.stores)
    return normalizeListResponse(response)
  },

  getPending: async () => {
    const response = await DataService.get(API_ROUTES.advisors.pending)
    return normalizeListResponse(response)
  },

  getPayouts: async params => {
    const response = await DataService.get(API_ROUTES.advisors.payouts, params)
    return normalizeListResponse(response)
  },

  createPayout: payload => {
    return DataService.post(API_ROUTES.advisors.payouts, payload)
  },

  markPayoutPaid: (id, payload = {}) => {
    return DataService.patch(API_ROUTES.advisors.payPayout(id), payload)
  },
}
