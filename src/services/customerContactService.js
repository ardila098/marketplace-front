import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const customerContactService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.contacts.base, params)
    return normalizeListResponse(response)
  },
}
