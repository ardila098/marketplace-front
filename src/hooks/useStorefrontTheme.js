import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { buildStoreTheme } from '../styles/themePresets'

export const useStorefrontTheme = () => {
  const store = useSelector(state => state.storefront.currentStore)
  return useMemo(() => buildStoreTheme(store), [store])
}
