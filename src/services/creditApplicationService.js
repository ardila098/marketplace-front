import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const creditApplicationService = {
  create: async payload => {
    const response = await DataService.post(API_ROUTES.creditApplications.base, payload)
    return normalizeItemResponse(response, 'Solicitud enviada correctamente')
  },

  list: async params => {
    const response = await DataService.get(API_ROUTES.creditApplications.base, params)
    return normalizeListResponse(response)
  },

  updateStatus: async (id, status) => {
    const response = await DataService.patch(API_ROUTES.creditApplications.status(id), { status })
    return normalizeItemResponse(response, 'Estado actualizado correctamente')
  },

  addNote: async (id, text) => {
    const response = await DataService.post(API_ROUTES.creditApplications.notes(id), { text })
    return normalizeItemResponse(response, 'Nota agregada correctamente')
  },

  assignBroker: async (id, brokerId) => {
    const response = await DataService.patch(API_ROUTES.creditApplications.assignBroker(id), { brokerId })
    return normalizeItemResponse(response, 'Broker asignado correctamente')
  },
}
