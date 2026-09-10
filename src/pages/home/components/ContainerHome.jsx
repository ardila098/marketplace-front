import { Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import NewsletterSignup from '../../../components/newsletter/NewsletterSignup'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { useSeoMeta } from '../../../hooks/useSeoMeta'
import { selectPlatformSettings } from '../../../store/slices/platformSlice'
import { PageShell } from '../../../styles/layoutStyles'
import MarketplaceShowcase from './MarketplaceShowcase'
import NewProductsSection from './NewProductsSection'
import VerticalShowcase from '../../../components/marketplace/VerticalShowcase/VerticalShowcase'
import VerticalsSlider from '../../../components/common/verticals/components/verticalsSlider/VerticaslSlider'

const ContainerHome = () => {
  const { translate } = useDictionaryTranslation()
  const platformSettings = useSelector(selectPlatformSettings)
  const verticalsSubtitle =
    platformSettings.hero?.verticalsSubtitle || translate('home.verticalsSubtitle')
  const verticalsLayout = platformSettings.hero?.verticalsLayout || 'showcase'
  const verticalsEnabled = platformSettings.hero?.verticalsEnabled !== false
  const verticalsTitle =
    platformSettings.hero?.verticalsTitle || translate('home.verticalsTitle')
  const verticalsConfig = {
    imageSide: platformSettings.hero?.verticalsImageSide || 'right',
    backgroundType: platformSettings.hero?.verticalsBackgroundType || 'color',
    backgroundColor: platformSettings.hero?.verticalsBackgroundColor || '#f7f4ef',
    backgroundImage: getUploadUrl(
      UPLOAD_ROUTES.platform.banners,
      platformSettings.hero?.verticalsBackgroundImage
    ),
    backgroundPosition: platformSettings.hero?.verticalsBackgroundPosition || 'center',
    overlayEnabled: platformSettings.hero?.verticalsOverlayEnabled === true,
    overlayOpacity: Number(platformSettings.hero?.verticalsOverlayOpacity) || 0,
    frameStyle: platformSettings.hero?.verticalsFrameStyle || 'solid',
    imageHeight: Number(platformSettings.hero?.verticalsImageHeight) || 420,
  }
  const seo = platformSettings.seo || {}
  const seoDescription =
    seo.description ||
    platformSettings.hero?.subtitle ||
    platformSettings.footer?.description
  const seoImage = seo.image
    ? getUploadUrl(UPLOAD_ROUTES.platform.banners, seo.image)
    : getUploadUrl(UPLOAD_ROUTES.platform.banners, platformSettings.hero?.backgroundImage) ||
      getUploadUrl(UPLOAD_ROUTES.platform.logos, platformSettings.logo)

  useSeoMeta({
    title: seo.title || platformSettings.name,
    description: seoDescription,
    keywords: seo.keywords,
    image: seoImage,
    siteName: platformSettings.name,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: platformSettings.name,
      description: seoDescription,
      url: typeof window !== 'undefined' ? window.location.origin : '',
    },
  })

  return (
    <>
      <MarketplaceShowcase />

      {verticalsEnabled &&
        (verticalsLayout === 'showcase' ? (
          <VerticalShowcase
            config={verticalsConfig}
            title={verticalsTitle}
            subtitle={verticalsSubtitle}
            autoplaySeconds={
              Number(platformSettings.hero?.verticalsAutoplaySeconds) || 6
            }
          />
        ) : (
          <section style={{ maxWidth: 1180, margin: '0 auto', paddingTop: 36 }}>
            <Typography.Paragraph style={{ margin: '0 0 6px', color: '#6b7280' }}>
              {verticalsSubtitle}
            </Typography.Paragraph>
            <VerticalsSlider title={verticalsTitle} />
          </section>
        ))}

      <PageShell>
        <Space direction="vertical" size={36} style={{ width: '100%' }}>
          <NewProductsSection />

          <NewsletterSignup source="marketplace" />
        </Space>
      </PageShell>
    </>
  )
}

export default ContainerHome
