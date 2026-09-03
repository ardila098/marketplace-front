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
  platform: {
    logos: 'platform/logos',
    banners: 'platform/banners',
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
  experiences: {
    images: 'experiences/images',
  },
  landings: {
    logos: 'landings/logos',
    images: 'landings/images',
    videos: 'landings/videos',
  },
  brokers: {
    profileImages: 'brokers/profile-images',
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
  platform: {
    logos: buildUploadRoute('/uploads/platform/logos'),
    banners: buildUploadRoute('/uploads/platform/banners'),
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
  experiences: {
    images: buildUploadRoute('/uploads/experiences/images'),
  },
  landings: {
    logos: buildUploadRoute('/uploads/landings/logos'),
    images: buildUploadRoute('/uploads/landings/images'),
    videos: buildUploadRoute('/uploads/landings/videos'),
  },
  brokers: {
    profileImages: buildUploadRoute('/uploads/brokers/profile-images'),
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
