import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeListResponse } from '../utils/responseNormalizer'

export const userService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.users.base, params)
    return normalizeListResponse(response)
  },
}
