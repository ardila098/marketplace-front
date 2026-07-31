import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const agencyItemService = {
  listPublicByStore: async (storeSlug, params) => {
    const response = await DataService.get(API_ROUTES.agencyItems.publicByStore(storeSlug), params)
    return normalizeListResponse(response)
  },

  getPublicBySlug: async (storeSlug, itemSlug) => {
    const response = await DataService.get(API_ROUTES.agencyItems.publicBySlug(storeSlug, itemSlug))
    return normalizeItemResponse(response)
  },

  listMyStore: async params => {
    const response = await DataService.get(API_ROUTES.agencyItems.myStore, params)
    return normalizeListResponse(response)
  },

  adminList: async params => {
    const response = await DataService.get(API_ROUTES.agencyItems.admin, params)
    return normalizeListResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.agencyItems.base, payload)
    return normalizeItemResponse(response, 'Item creado correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.agencyItems.byId(id), payload)
    return normalizeItemResponse(response, 'Item actualizado correctamente')
  },

  updateStatus: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.agencyItems.status(id), payload)
    return normalizeItemResponse(response, 'Estado actualizado correctamente')
  },
}

