import { Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import NewsletterSignup from '../../../components/newsletter/NewsletterSignup'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { useSeoMeta } from '../../../hooks/useSeoMeta'
import { selectPlatformSettings } from '../../../store/slices/platformSlice'
import { PageShell } from '../../../styles/layoutStyles'
import HeaderHome from './HeaderHome'
import NewProductsSection from './NewProductsSection'
import VerticalsSlider from '../../../components/common/verticals/components/verticalsSlider/VerticaslSlider'

const ContainerHome = () => {
  const { translate } = useDictionaryTranslation()
  const platformSettings = useSelector(selectPlatformSettings)
  const verticalsSubtitle =
    platformSettings.hero?.verticalsSubtitle || translate('home.verticalsSubtitle')
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
      <HeaderHome />

      <PageShell>
        <Space direction="vertical" size={36} style={{ width: '100%' }}>
          <section>
            <Typography.Paragraph style={{ margin: '0 0 6px', color: '#6b7280' }}>
              {verticalsSubtitle}
            </Typography.Paragraph>
            <VerticalsSlider />
          </section>

          <NewProductsSection />

          <NewsletterSignup source="marketplace" />
        </Space>
      </PageShell>
    </>
  )
}

export default ContainerHome
