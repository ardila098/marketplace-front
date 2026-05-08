import { Col, Row, Space, Typography } from 'antd'
import StoreCard from '../../components/storefront/StoreCard'
import { mockStores } from '../../data/mockData'
import { PageShell } from '../../styles/layoutStyles'

const StoresPage = () => (
  <PageShell>
    <Space direction="vertical" size={26} style={{ width: '100%' }}>
      <div>
        <Typography.Text type="secondary">Tiendas oficiales</Typography.Text>
        <Typography.Title style={{ letterSpacing: '-.05em', marginTop: 8 }}>Explora marcas y verticales</Typography.Title>
        <Typography.Paragraph type="secondary" style={{ maxWidth: 680 }}>
          Cada marca puede tener su propio espacio público dentro del marketplace. Más adelante esta misma estructura permite conectar dominios personalizados.
        </Typography.Paragraph>
      </div>
      <Row gutter={[24, 24]}>
        {mockStores.map(store => (
          <Col xs={24} md={12} key={store._id}>
            <StoreCard store={store} />
          </Col>
        ))}
      </Row>
    </Space>
  </PageShell>
)

export default StoresPage
