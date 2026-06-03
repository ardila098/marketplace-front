import { client } from './clientService';
import { API_ROUTES } from '../constants/apiRoutes';
import { DataService } from './dataService';
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer';

export const catalogService = {
  // Local methods (modular catalog architecture)
  getVerticalsCatalog: async (limit = 8) => {
    const response = await client.get(API_ROUTES.catalog.catalogVerticals, {
      params: { limit },
    });
    return normalizeListResponse(response);
  },

  getProductsCatalog: async (params = {}) => {
    const response = await client.get(API_ROUTES.catalog.base, {
      params: { view: 'products', ...params },
    });
    return normalizeListResponse(response);
  },

  // Develop branch methods (legacy / general catalog access)
  getCatalog: async filters => {
    console.log(filters)
    const response = await DataService.get(API_ROUTES.catalogs.base, filters)
    return normalizeListResponse(response)
  },

  getById: async id => {
    const response = await DataService.get(API_ROUTES.orders.byId(id))
    return normalizeItemResponse(response)
  },
};

