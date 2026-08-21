import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const landingPageService = {
  listMy: async params => {
    const response = await DataService.get(API_ROUTES.landingPages.my, params)
    return normalizeListResponse(response)
  },

  adminList: async params => {
    const response = await DataService.get(API_ROUTES.landingPages.admin, params)
    return normalizeListResponse(response)
  },

  getPublicBySlug: async slug => {
    const response = await DataService.get(API_ROUTES.landingPages.publicBySlug(slug))
    return normalizeItemResponse(response)
  },

  resolvePublic: async params => {
    const response = await DataService.get(API_ROUTES.landingPages.publicResolve, params)
    return normalizeItemResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.landingPages.base, payload)
    return normalizeItemResponse(response, 'Landing creada correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.landingPages.byId(id), payload)
    return normalizeItemResponse(response, 'Landing actualizada correctamente')
  },

  updateStatus: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.landingPages.status(id), payload)
    return normalizeItemResponse(response, 'Estado actualizado correctamente')
  },

  createLead: async (slug, payload) => {
    const response = await DataService.post(API_ROUTES.landingPages.publicLead(slug), payload)
    return normalizeItemResponse(response, 'Solicitud enviada correctamente')
  },

  listLeads: async params => {
    const response = await DataService.get(API_ROUTES.landingPages.leads, params)
    return normalizeListResponse(response)
  },

  updateLead: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.landingPages.leadById(id), payload)
    return normalizeItemResponse(response, 'Solicitud actualizada correctamente')
  },

  addLeadNote: async (id, text) => {
    const response = await DataService.post(API_ROUTES.landingPages.leadNotes(id), { text })
    return normalizeItemResponse(response, 'Nota agregada correctamente')
  },
}
