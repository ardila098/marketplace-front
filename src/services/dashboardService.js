import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const dashboardService = {
  getSummary: async () => {
    const response = await DataService.get(API_ROUTES.dashboard.summary)
    return normalizeItemResponse(response)
  },
}
