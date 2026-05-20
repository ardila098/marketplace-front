import { Button, Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../../constants/routes'
import VerticalsCarousel from '../verticals/components/VerticalsCarousel'

const Hero = styled.section`
  padding: 84px max(20px, calc((100vw - 1180px) / 2));
  background: radial-gradient(circle at top right, #f1f1f1, #ffffff 42%, #f7f7f7);
`

const HomePage = () => (
  <>
    <Hero>
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} lg={13}>
          <Space direction="vertical" size={24}>
            <Typography.Text type="secondary">Marketplace multi-vertical</Typography.Text>
            <Typography.Title style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-.07em', margin: 0 }}>
              Una plataforma para múltiples marcas.
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18, color: '#555', maxWidth: 650 }}>
              Vende productos desde diferentes verticales, permite que cada tienda tenga su espacio propio y mantén un solo backend, un solo frontend y una sola base escalable.
            </Typography.Paragraph>
            <Space>
              <Link to={ROUTES.MARKETPLACE}><Button type="primary" size="large">Explorar productos</Button></Link>
              <Link to={ROUTES.STORES}><Button size="large">Ver tiendas</Button></Link>
            </Space>
          </Space>
        </Col>

      </Row>
    </Hero>


    <Col md={24} xs={24} lg={24}>
      <Row justify={'center'}>
        <Col md={20}>
          <VerticalsCarousel />
        </Col>
      </Row>
    </Col>

  </>
)

export default HomePage
