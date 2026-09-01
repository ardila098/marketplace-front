import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const landingService = {
  create: async payload => {
    const response = await DataService.post(API_ROUTES.landingPages.base, payload)
    return normalizeItemResponse(response, 'Landing creada correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.landingPages.byId(id), payload)
    return normalizeItemResponse(response, 'Landing actualizada correctamente')
  },

  getById: async id => {
    const response = await DataService.post(API_ROUTES.landingPages.byId(id))
    return normalizeItemResponse(response, 'Dominio sincronizado correctamente')
  },
  list: async params => {
    const response = await DataService.get(API_ROUTES.landingPages.base, params)
    return normalizeListResponse(response)
  },
}
