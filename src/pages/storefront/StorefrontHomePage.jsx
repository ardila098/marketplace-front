import { Col, Empty, Row, Space, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AgencyItemCard from '../../components/agency/AgencyItemCard'
import CreditApplicationForm from '../../components/credit/CreditApplicationForm'
import ExperienceCard from '../../components/experiences/ExperienceCard'
import NewsletterSignup from '../../components/newsletter/NewsletterSignup'
import StorefrontHero from '../../components/storefront/StorefrontHero'
import StorefrontTrustStrip from '../../components/storefront/StorefrontTrustStrip'
import StorefrontTemplateRenderer from '../../components/storefront/templates/StorefrontTemplateRenderer'
import { isAgencyBusiness, isExperienceBusiness } from '../../constants/businessTypes'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useSeoMeta } from '../../hooks/useSeoMeta'
import { agencyItemService } from '../../services/agencyItemService'
import { experienceService } from '../../services/experienceService'
import { PageShell } from '../../styles/layoutStyles'
import useStoreCategories from './hooks/useStoreCategories'
import useStoreProducts from './hooks/useStoreProducts'

const StorefrontHomePage = () => {
  const { storeSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const activeStoreSlug = storeSlug || store?.slug
  const isAgencyStore = isAgencyBusiness(store?.businessType)
  const isExperienceStore = isExperienceBusiness(store?.businessType)
  const [agencyItems, setAgencyItems] = useState([])
  const [agencyLoading, setAgencyLoading] = useState(false)
  const [experiences, setExperiences] = useState([])
  const [experiencesLoading, setExperiencesLoading] = useState(false)
  const productsPath =
    resolutionMode === 'host'
      ? '/products'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: activeStoreSlug })
        : '/products'
  const categoriesPath =
    resolutionMode === 'host'
      ? '/categories'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_CATEGORIES, { storeSlug: activeStoreSlug })
        : '/categories'
  const outletPath =
    resolutionMode === 'host'
      ? '/outlet'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_OUTLET, { storeSlug: activeStoreSlug })
        : '/outlet'
  const productFilters = useMemo(() => ({ limit: 6 }), [])
  const { products, loading } = useStoreProducts(
    isAgencyStore || isExperienceStore ? null : activeStoreSlug,
    productFilters
  )
  const { categories } = useStoreCategories(
    isAgencyStore || isExperienceStore ? null : activeStoreSlug
  )
  const storefront = store?.storefront || {}
  const storeDescription =
    storefront.seoDescription || store?.description || `${store?.name || 'Tienda'} en Cooqys`
  const storeImage = storefront.socialImage
    ? getUploadUrl(UPLOAD_ROUTES.stores.banners, storefront.socialImage)
    : getUploadUrl(UPLOAD_ROUTES.stores.banners, store?.banner) ||
      getUploadUrl(UPLOAD_ROUTES.stores.logos, store?.logo)
  const storeUrl =
    storefront.publicUrl ||
    (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '')

  useSeoMeta({
    title: storefront.seoTitle || store?.name,
    description: storeDescription,
    keywords: storefront.seoKeywords,
    image: storeImage,
    canonical: storeUrl,
    siteName: store?.name,
    verification: storefront.tracking?.searchConsoleVerification,
    jsonLd: store
      ? {
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: store.name,
          description: storeDescription,
          url: storeUrl,
          image: storeImage,
        }
      : null,
  })

  useEffect(() => {
    if (!isAgencyStore || !activeStoreSlug) {
      setAgencyItems([])
      return
    }

    setAgencyLoading(true)

    agencyItemService
      .listPublicByStore(activeStoreSlug, { limit: 8 })
      .then(response => setAgencyItems(response.data || []))
      .catch(() => setAgencyItems([]))
      .finally(() => setAgencyLoading(false))
  }, [activeStoreSlug, isAgencyStore])

  useEffect(() => {
    if (!isExperienceStore || !activeStoreSlug) {
      setExperiences([])
      return
    }

    setExperiencesLoading(true)

    experienceService
      .listPublicByStore(activeStoreSlug, { limit: 8 })
      .then(response => setExperiences(response.data || []))
      .catch(() => setExperiences([]))
      .finally(() => setExperiencesLoading(false))
  }, [activeStoreSlug, isExperienceStore])

  if (!store) return null

  if (isExperienceStore) {
    return (
      <>
        <StorefrontHero store={store} />
        <StorefrontTrustStrip />

        <PageShell>
          <Space direction="vertical" size={28} style={{ width: '100%' }}>
            <section id="experiencias">
              <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                  <Typography.Text type="secondary">Experiencias</Typography.Text>
                  <Typography.Title level={3} style={{ margin: 0, letterSpacing: 0 }}>
                    Disponibles en {store.name}
                  </Typography.Title>
                </Col>
              </Row>

              <div style={{ marginTop: 18 }}>
                {experiencesLoading ? (
                  <Spin />
                ) : experiences.length ? (
                  <Row gutter={[18, 18]}>
                    {experiences.map(experience => (
                      <Col xs={24} sm={12} lg={8} key={experience._id}>
                        <ExperienceCard experience={experience} storeSlug={activeStoreSlug} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty description="Aun no hay experiencias publicadas" />
                )}
              </div>
            </section>

            <NewsletterSignup source="storefront" store={store} storeSlug={activeStoreSlug} />
          </Space>
        </PageShell>
      </>
    )
  }

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

            <NewsletterSignup source="storefront" store={store} storeSlug={activeStoreSlug} />
          </Space>
        </PageShell>
      </>
    )
  }

  return (
    <StorefrontTemplateRenderer
      activeStoreSlug={activeStoreSlug}
      categories={categories}
      categoriesPath={categoriesPath}
      loading={loading}
      outletPath={outletPath}
      products={products}
      productsPath={productsPath}
      store={store}
    />
  )
}

export default StorefrontHomePage
