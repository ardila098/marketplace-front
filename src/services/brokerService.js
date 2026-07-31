import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const brokerService = {
  publicList: async params => {
    const response = await DataService.get(API_ROUTES.brokers.public, params)
    return normalizeListResponse(response)
  },

  publicDetail: async slug => {
    const response = await DataService.get(API_ROUTES.brokers.publicBySlug(slug))
    return normalizeItemResponse(response)
  },

  adminList: async params => {
    const response = await DataService.get(API_ROUTES.brokers.admin, params)
    return normalizeListResponse(response)
  },

  getMyProfile: async () => {
    const response = await DataService.get(API_ROUTES.brokers.me)
    return normalizeItemResponse(response)
  },

  updateMyProfile: async payload => {
    const response = await DataService.patch(API_ROUTES.brokers.me, payload)
    return normalizeItemResponse(response, 'Perfil actualizado correctamente')
  },
}
