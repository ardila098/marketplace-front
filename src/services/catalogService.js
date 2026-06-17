import { client } from './clientService'
import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const catalogService = {
  getVerticalsCatalog: async (limit = 8) => {
    const response = await client.get(API_ROUTES.catalogs.catalogVerticals, {
      params: { limit },
    })
    return normalizeListResponse(response)
  },

  getProductsCatalog: async (params = {}) => {
    const response = await client.get(API_ROUTES.catalogs.base, {
      params: { view: 'products', ...params },
    })
    return normalizeListResponse(response)
  },

  getCatalog: async filters => {
    const response = await DataService.get(API_ROUTES.catalogs.base, filters)
    return normalizeListResponse(response)
  },

  getCatalogItem: async id => {
    const response = await DataService.get(API_ROUTES.catalogs.byId(id))
    return normalizeItemResponse(response)
  },
}
