import { env } from '../config/env'

export const getAssetUrl = path => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${env.publicAssetsUrl}${path}`
}
