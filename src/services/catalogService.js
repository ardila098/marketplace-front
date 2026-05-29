import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const catalogService = {
  getCatalog: async filters => {
    console.log(filters)
    const response = await DataService.get(API_ROUTES.catalogs.base, filters)
    console.log
    return normalizeListResponse(response)
  },

  getById: async id => {
    const response = await DataService.get(API_ROUTES.orders.byId(id))
    return normalizeItemResponse(response)
  },
}
