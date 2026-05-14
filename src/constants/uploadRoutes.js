import { env } from '../config/env'

const buildUploadRoute = path => {
    const baseUrl = env.publicAssetsUrl || env.apiBaseUrl
    return `${baseUrl}${path}`
}

export const UPLOAD_ROUTES = {
    stores: {
        logos: buildUploadRoute('/uploads/stores/logos/'),
        banners: buildUploadRoute('/uploads/stores/banners/'),
    },

    verticals: {
        icons: buildUploadRoute('/uploads/verticals/icons/'),
        banners: buildUploadRoute('/uploads/verticals/banners/'),
    },

    categories: {
        icons: buildUploadRoute('/uploads/categories/icons/'),
        banners: buildUploadRoute('/uploads/categories/banners/'),
    },

    products: {
        images: buildUploadRoute('/uploads/products/images/'),
        variants: buildUploadRoute('/uploads/products/variants/'),
    },

    users: {
        avatars: buildUploadRoute('/uploads/users/avatars/'),
    },
}

export const getUploadUrl = (uploadRoute, fileName) => {
    if (!fileName) return ''

    return `${uploadRoute}/${fileName}`
}