import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const agencyLeadService = {
  create: async payload => {
    const response = await DataService.post(API_ROUTES.agencyLeads.base, payload)
    return normalizeItemResponse(response, 'Solicitud enviada correctamente')
  },

  list: async params => {
    const response = await DataService.get(API_ROUTES.agencyLeads.base, params)
    return normalizeListResponse(response)
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.agencyLeads.byId(id), payload)
    return normalizeItemResponse(response, 'Lead actualizado correctamente')
  },

  addNote: async (id, text) => {
    const response = await DataService.post(API_ROUTES.agencyLeads.notes(id), { text })
    return normalizeItemResponse(response, 'Nota agregada correctamente')
  },
}
