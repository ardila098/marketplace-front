import { Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import NewsletterSignup from '../../../components/newsletter/NewsletterSignup'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
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
