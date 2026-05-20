import { env } from '../config/env'

const buildUploadRoute = path => {
  const baseUrl = env.publicAssetsUrl || env.apiBaseUrl
  return `${baseUrl}${path}`
}

export const UPLOAD_FOLDERS = Object.freeze({
  products: {
    images: 'products/images',
    variants: 'products/variants',
  },
  stores: {
    logos: 'stores/logos',
    banners: 'stores/banners',
  },
  verticals: {
    icons: 'verticals/icons',
    banners: 'verticals/banners',
  },
  categories: {
    icons: 'categories/icons',
    banners: 'categories/banners',
  },
  users: {
    avatars: 'users/avatars',
  },
})

export const UPLOAD_ROUTES = Object.freeze({
  products: {
    images: buildUploadRoute('/uploads/products/images'),
    variants: buildUploadRoute('/uploads/products/variants'),
  },
  stores: {
    logos: buildUploadRoute('/uploads/stores/logos'),
    banners: buildUploadRoute('/uploads/stores/banners'),
  },
  verticals: {
    icons: buildUploadRoute('/uploads/verticals/icons'),
    banners: buildUploadRoute('/uploads/verticals/banners'),
  },
  categories: {
    icons: buildUploadRoute('/uploads/categories/icons'),
    banners: buildUploadRoute('/uploads/categories/banners'),
  },
  users: {
    avatars: buildUploadRoute('/uploads/users/avatars'),
  },
})

export const getUploadUrl = (uploadRoute, fileName) => {
  if (!fileName) return ''

  return `${uploadRoute}/${fileName}`
}