import { Button, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const Hero = styled.section`
  border-bottom: 1px solid #edf0f4;
  background: #f8fafc;
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

  return (
    <Hero>
      <HeroContent>
        <Space direction="vertical" size={20}>
          <Typography.Text type="secondary">{translate('home.eyebrow')}</Typography.Text>
          <Typography.Title style={{ fontSize: 42, lineHeight: 1.08, letterSpacing: 0, margin: 0 }}>
            {translate('home.title')}
          </Typography.Title>
          <Typography.Paragraph style={{ fontSize: 16, color: '#555', maxWidth: 650 }}>
            {translate('home.subtitle')}
          </Typography.Paragraph>
          <Space wrap>
            <Link to={ROUTES.MARKETPLACE}>
              <Button type="primary" size="large">{translate('home.ctaProducts')}</Button>
            </Link>
            <Link to={ROUTES.VERTICALS}>
              <Button size="large">{translate('home.ctaVerticals')}</Button>
            </Link>
          </Space>
        </Space>
      </HeroContent>
    </Hero>
  )
}

export default HeaderHome
