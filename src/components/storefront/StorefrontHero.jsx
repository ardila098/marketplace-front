import { Button, Col, Row, Space, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { buildRoute, ROUTES } from '../../constants/routes'

const Wrapper = styled.section`
  padding: 72px max(20px, calc((100vw - 1180px) / 2));
  background: ${({ theme }) => theme.backgroundColor || '#fafafa'};
`

const HeroImage = styled.div`
  min-height: 380px;
  border-radius: ${({ theme }) => `${theme.borderRadius || 18}px`};
  background: linear-gradient(135deg, rgba(0,0,0,.12), rgba(0,0,0,.42)), url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  box-shadow: 0 24px 80px rgba(0,0,0,.08);
`

const StorefrontHero = ({ store }) => {
  const { storeSlug } = useParams()

  return (
    <Wrapper>
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} lg={11}>
          <Space direction="vertical" size={22}>
            <Typography.Text type="secondary">Tienda oficial</Typography.Text>
            <Typography.Title style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-.06em', margin: 0 }}>
              {store.name}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18, color: '#555', maxWidth: 520 }}>
              {store.description}
            </Typography.Paragraph>
            <Space>
              <Link to={buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug })}>
                <Button type="primary" size="large">Comprar ahora</Button>
              </Link>
              <Link to={ROUTES.MARKETPLACE}>
                <Button size="large">Ver marketplace</Button>
              </Link>
            </Space>
          </Space>
        </Col>
        <Col xs={24} lg={13}>
          <HeroImage $image={store.banner} />
        </Col>
      </Row>
    </Wrapper>
  )
}

export default StorefrontHero
