import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'

export const checkoutService = {
  createOrder: payload => {
    return DataService.post(API_ROUTES.checkout.base, payload)
  },
}
