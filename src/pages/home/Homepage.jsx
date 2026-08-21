import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { env } from '../../config/env'
import { landingPageService } from '../../services/landingPageService'
import { loadStorefront } from '../../store/slices/storefrontSlice'
import LandingPublicPage from '../landings/LandingPublicPage'
import StorefrontHomePage from '../storefront/StorefrontHomePage'
import ContainerHome from './components/ContainerHome'

const Homepage = () => {
  const dispatch = useDispatch()
  const hostname = window.location.hostname.toLowerCase()
  const canResolveByHost = !env.platformHostnames.includes(hostname)
  const { currentStore, error, loading, resolutionMode } = useSelector(state => state.storefront)
  const [hostLanding, setHostLanding] = useState(null)
  const [landingLoading, setLandingLoading] = useState(false)
  const [landingChecked, setLandingChecked] = useState(false)

  useEffect(() => {
    if (canResolveByHost && !error && resolutionMode !== 'host') {
      dispatch(loadStorefront({ host: hostname }))
    }
  }, [canResolveByHost, dispatch, error, hostname, resolutionMode])

  useEffect(() => {
    setHostLanding(null)
    setLandingChecked(false)
    setLandingLoading(false)
  }, [hostname])

  useEffect(() => {
    if (!canResolveByHost || currentStore || loading || !error || landingChecked) return

    let active = true
    setLandingLoading(true)

    landingPageService.resolvePublic({ host: hostname })
      .then(response => {
        if (active) setHostLanding(response.data)
      })
      .catch(() => {
        if (active) setHostLanding(null)
      })
      .finally(() => {
        if (!active) return
        setLandingChecked(true)
        setLandingLoading(false)
      })

    return () => {
      active = false
    }
  }, [canResolveByHost, currentStore, error, hostname, landingChecked, loading])

  if ((loading || landingLoading) && canResolveByHost && !currentStore && !hostLanding) {
    return <Spin fullscreen />
  }

  if (currentStore && resolutionMode === 'host') {
    return <StorefrontHomePage />
  }

  if (hostLanding) {
    return <LandingPublicPage host={hostname} initialLanding={hostLanding} />
  }

  return <ContainerHome />
}

export default Homepage
