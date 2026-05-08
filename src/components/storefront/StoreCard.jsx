import { Button, Card, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buildRoute, ROUTES } from '../../constants/routes'

const Cover = styled.div`
  height: 180px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0,0,0,.18), rgba(0,0,0,.55)), url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  margin-bottom: 18px;
`

const StoreCard = ({ store }) => (
  <Card bordered={false} style={{ borderRadius: 22, boxShadow: '0 20px 60px rgba(0,0,0,.06)' }}>
    <Cover $image={store.banner} />
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{store.name}</Typography.Title>
        <Tag>{store.vertical}</Tag>
      </Space>
      <Typography.Paragraph type="secondary" style={{ minHeight: 44 }}>{store.description}</Typography.Paragraph>
      <Link to={buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug: store.slug })}>
        <Button type="primary" block>Ver tienda</Button>
      </Link>
    </Space>
  </Card>
)

export default StoreCard
