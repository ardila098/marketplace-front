import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const newsletterService = {
  subscribe: async payload => {
    const response = await DataService.post(API_ROUTES.newsletter.base, payload)
    return normalizeItemResponse(response, 'Suscripcion registrada correctamente')
  },

  list: async params => {
    const response = await DataService.get(API_ROUTES.newsletter.base, params)
    return normalizeListResponse(response)
  },
}
