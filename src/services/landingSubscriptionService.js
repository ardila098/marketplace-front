import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const landingSubscriptionService = {
  getMine: async () => {
    const response = await DataService.get(API_ROUTES.landingSubscriptions.mine)
    return normalizeItemResponse(response)
  },

  listAll: async params => {
    const response = await DataService.get(API_ROUTES.landingSubscriptions.base, params)
    return normalizeListResponse(response)
  },

  upsert: async payload => {
    const response = await DataService.post(API_ROUTES.landingSubscriptions.base, payload)
    return normalizeItemResponse(response, 'Plan de correo guardado correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.landingSubscriptions.byId(id), payload)
    return normalizeItemResponse(response, 'Plan de correo actualizado correctamente')
  },
}
