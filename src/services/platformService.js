import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse } from '../utils/responseNormalizer'

export const platformService = {
  getSettings: async () => {
    const response = await DataService.get(API_ROUTES.platform.settings)
    return normalizeItemResponse(response)
  },

  updateSettings: async payload => {
    const response = await DataService.patch(API_ROUTES.platform.settings, payload)

    return normalizeItemResponse(
      response,
      'Configuracion actualizada correctamente'
    )
  },
}
