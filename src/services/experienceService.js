import { API_ROUTES } from '../constants/apiRoutes'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'
import { DataService } from './dataService'

export const experienceService = {
  listPublicByStore: async (storeSlug, params) => {
    const response = await DataService.get(API_ROUTES.experiences.publicByStore(storeSlug), params)
    return normalizeListResponse(response)
  },

  getPublicBySlug: async (storeSlug, experienceSlug) => {
    const response = await DataService.get(API_ROUTES.experiences.publicBySlug(storeSlug, experienceSlug))
    return normalizeItemResponse(response)
  },

  listMyStore: async params => {
    const response = await DataService.get(API_ROUTES.experiences.myStore, params)
    return normalizeListResponse(response)
  },

  adminList: async params => {
    const response = await DataService.get(API_ROUTES.experiences.admin, params)
    return normalizeListResponse(response)
  },

  create: async payload => {
    const response = await DataService.post(API_ROUTES.experiences.base, payload)
    return normalizeItemResponse(response, 'Experiencia creada correctamente')
  },

  update: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.experiences.byId(id), payload)
    return normalizeItemResponse(response, 'Experiencia actualizada correctamente')
  },

  updateStatus: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.experiences.status(id), payload)
    return normalizeItemResponse(response, 'Estado actualizado correctamente')
  },

  createBooking: async payload => {
    const response = await DataService.post(API_ROUTES.experiences.bookings, payload)
    return normalizeItemResponse(response, 'Solicitud enviada correctamente')
  },

  listBookings: async params => {
    const response = await DataService.get(API_ROUTES.experiences.bookings, params)
    return normalizeListResponse(response)
  },

  updateBooking: async (id, payload) => {
    const response = await DataService.patch(API_ROUTES.experiences.bookingById(id), payload)
    return normalizeItemResponse(response, 'Reserva actualizada correctamente')
  },

  addBookingNote: async (id, text) => {
    const response = await DataService.post(API_ROUTES.experiences.bookingNotes(id), { text })
    return normalizeItemResponse(response, 'Nota agregada correctamente')
  },
}
