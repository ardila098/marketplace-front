import { Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { env } from '../../config/env'
import { loadStorefront } from '../../store/slices/storefrontSlice'
import StorefrontHomePage from '../storefront/StorefrontHomePage'
import ContainerHome from './components/ContainerHome'

const Homepage = () => {
  const dispatch = useDispatch()
  const hostname = window.location.hostname.toLowerCase()
  const canResolveByHost = !env.platformHostnames.includes(hostname)
  const { currentStore, error, loading, resolutionMode } = useSelector(state => state.storefront)

  useEffect(() => {
    if (canResolveByHost && !error && resolutionMode !== 'host') {
      dispatch(loadStorefront({ host: hostname }))
    }
  }, [canResolveByHost, dispatch, error, hostname, resolutionMode])

  if (loading && canResolveByHost && !currentStore) {
    return <Spin fullscreen />
  }

  if (currentStore && resolutionMode === 'host') {
    return <StorefrontHomePage />
  }

  return <ContainerHome />
}

export default Homepage
