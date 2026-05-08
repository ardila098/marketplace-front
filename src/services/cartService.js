import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse } from '../utils/responseNormalizer'

export const cartService = {
  get: async () => {
    const response = await DataService.get(API_ROUTES.cart.base)
    return normalizeItemResponse(response)
  },

  addItem: async payload => {
    const response = await DataService.post(API_ROUTES.cart.addItem, payload)
    return normalizeItemResponse(response, 'Producto agregado al carrito')
  },

  updateItem: async (itemId, payload) => {
    const response = await DataService.put(API_ROUTES.cart.updateItem(itemId), payload)
    return normalizeItemResponse(response, 'Carrito actualizado correctamente')
  },

  removeItem: async itemId => {
    const response = await DataService.delete(API_ROUTES.cart.removeItem(itemId))
    return normalizeItemResponse(response, 'Producto eliminado del carrito')
  },

  checkout: async payload => {
    const response = await DataService.post(API_ROUTES.cart.checkout, payload)
    return normalizeItemResponse(response, 'Checkout creado correctamente')
  },
}
