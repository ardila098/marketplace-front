import { Button, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { selectPlatformSettings } from '../../../store/slices/platformSlice'

const Hero = styled.section`
  border-bottom: 1px solid #edf0f4;
  background: ${({ $backgroundImage }) => (
    $backgroundImage
      ? `linear-gradient(90deg, rgba(248,250,252,.96), rgba(248,250,252,.78)), url(${$backgroundImage}) center/cover`
      : '#f8fafc'
  )};
  padding: 76px max(20px, calc((100vw - 1180px) / 2)) 64px;

  @media (max-width: 768px) {
    padding-top: 56px;
    padding-bottom: 48px;
  }
`

const HeroContent = styled.div`
  max-width: 760px;
`

const HeaderHome = () => {
  const { translate } = useDictionaryTranslation()
  const platformSettings = useSelector(selectPlatformSettings)
  const hero = platformSettings.hero || {}
  const backgroundImage = getUploadUrl(
    UPLOAD_ROUTES.platform.banners,
    hero.backgroundImage
  )

  return (
    <Hero $backgroundImage={backgroundImage}>
      <HeroContent>
        <Space direction="vertical" size={20}>
          <Typography.Text type="secondary">
            {hero.eyebrow || translate('home.eyebrow')}
          </Typography.Text>
          <Typography.Title style={{ fontSize: 42, lineHeight: 1.08, letterSpacing: 0, margin: 0 }}>
            {hero.title || translate('home.title')}
          </Typography.Title>
          <Typography.Paragraph style={{ fontSize: 16, color: '#555', maxWidth: 650 }}>
            {hero.subtitle || translate('home.subtitle')}
          </Typography.Paragraph>
          <Space wrap>
            <Link to={ROUTES.MARKETPLACE}>
              <Button type="primary" size="large">
                {hero.primaryCtaLabel || translate('home.ctaProducts')}
              </Button>
            </Link>
            <Link to={ROUTES.VERTICALS}>
              <Button size="large">
                {hero.secondaryCtaLabel || translate('home.ctaVerticals')}
              </Button>
            </Link>
          </Space>
        </Space>
      </HeroContent>
    </Hero>
  )
}

export default HeaderHome
