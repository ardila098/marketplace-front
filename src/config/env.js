export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  appName: import.meta.env.VITE_APP_NAME || '',
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE || 'es',
  defaultPrimaryColor: import.meta.env.VITE_DEFAULT_PRIMARY_COLOR || '#111111',
  enableStoreThemes: import.meta.env.VITE_ENABLE_STORE_THEMES !== 'false',
  publicAssetsUrl: import.meta.env.VITE_PUBLIC_ASSETS_URL || '',
}
