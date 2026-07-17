import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const couponService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.coupons.base, params)
    return normalizeListResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.coupons.base, payload)
    return normalizeItemResponse(response, 'Cupon creado correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.coupons.byId(id), payload)
    return normalizeItemResponse(response, 'Cupon actualizado correctamente')
  },

  remove: async id => {
    const response = await DataService.delete(API_ROUTES.coupons.byId(id))
    return normalizeItemResponse(response, 'Cupon desactivado correctamente')
  },
}
