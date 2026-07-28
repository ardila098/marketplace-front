import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import {
  normalizeItemResponse,
  normalizeListResponse,
} from '../utils/responseNormalizer'

export const userService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.users.base, params)
    return normalizeListResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.users.base, payload)
    return normalizeItemResponse(response, 'Usuario creado correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.users.byId(id), payload)
    return normalizeItemResponse(response, 'Usuario actualizado correctamente')
  },
}
