import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const storeCategoryService = {
  listMine: async params => {
    const response = await DataService.get(API_ROUTES.storeCategories.mine, params)
    return normalizeListResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.storeCategories.base, payload)
    return normalizeItemResponse(response, 'Categoria creada correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.storeCategories.byId(id), payload)
    return normalizeItemResponse(response, 'Categoria actualizada correctamente')
  },

  remove: async id => {
    const response = await DataService.delete(API_ROUTES.storeCategories.byId(id))
    return normalizeItemResponse(response, 'Categoria desactivada correctamente')
  },
}
