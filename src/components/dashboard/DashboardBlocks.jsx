import { Button, Card, Col, Empty, List, Row, Space, Statistic, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { currency } from '../../utils/formatters'

const priorityColor = {
  high: 'red',
  normal: 'blue',
  low: 'default',
}

export const formatDashboardValue = (value, type) => {
  if (type === 'money') return currency(value)
  return Number(value || 0)
}

export const DashboardHeader = ({ title, description }) => (
  <div>
    <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
      {title}
    </Typography.Title>
    {description && (
      <Typography.Text type="secondary">
        {description}
      </Typography.Text>
    )}
  </div>
)

export const MetricGrid = ({ metrics = [], loading = false }) => (
  <Row gutter={[16, 16]}>
    {metrics.map(metric => (
      <Col xs={24} sm={12} lg={6} key={metric.key || metric.title}>
        <Card loading={loading} style={{ height: '100%' }}>
          <Statistic
            title={metric.title}
            value={formatDashboardValue(metric.value, metric.type)}
            suffix={metric.suffix}
          />
          {metric.description && (
            <Typography.Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
              {metric.description}
            </Typography.Text>
          )}
        </Card>
      </Col>
    ))}
  </Row>
)

export const ActionList = ({ actions = [], loading = false }) => (
  <Card title="Acciones recomendadas" loading={loading}>
    {actions.length ? (
      <List
        itemLayout="horizontal"
        dataSource={actions}
        renderItem={item => (
          <List.Item
            actions={[
              item.path ? (
                <Link key="open" to={item.path}>
                  <Button type="link">Abrir</Button>
                </Link>
              ) : null,
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={(
                <Space wrap>
                  <Typography.Text>{item.title}</Typography.Text>
                  {item.count ? <Tag>{item.count}</Tag> : null}
                  <Tag color={priorityColor[item.priority] || 'default'}>
                    {item.priority === 'high' ? 'Prioritario' : 'Operacion'}
                  </Tag>
                </Space>
              )}
              description={item.description}
            />
          </List.Item>
        )}
      />
    ) : (
      <Empty description="No hay tareas urgentes por ahora" />
    )}
  </Card>
)

export const DashboardSection = ({ title, children }) => (
  <Card title={title}>
    {children}
  </Card>
)
