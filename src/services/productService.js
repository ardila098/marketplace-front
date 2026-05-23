import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const productService = {
  list: async params => {
    const response = await DataService.get(API_ROUTES.products.base, params)
    return normalizeListResponse(response)
  },

  getById: async id => {
    const response = await DataService.get(API_ROUTES.products.byId(id))
    return normalizeItemResponse(response)
  },

  getBySlug: async slug => {
    const response = await DataService.get(API_ROUTES.products.bySlug(slug))
    return normalizeItemResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.products.base, payload)
    return normalizeItemResponse(response, 'Producto creado correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.products.byId(id), payload)
    return normalizeItemResponse(response, 'Producto actualizado correctamente')
  },

  remove: async id => {
    const response = await DataService.delete(API_ROUTES.products.byId(id))
    return normalizeItemResponse(response, 'Producto eliminado correctamente')
  },

  addVariant: async (productId, payload) => {
    const response = await DataService.post(
      API_ROUTES.products.addVariant(productId),
      payload
    )

    return normalizeItemResponse(response, 'Variante creada correctamente')
  },

  addPiece: async (productId, payload) => {
    const response = await DataService.post(
      API_ROUTES.products.addPiece(productId),
      payload
    )

    return normalizeItemResponse(response, 'Pieza creada correctamente')
  },

  addInventoryItem: async (productId, payload) => {
    const response = await DataService.post(
      API_ROUTES.products.addInventoryItem(productId),
      payload
    )

    return normalizeItemResponse(response, 'Opción creada correctamente')
  },


  addReference: async (productId, payload) => {
    const response = await DataService.post(
      API_ROUTES.products.addReference(productId),
      payload
    )

    return normalizeItemResponse(response, 'Referencia creada correctamente')
  },

  getMyStoreProducts: async params => {
    const response = await DataService.get(API_ROUTES.products.myStoreProducts, params)
    return normalizeListResponse(response)
  },

  getSellerProductByid: async id => {
    const response = await DataService.get(API_ROUTES.products.sellerById(id))
    return normalizeItemResponse(response)
  },


  getSellerProductDetail: async id => {
    const response = await DataService.get(
      API_ROUTES.products.sellerDetail(id)
    )

    return normalizeItemResponse(response)
  },

}



