import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import {
  normalizeAuthResponse,
  normalizeItemResponse,
} from '../utils/responseNormalizer'

export const authService = {
  login: async payload => {
    const response = await DataService.post(API_ROUTES.auth.login, payload)

    return normalizeAuthResponse(response, 'Inicio de sesion correcto')
  },

  register: async payload => {
    const response = await DataService.post(API_ROUTES.auth.register, payload)

    return normalizeAuthResponse(response, 'Registro creado correctamente')
  },

  me: async () => {
    const response = await DataService.get(API_ROUTES.auth.me)

    return {
      user: response?.data || null,
      message: response?.message || '',
    }
  },

  logout: async () => {
    localStorage.removeItem('accessToken')

    return normalizeItemResponse({ data: true }, 'Sesion cerrada correctamente')
  },
}
