import { env } from '../config/env'

const buildUploadRoute = path => {
  const baseUrl = String(env.publicAssetsUrl || env.apiBaseUrl || '').replace(/\/$/, '')
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
  agencyItems: {
    images: 'agency-items/images',
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
    legacy: buildUploadRoute('/uploads/categorys'),
  },
  agencyItems: {
    images: buildUploadRoute('/uploads/agency-items/images'),
  },
  users: {
    avatars: buildUploadRoute('/uploads/users/avatars'),
  },
})

export const getUploadUrl = (uploadRoute, fileName) => {
  if (!fileName) return ''

  const value = String(fileName).trim()

  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) {
    return value
  }

  if (value.startsWith('/uploads/')) {
    const baseUrl = String(env.publicAssetsUrl || env.apiBaseUrl || '').replace(/\/$/, '')
    return `${baseUrl}${value}`
  }

  return `${uploadRoute}/${value.replace(/^\/+/, '')}`
}
