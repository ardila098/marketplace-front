import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const verticalsServices = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.verticals.base, params)
    return normalizeListResponse(response)
  },

  getVertical: async id => {
    const response = await DataService.get(API_ROUTES.verticals.byId(id))
    return normalizeItemResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.verticals.base, payload)
    return normalizeItemResponse(response, 'Tienda creada correctamente')
  },

  updateVertical: async payload => {
    const response = await DataService.put(API_ROUTES.verticals.updateItem, payload)
    return normalizeItemResponse(response, 'Tienda actualizada correctamente')
  },
}
