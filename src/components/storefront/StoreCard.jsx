import { Button, Card, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const Cover = styled.div`
  height: 150px;
  border-radius: 8px;
  background: ${({ $image }) => $image
    ? `url(${$image}) center/cover`
    : 'linear-gradient(135deg, #f5f6f8, #e7ebf0)'};
  margin-bottom: 14px;
`

const StoreCard = ({ store, verticals = [] }) => {
  const { translate } = useDictionaryTranslation()
  const vertical = typeof store?.vertical === 'object'
    ? store.vertical
    : verticals.find(v => v._id === store?.vertical)

  return (
    <Card bordered style={{ borderRadius: 8, height: '100%' }} styles={{ body: { padding: 14 } }}>
      <Cover $image={getUploadUrl(UPLOAD_ROUTES.stores.banners, store?.banner)} />
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Typography.Title level={5} style={{ margin: 0 }}>{store.name}</Typography.Title>
          {vertical && <Tag>{vertical.name}</Tag>}
        </Space>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
          {store.description || translate('stores.list.fallbackDescription')}
        </Typography.Paragraph>
        <Link to={buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug: store.slug })}>
          <Button type="primary" block>{translate('viewStore')}</Button>
        </Link>
      </Space>
    </Card>
  )
}

export default StoreCard
