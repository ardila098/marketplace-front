import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from '../routes/router'
import { GlobalStyles } from '../styles/GlobalStyles'
import { createAntdTheme } from '../styles/antdTheme'
import { loadSession } from '../store/slices/authSlice'
import { fetchCart } from '../store/slices/cartSlice'
import {
  loadPlatformSettings,
  selectPlatformSettingsLoaded,
} from '../store/slices/platformSlice'

const App = () => {
  const dispatch = useDispatch()
  const appTheme = useSelector(state => state.theme.appTheme)
  const initialized = useSelector(state => state.auth.initialized)
  const platformSettingsLoaded = useSelector(selectPlatformSettingsLoaded)

  useEffect(() => {
    if (!initialized) {
      dispatch(loadSession())
    }
  }, [dispatch, initialized])

  useEffect(() => {
    if (!platformSettingsLoaded) {
      dispatch(loadPlatformSettings())
    }
  }, [dispatch, platformSettingsLoaded])

  useEffect(() => {
    if (initialized) {
      dispatch(fetchCart())
    }
  }, [dispatch, initialized])

  return (
    <ConfigProvider theme={createAntdTheme(appTheme)}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
