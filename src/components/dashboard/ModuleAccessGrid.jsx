import { Card, Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { appMenuByArea } from '../../constants/menu'
import { useAuth } from '../../hooks/useAuth'
import { filterMenuByRole } from '../../utils/permissions'

const ModuleAccessGrid = ({ area }) => {
  const { role } = useAuth()
  const modules = filterMenuByRole(appMenuByArea[area] || [], role)

  return (
    <Row gutter={[18, 18]}>
      {modules.map(module => {
        const Icon = module.icon
        return (
          <Col xs={24} md={12} xl={8} key={module.key}>
            <Link to={module.path}>
              <Card hoverable bordered={false} style={{ borderRadius: 20 }}>
                <Space direction="vertical" size={12}>
                  {Icon && <Icon size={24} />}
                  <Typography.Title level={5} style={{ margin: 0 }}>{module.label}</Typography.Title>
                  <Typography.Text type="secondary">Acceso habilitado según el rol actual.</Typography.Text>
                </Space>
              </Card>
            </Link>
          </Col>
        )
      })}
    </Row>
  )
}

export default ModuleAccessGrid
