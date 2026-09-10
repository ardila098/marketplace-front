import { Spin } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ProductShowcase from '../../../components/marketplace/ProductShowcase/ProductShowcase'
import { ROUTES } from '../../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { catalogService } from '../../../services/catalogService'
import {
  selectPlatformSettings,
  selectPlatformSettingsLoaded,
} from '../../../store/slices/platformSlice'
import HeaderHome from './HeaderHome'

const MarketplaceShowcase = () => {
  const platformSettings = useSelector(selectPlatformSettings)
  const platformSettingsLoaded = useSelector(selectPlatformSettingsLoaded)
  const hero = platformSettings.hero || {}
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const enabled = hero.showcaseEnabled === true
  const contentMode = hero.showcaseContentType || 'products'
  const isBrand = contentMode === 'brand'

  const loadFeatured = useCallback(async () => {
    if (!enabled || isBrand) {
      setProducts([])
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const response = await catalogService.getFeatured()
      setProducts(response.data || [])
    } catch (error) {
      console.error('No se pudieron cargar los productos del showcase', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [enabled, isBrand])

  useEffect(() => {
    loadFeatured()
  }, [loadFeatured])

  const showcaseConfig = useMemo(
    () => ({
      enabled,
      ctaLabel: hero.productCtaLabel || 'Ver producto',
      background: {
        type: hero.backgroundType || 'color',
        color: hero.backgroundColor || '#f6f1ea',
        image: getUploadUrl(
          UPLOAD_ROUTES.platform.banners,
          hero.backgroundImage
        ),
        position: hero.backgroundPosition || 'center',
        overlayEnabled: hero.overlayEnabled !== false,
        overlayOpacity: Number(hero.overlayOpacity) || 0.35,
      },
    }),
    [
      enabled,
      hero.backgroundImage,
      hero.backgroundColor,
      hero.backgroundPosition,
      hero.backgroundType,
      hero.overlayEnabled,
      hero.overlayOpacity,
      hero.productCtaLabel,
    ]
  )

  const slideImages = useMemo(() => {
    return (hero.slideImages || []).map(image =>
      getUploadUrl(UPLOAD_ROUTES.platform.banners, image)
    )
  }, [hero.slideImages])

  const brandCopy = useMemo(
    () => ({
      eyebrow: hero.eyebrow || 'Marketplace',
      title: platformSettings.name || 'Cooqys',
      subtitle: hero.subtitle || '',
      primaryLabel: hero.primaryCtaLabel || 'Explorar productos',
      secondaryLabel: hero.secondaryCtaLabel || 'Ver verticales',
      primaryPath: ROUTES.MARKETPLACE,
      secondaryPath: ROUTES.VERTICALS,
    }),
    [
      hero.eyebrow,
      hero.primaryCtaLabel,
      hero.secondaryCtaLabel,
      hero.subtitle,
      platformSettings.name,
    ]
  )

  const hasSlides = isBrand ? slideImages.length > 0 : products.length > 0

  if (!platformSettingsLoaded) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: hero.backgroundColor || '#f6f1ea',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (!enabled) {
    return <HeaderHome />
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: hero.backgroundColor || '#f6f1ea',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (!hasSlides) {
    return <HeaderHome />
  }

  return (
    <ProductShowcase
      products={products}
      images={slideImages}
      mode={contentMode}
      config={showcaseConfig}
      brandCopy={brandCopy}
      frameStyle={hero.slideFrameStyle || 'solid'}
      autoplaySeconds={Number(hero.showcaseAutoplaySeconds) || 6}
    />
  )
}

export default MarketplaceShowcase
