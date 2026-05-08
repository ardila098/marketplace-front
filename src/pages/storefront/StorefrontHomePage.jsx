import { Space, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StorefrontHero from '../../components/storefront/StorefrontHero'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { mockProducts, mockStores } from '../../data/mockData'
import { PageShell } from '../../styles/layoutStyles'

const StorefrontHomePage = () => {
  const { storeSlug } = useParams()
  const currentStore = useSelector(state => state.storefront.currentStore)
  const store = currentStore || mockStores.find(item => item.slug === storeSlug) || mockStores[0]
  const products = mockProducts.filter(product => product.store.slug === store.slug)

  return (
    <>
      <StorefrontHero store={store} />
      <PageShell>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <div>
            <Typography.Text type="secondary">Catálogo</Typography.Text>
            <Typography.Title level={2} style={{ letterSpacing: '-.05em' }}>Productos destacados</Typography.Title>
          </div>
          <StorefrontProductGrid products={products} storeSlug={store.slug} />
        </Space>
      </PageShell>
    </>
  )
}

export default StorefrontHomePage
