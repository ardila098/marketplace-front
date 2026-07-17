import { ConfigProvider, Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { env } from '../config/env'
import { ROUTES } from '../constants/routes'
import { loadStorefront } from '../store/slices/storefrontSlice'
import { createAntdTheme } from '../styles/antdTheme'
import { buildStoreTheme } from '../styles/themePresets'

const StorefrontRoute = () => {
  const { storeSlug } = useParams()
  const dispatch = useDispatch()
  const { currentStore, error, loading } = useSelector(state => state.storefront)
  const theme = buildStoreTheme(currentStore)
  const hostname = window.location.hostname.toLowerCase()
  const canResolveByHost = !storeSlug && !env.platformHostnames.includes(hostname)

  useEffect(() => {
    if (storeSlug) {
      dispatch(loadStorefront(storeSlug))
      return
    }

    if (canResolveByHost && !error) {
      dispatch(loadStorefront({ host: hostname }))
    }
  }, [canResolveByHost, dispatch, error, hostname, storeSlug])

  if (loading && !currentStore) return <Spin fullscreen />

  if (canResolveByHost && error && !currentStore) {
    return <Navigate to={ROUTES.MARKETPLACE} replace />
  }

  if (!storeSlug && !canResolveByHost && !currentStore) {
    return <Navigate to={ROUTES.MARKETPLACE} replace />
  }

  return (
    <ConfigProvider theme={createAntdTheme(theme)}>
      <Outlet />
    </ConfigProvider>
  )
}

export default StorefrontRoute
