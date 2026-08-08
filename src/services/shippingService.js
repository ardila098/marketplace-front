import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const shippingService = {
  quote: async payload => {
    const response = await DataService.post(API_ROUTES.shipping.quote, payload)
    return normalizeItemResponse(response)
  },

  listShipments: async params => {
    const response = await DataService.get(API_ROUTES.shipping.shipments, params)
    return normalizeListResponse(response)
  },

  listStoreCouriers: async params => {
    const response = await DataService.get(API_ROUTES.shipping.storeCouriers, params)
    return normalizeListResponse(response)
  },

  createStoreCourier: async payload => {
    const response = await DataService.post(API_ROUTES.shipping.storeCouriers, payload)
    return normalizeItemResponse(response, 'Mensajero creado correctamente')
  },

  updateStoreCourier: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.shipping.storeCourierById(id), payload)
    return normalizeItemResponse(response, 'Mensajero actualizado correctamente')
  },

  getCourierSummary: async () => {
    const response = await DataService.get(API_ROUTES.shipping.courierSummary)
    return normalizeItemResponse(response)
  },

  assignCourier: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.shipping.assignCourier(id), payload)
    return normalizeItemResponse(response, 'Mensajero asignado correctamente')
  },

  updateStatus: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.shipping.updateStatus(id), payload)
    return normalizeItemResponse(response, 'Estado actualizado')
  },

  markCourierPaid: async (id, payload = {}) => {
    const response = await DataService.patch(API_ROUTES.shipping.markCourierPaid(id), payload)
    return normalizeItemResponse(response, 'Pago registrado')
  },

  updateTracking: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.shipping.updateTracking(id), payload)
    return normalizeItemResponse(response, 'Guia actualizada')
  },
}
