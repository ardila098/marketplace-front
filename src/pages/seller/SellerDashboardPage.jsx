import { Col, Row, Space, Typography } from 'antd'
import MetricCard from '../../components/common/MetricCard'
import ModuleAccessGrid from '../../components/dashboard/ModuleAccessGrid'

const SellerDashboardPage = () => (
  <Space direction="vertical" size={24} style={{ width: '100%' }}>
    <Row gutter={[18, 18]}>
      <Col xs={24} md={8}><MetricCard title="Ventas del mes" value={1280000} prefix="$" /></Col>
      <Col xs={24} md={8}><MetricCard title="Órdenes" value={24} /></Col>
      <Col xs={24} md={8}><MetricCard title="Productos activos" value={12} /></Col>
    </Row>
    <div>
      <Typography.Title level={3}>Módulos disponibles</Typography.Title>
      <ModuleAccessGrid area="seller" />
    </div>
  </Space>
)

export default SellerDashboardPage
