import { Button, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CoverHero from '../common/CoverHero'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const StorefrontHero = ({ store }) => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const activeStoreSlug = storeSlug || store?.slug
  const productsPath = resolutionMode === 'host'
    ? '/products'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: activeStoreSlug })
      : '/products'
  const outletPath = resolutionMode === 'host'
    ? '/outlet'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_OUTLET, { storeSlug: activeStoreSlug })
      : '/outlet'
  const banner = store?.banner?.startsWith('http')
    ? store.banner
    : getUploadUrl(UPLOAD_ROUTES.stores.banners, store?.banner)

  return (
    <CoverHero image={banner}>
      <Space direction="vertical" size={20}>
        <Typography.Text>{translate('storefront.officialStore')}</Typography.Text>

        <Typography.Title style={{ fontSize: 38, lineHeight: 1.08, margin: 0, letterSpacing: 0 }}>
          {store?.name}
        </Typography.Title>

        {store?.description && (
          <Typography.Paragraph style={{ fontSize: 16, maxWidth: 560, margin: 0 }}>
            {store.description}
          </Typography.Paragraph>
        )}

        <Space wrap>
          <Link to={productsPath}>
            <Button type="primary" size="large">{translate('storefront.shopNow')}</Button>
          </Link>
          <Link to={outletPath}>
            <Button size="large">{translate('storefront.viewOutlet')}</Button>
          </Link>
        </Space>
      </Space>
    </CoverHero>
  )
}

export default StorefrontHero
