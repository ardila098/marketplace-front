import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const storeService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.stores.base, params)
    return normalizeListResponse(response)
  },

  getBySlug: async slug => {
    const response = await DataService.get(API_ROUTES.stores.bySlug(slug))
    return normalizeItemResponse(response)
  },

  getMine: async () => {
    const response = await DataService.get(API_ROUTES.stores.mine)
    return normalizeItemResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.stores.base, payload)
    return normalizeItemResponse(response, 'Tienda creada correctamente')
  },

  updateMine: async payload => {
    const response = await DataService.put(API_ROUTES.stores.mine, payload)
    return normalizeItemResponse(response, 'Tienda actualizada correctamente')
  },

  updateTheme: async payload => {
    const response = await DataService.put(API_ROUTES.stores.myTheme, payload)
    return normalizeItemResponse(response, 'Diseño de tienda actualizado correctamente')
  },

  approve: async id => {
    const response = await DataService.patch(API_ROUTES.stores.approve(id))
    return normalizeItemResponse(response, 'Tienda aprobada correctamente')
  },

  reject: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.stores.reject(id), payload)
    return normalizeItemResponse(response, 'Tienda rechazada correctamente')
  },
}
