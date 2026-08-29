import { Empty, Spin } from 'antd'
import { Link } from 'react-router-dom'

import CategorySlider from '../../sliders/categorySlider/CategorySlider'
import CreditApplicationForm from '../../credit/CreditApplicationForm'
import NewsletterSignup from '../../newsletter/NewsletterSignup'
import StorefrontProductGrid from '../StorefrontProductGrid'
import StorefrontTrustStrip from '../StorefrontTrustStrip'
import {
  STOREFRONT_SECTION_DEFAULTS,
  STOREFRONT_TEMPLATES,
} from '../../../constants/storefrontTemplates'
import { UPLOAD_ROUTES, getUploadUrl } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import {
  HeroActions,
  HeroButton,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroImage,
  HeroImageFallback,
  HeroImageFrame,
  HeroLogo,
  HeroLogoBadge,
  HeroLogoText,
  HeroMedia,
  HeroTitle,
  LoadingBlock,
  MainStack,
  ProductsWrap,
  SectionActions,
  SectionCopy,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
  StorefrontCanvas,
  TemplateHero,
  TemplateSection,
} from './styles'

const DEFAULT_TEMPLATE = STOREFRONT_TEMPLATES.CLASSIC.value

const getTemplate = store => store?.storefront?.template || DEFAULT_TEMPLATE

const getSections = store => ({
  ...STOREFRONT_SECTION_DEFAULTS,
  ...(store?.storefront?.sections || {}),
})

const getStoreImage = store => {
  const banner = store?.banner?.startsWith('http')
    ? store.banner
    : getUploadUrl(UPLOAD_ROUTES.stores.banners, store?.banner)

  return banner || getUploadUrl(UPLOAD_ROUTES.stores.logos, store?.logo)
}

const getLogoUrl = store => getUploadUrl(UPLOAD_ROUTES.stores.logos, store?.logo)

const StorefrontTemplateRenderer = ({
  activeStoreSlug,
  categories = [],
  categoriesPath,
  loading = false,
  outletPath,
  products = [],
  productsPath,
  store,
}) => {
  const { translate } = useDictionaryTranslation()
  const template = getTemplate(store)
  const sections = getSections(store)
  const storeImage = getStoreImage(store)
  const logoUrl = getLogoUrl(store)
  const heroEyebrow = template === STOREFRONT_TEMPLATES.EDITORIAL_CLEAN.value
    ? 'Seleccion curada'
    : translate('storefront.officialStore')
  const heroTitle = store?.name || 'Tienda'
  const heroDescription = store?.description || 'Encuentra productos seleccionados para comprar rapido y seguro.'
  const hasProductsSection = sections.showFeaturedProducts

  return (
    <StorefrontCanvas $template={template}>
      <TemplateHero $template={template}>
        <HeroContent>
          <HeroEyebrow>{heroEyebrow}</HeroEyebrow>
          <HeroTitle $template={template}>{heroTitle}</HeroTitle>
          <HeroDescription>{heroDescription}</HeroDescription>

          <HeroActions>
            <Link to={productsPath}>
              <HeroButton type="primary" size="large">
                {translate('storefront.shopNow')}
              </HeroButton>
            </Link>
            <Link to={outletPath}>
              <HeroButton size="large">
                {translate('storefront.viewOutlet')}
              </HeroButton>
            </Link>
          </HeroActions>
        </HeroContent>

        <HeroMedia>
          <HeroImageFrame $template={template}>
            {storeImage ? (
              <HeroImage src={storeImage} alt={heroTitle} />
            ) : (
              <HeroImageFallback>{heroTitle}</HeroImageFallback>
            )}
          </HeroImageFrame>
          {(logoUrl || store?.name) && (
            <HeroLogoBadge>
              {logoUrl && <HeroLogo src={logoUrl} alt={store?.name || 'Logo'} />}
              <HeroLogoText>{store?.name || 'Tienda'}</HeroLogoText>
            </HeroLogoBadge>
          )}
        </HeroMedia>
      </TemplateHero>

      {sections.showTrustStrip && <StorefrontTrustStrip />}

      <MainStack $template={template}>
        {!!categories.length && sections.showCategories && (
          <TemplateSection $template={template}>
            <CategorySlider
              categories={categories.slice(0, 12)}
              title={translate('catalog.storeCategorySliderTitle')}
              subtitle={translate('catalog.storeCategorySliderSubtitle')}
              getPath={category => `${productsPath}?category=${category._id}`}
            />
          </TemplateSection>
        )}

        {hasProductsSection && (
          <TemplateSection $template={template}>
            <SectionHeader>
              <SectionCopy>
                <SectionEyebrow>{translate('storefront.catalog')}</SectionEyebrow>
                <SectionTitle>{translate('catalog.featuredProducts')}</SectionTitle>
              </SectionCopy>
              <SectionActions>
                <Link to={categoriesPath}>
                  <HeroButton>{translate('categories')}</HeroButton>
                </Link>
                <Link to={outletPath}>
                  <HeroButton>{translate('outlet')}</HeroButton>
                </Link>
                <Link to={productsPath}>
                  <HeroButton type="primary">{translate('catalog.viewAll')}</HeroButton>
                </Link>
              </SectionActions>
            </SectionHeader>

            <ProductsWrap>
              {loading ? (
                <LoadingBlock><Spin /></LoadingBlock>
              ) : products.length ? (
                <StorefrontProductGrid products={products} storeSlug={activeStoreSlug} />
              ) : (
                <Empty description={translate('catalog.noStoreProducts')} />
              )}
            </ProductsWrap>
          </TemplateSection>
        )}

        {store?.assignedBroker && sections.showCreditForm && (
          <TemplateSection $template={template}>
            <CreditApplicationForm
              storeId={store._id}
              sourceType="store_credit"
              compact
              title="Necesitas asesoria de credito?"
              subtitle={`Un asesor puede contactarte para revisar alternativas relacionadas con ${store.name}.`}
            />
          </TemplateSection>
        )}

        {sections.showNewsletter && (
          <TemplateSection $template={template}>
            <NewsletterSignup source="storefront" store={store} storeSlug={activeStoreSlug} />
          </TemplateSection>
        )}
      </MainStack>
    </StorefrontCanvas>
  )
}

export default StorefrontTemplateRenderer
