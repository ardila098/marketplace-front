import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const returnService = {
  create: async payload => {
    const response = await DataService.post(API_ROUTES.returns.base, payload)
    return normalizeItemResponse(response, 'Solicitud recibida correctamente')
  },

  list: async params => {
    const response = await DataService.get(API_ROUTES.returns.base, params)
    return normalizeListResponse(response)
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.returns.byId(id), payload)
    return normalizeItemResponse(response, 'Reclamo actualizado')
  },

  addNote: async (id, text) => {
    const response = await DataService.post(API_ROUTES.returns.notes(id), { text })
    return normalizeItemResponse(response, 'Nota agregada')
  },
}
