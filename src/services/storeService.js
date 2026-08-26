import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const storeService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.stores.base, params)
    return normalizeListResponse(response)
  },

  adminList: async params => {
    const response = await DataService.get(API_ROUTES.stores.admin, params)
    return normalizeListResponse(response)
  },

  domainRequests: async params => {
    const response = await DataService.get(API_ROUTES.stores.domains, params)
    return normalizeListResponse(response)
  },

  getMyStore: async () => {
    const response = await DataService.get(API_ROUTES.stores.myStore)
    return normalizeItemResponse(response)
  },

  getBySlug: async slug => {
    const response = await DataService.get(API_ROUTES.stores.bySlug(slug))
    return normalizeItemResponse(response)
  },

  resolve: async params => {
    const response = await DataService.get(API_ROUTES.stores.resolve, params)
    return normalizeItemResponse(response)
  },

  getProducts: async (slug, params) => {
    const response = await DataService.get(API_ROUTES.stores.products(slug), params)
    return normalizeListResponse(response)
  },

  getCategories: async slug => {
    const response = await DataService.get(API_ROUTES.stores.categories(slug))
    return normalizeListResponse(response)
  },

  getProductBySlug: async (slug, productSlug) => {
    const response = await DataService.get(API_ROUTES.stores.productBySlug(slug, productSlug))
    return normalizeItemResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.stores.base, payload)
    return normalizeItemResponse(response, 'Tienda creada correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.stores.byId(id), payload)
    return normalizeItemResponse(response, 'Tienda actualizada correctamente')
  },

  updateStorefront: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.stores.storefront(id), payload)
    return normalizeItemResponse(response, 'Storefront actualizado correctamente')
  },

  updateDomainStatus: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.stores.domainStatus(id), payload)
    return normalizeItemResponse(response, 'Dominio actualizado correctamente')
  },

  syncDomain: async id => {
    const response = await DataService.post(API_ROUTES.stores.domainSync(id))
    return normalizeItemResponse(response, 'Dominio sincronizado correctamente')
  },

  approve: async id => {
    const response = await DataService.patch(API_ROUTES.stores.approve(id))
    return normalizeItemResponse(response, 'Tienda aprobada correctamente')
  },
}
