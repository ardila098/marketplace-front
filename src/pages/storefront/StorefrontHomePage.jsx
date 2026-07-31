import { Button, Col, Empty, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AgencyItemCard from '../../components/agency/AgencyItemCard'
import CategorySlider from '../../components/catalog/CategorySlider'
import CreditApplicationForm from '../../components/credit/CreditApplicationForm'
import NewsletterSignup from '../../components/newsletter/NewsletterSignup'
import StorefrontHero from '../../components/storefront/StorefrontHero'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import StorefrontTrustStrip from '../../components/storefront/StorefrontTrustStrip'
import { isAgencyBusiness } from '../../constants/businessTypes'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { agencyItemService } from '../../services/agencyItemService'
import { PageShell } from '../../styles/layoutStyles'
import useStoreCategories from './hooks/useStoreCategories'
import useStoreProducts from './hooks/useStoreProducts'

const StorefrontHomePage = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const activeStoreSlug = storeSlug || store?.slug
  const isAgencyStore = isAgencyBusiness(store?.businessType)
  const [agencyItems, setAgencyItems] = useState([])
  const [agencyLoading, setAgencyLoading] = useState(false)
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
  const { products, loading } = useStoreProducts(isAgencyStore ? null : activeStoreSlug, productFilters)
  const { categories } = useStoreCategories(isAgencyStore ? null : activeStoreSlug)

  useEffect(() => {
    if (!isAgencyStore || !activeStoreSlug) {
      setAgencyItems([])
      return
    }

    setAgencyLoading(true)

    agencyItemService.listPublicByStore(activeStoreSlug, { limit: 8 })
      .then(response => setAgencyItems(response.data || []))
      .catch(() => setAgencyItems([]))
      .finally(() => setAgencyLoading(false))
  }, [activeStoreSlug, isAgencyStore])

  if (!store) return null

  if (isAgencyStore) {
    return (
      <>
        <StorefrontHero store={store} />
        <StorefrontTrustStrip />

        <PageShell>
          <Space direction="vertical" size={28} style={{ width: '100%' }}>
            <section id="inventario">
              <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                  <Typography.Text type="secondary">Inventario</Typography.Text>
                  <Typography.Title level={3} style={{ margin: 0, letterSpacing: 0 }}>
                    Disponibles en {store.name}
                  </Typography.Title>
                </Col>
              </Row>

              <div style={{ marginTop: 18 }}>
                {agencyLoading ? (
                  <Spin />
                ) : agencyItems.length ? (
                  <Row gutter={[18, 18]}>
                    {agencyItems.map(item => (
                      <Col xs={24} sm={12} lg={8} key={item._id}>
                        <AgencyItemCard item={item} storeSlug={activeStoreSlug} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty description="Aun no hay inventario publicado" />
                )}
              </div>
            </section>

            {store.assignedBroker && (
              <CreditApplicationForm
                storeId={store._id}
                sourceType="store_credit"
                compact
                title="Necesitas asesoria de credito?"
                subtitle={`Un asesor puede contactarte para revisar alternativas relacionadas con ${store.name}.`}
              />
            )}

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

          {store.assignedBroker && (
            <CreditApplicationForm
              storeId={store._id}
              sourceType="store_credit"
              compact
              title="Necesitas asesoria de credito?"
              subtitle={`Un asesor puede contactarte para revisar alternativas relacionadas con ${store.name}.`}
            />
          )}

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
