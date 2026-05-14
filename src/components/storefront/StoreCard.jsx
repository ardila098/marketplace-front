import { Button, Card, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { buildRoute, ROUTES } from '../../constants/routes'
import { Cover } from '../../pages/public/style/styleStore'
import { UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { VERTICALS } from '../../constants/verticals'



const StoreCard = ({ store }) => (
  <Card bordered={false} style={{ borderRadius: 22, boxShadow: '0 20px 60px rgba(0,0,0,.06)' }}>
    <Cover $image={`${UPLOAD_ROUTES.stores.banners}${store?.banner}`} />
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{store.name}</Typography.Title>
        <Tag>{Object.values(VERTICALS).find((type) => type.value === store?.vertical)?.label}</Tag>
      </Space>
      <Typography.Paragraph type="secondary" style={{ minHeight: 44 }}>{store.description}</Typography.Paragraph>
      <Link to={buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug: store.slug })}>
        <Button type="primary" block>Ver tienda</Button>
      </Link>
    </Space>
  </Card>
)

export default StoreCard
