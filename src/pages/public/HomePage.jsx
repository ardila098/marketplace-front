import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import StoreCard from '../../components/storefront/StoreCard'
import { ROUTES } from '../../constants/routes'
import { mockStores } from '../../data/mockData'
import { PageShell } from '../../styles/layoutStyles'

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
        <Col xs={24} lg={11}>
          <Card bordered={false} style={{ borderRadius: 28, boxShadow: '0 30px 100px rgba(0,0,0,.08)' }}>
            <Typography.Title level={4}>Módulos listos</Typography.Title>
            <Space direction="vertical">
              <Typography.Text>✓ Marketplace global</Typography.Text>
              <Typography.Text>✓ Storefront por tienda</Typography.Text>
              <Typography.Text>✓ Panel seller</Typography.Text>
              <Typography.Text>✓ Panel admin</Typography.Text>
              <Typography.Text>✓ Carrito tipo drawer</Typography.Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </Hero>
    <PageShell>
      <Typography.Title level={2} style={{ letterSpacing: '-.05em' }}>Tiendas destacadas</Typography.Title>
      <Row gutter={[24, 24]}>
        {mockStores.map(store => <Col xs={24} md={12} key={store._id}><StoreCard store={store} /></Col>)}
      </Row>
    </PageShell>
  </>
)

export default HomePage
