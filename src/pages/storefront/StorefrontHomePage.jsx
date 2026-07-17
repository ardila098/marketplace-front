import { Button, Col, Row, Space, Spin, Typography } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CategorySlider from '../../components/catalog/CategorySlider'
import NewsletterSignup from '../../components/newsletter/NewsletterSignup'
import StorefrontHero from '../../components/storefront/StorefrontHero'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import StorefrontTrustStrip from '../../components/storefront/StorefrontTrustStrip'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { PageShell } from '../../styles/layoutStyles'
import useStoreCategories from './hooks/useStoreCategories'
import useStoreProducts from './hooks/useStoreProducts'

const StorefrontHomePage = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const activeStoreSlug = storeSlug || store?.slug
  const productsPath = resolutionMode === 'host'
    ? '/products'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: activeStoreSlug })
      : '/products'
  const categoriesPath = resolutionMode === 'host'
    ? '/categories'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_CATEGORIES, { storeSlug: activeStoreSlug })
      : '/categories'
  const outletPath = resolutionMode === 'host'
    ? '/outlet'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_OUTLET, { storeSlug: activeStoreSlug })
      : '/outlet'
  const productFilters = useMemo(() => ({ limit: 6 }), [])
  const { products, loading } = useStoreProducts(activeStoreSlug, productFilters)
  const { categories } = useStoreCategories(activeStoreSlug)

  if (!store) return null

  return (
    <>
      <StorefrontHero store={store} />
      <StorefrontTrustStrip />

      <PageShell>
        <Space direction="vertical" size={28} style={{ width: '100%' }}>
          {!!categories.length && (
            <CategorySlider
              categories={categories.slice(0, 12)}
              title={translate('catalog.storeCategorySliderTitle')}
              // subtitle={translate('catalog.storeCategorySliderSubtitle')}
              getPath={category => `${productsPath}?category=${category._id}`}
            />
          )}

          <section>
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
              <Col>
                <Typography.Text type="secondary">{translate('storefront.catalog')}</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, letterSpacing: 0 }}>
                  {translate('catalog.featuredProducts')}
                </Typography.Title>
              </Col>
              <Col>
                <Space wrap>
                  <Link to={categoriesPath}>
                    <Button>{translate('categories')}</Button>
                  </Link>
                  <Link to={outletPath}>
                    <Button>{translate('outlet')}</Button>
                  </Link>
                  <Link to={productsPath}>
                    <Button type="primary">{translate('catalog.viewAll')}</Button>
                  </Link>
                </Space>
              </Col>
            </Row>

            <div style={{ marginTop: 18 }}>
              {loading
                ? <Spin />
                : <StorefrontProductGrid products={products} storeSlug={activeStoreSlug} />}
            </div>
          </section>

          <NewsletterSignup
            source="storefront"
            store={store}
            storeSlug={activeStoreSlug}
          />
        </Space>
      </PageShell>
    </>
  )
}

export default StorefrontHomePage
