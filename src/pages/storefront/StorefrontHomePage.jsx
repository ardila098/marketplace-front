import { Space, Spin, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StorefrontHero from '../../components/storefront/StorefrontHero'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { PageShell } from '../../styles/layoutStyles'
import useStoreProducts from './hooks/useStoreProducts'

const StorefrontHomePage = () => {
  const { storeSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const { products, loading } = useStoreProducts(storeSlug)

  if (!store) return null

  return (
    <>
      <StorefrontHero store={store} />
      <PageShell>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <div>
            <Typography.Text type="secondary">Catálogo</Typography.Text>
            <Typography.Title level={2} style={{ letterSpacing: '-.05em' }}>Productos destacados</Typography.Title>
          </div>
          {loading
            ? <Spin />
            : <StorefrontProductGrid products={products} storeSlug={store.slug} />}
        </Space>
      </PageShell>
    </>
  )
}

export default StorefrontHomePage
