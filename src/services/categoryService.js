import { API_ROUTES } from '../constants/apiRoutes'
import { DataService } from './dataService'
import { normalizeItemResponse, normalizeListResponse } from '../utils/responseNormalizer'

export const categoryService = {
    list: async params => {
        const response = await DataService.get(API_ROUTES.categories.base, params)
        return normalizeListResponse(response)
    },

    getById: async id => {
        const response = await DataService.get(API_ROUTES.categories.byId(id))
        return normalizeItemResponse(response)
    },

    create: async payload => {
        const response = await DataService.post(API_ROUTES.categories.base, payload)
        return normalizeItemResponse(response, 'Producto creado correctamente')
    },

    update: async (id, payload) => {
        const response = await DataService.put(API_ROUTES.categories.byId(id), payload)
        return normalizeItemResponse(response, 'Producto actualizado correctamente')
    },

    remove: async id => {
        const response = await DataService.delete(API_ROUTES.categorys.byId(id))
        return normalizeItemResponse(response, 'Producto eliminado correctamente')
    },


}
