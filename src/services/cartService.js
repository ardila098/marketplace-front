import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'

export const cartService = {
  getCart: async () => {
    return DataService.get(API_ROUTES.cart.base)
  },

  addItem: async payload => {
    return DataService.post(API_ROUTES.cart.items, payload)
  },

  updateItemQuantity: async ({ itemId, quantity }) => {
    return DataService.patch(API_ROUTES.cart.itemById(itemId), {
      quantity,
    })
  },

  removeItem: async itemId => {
    return DataService.delete(API_ROUTES.cart.itemById(itemId))
  },

  clearCart: async () => {
    return DataService.delete(API_ROUTES.cart.base)
  },

  applyCoupon: async code => {
    return DataService.post(API_ROUTES.cart.coupon, {
      code,
    })
  },
}