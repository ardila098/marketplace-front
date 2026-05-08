import { Col, Row, Space, Typography } from 'antd'
import MetricCard from '../../components/common/MetricCard'
import ModuleAccessGrid from '../../components/dashboard/ModuleAccessGrid'

const AdminDashboardPage = () => (
  <Space direction="vertical" size={24} style={{ width: '100%' }}>
    <Row gutter={[18, 18]}>
      <Col xs={24} md={6}><MetricCard title="Ventas globales" value={5400000} prefix="$" /></Col>
      <Col xs={24} md={6}><MetricCard title="Tiendas" value={18} /></Col>
      <Col xs={24} md={6}><MetricCard title="Productos pendientes" value={7} /></Col>
      <Col xs={24} md={6}><MetricCard title="Comisión" value={540000} prefix="$" /></Col>
    </Row>
    <div>
      <Typography.Title level={3}>Módulos disponibles</Typography.Title>
      <ModuleAccessGrid area="admin" />
    </div>
  </Space>
)

export default AdminDashboardPage
