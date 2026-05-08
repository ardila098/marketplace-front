import { ConfigProvider, Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { loadStorefront } from '../store/slices/storefrontSlice'
import { createAntdTheme } from '../styles/antdTheme'
import { buildStoreTheme } from '../styles/themePresets'

const StorefrontRoute = () => {
  const { storeSlug } = useParams()
  const dispatch = useDispatch()
  const { currentStore, loading } = useSelector(state => state.storefront)
  const theme = buildStoreTheme(currentStore)

  useEffect(() => {
    if (storeSlug) dispatch(loadStorefront(storeSlug))
  }, [dispatch, storeSlug])

  if (loading && !currentStore) return <Spin fullscreen />

  return (
    <ConfigProvider theme={createAntdTheme(theme)}>
      <Outlet />
    </ConfigProvider>
  )
}

export default StorefrontRoute
