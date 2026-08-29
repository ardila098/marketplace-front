import { Empty, Spin } from 'antd'
import { Link } from 'react-router-dom'

import CategorySlider from '../../sliders/categorySlider/CategorySlider'
import CreditApplicationForm from '../../credit/CreditApplicationForm'
import NewsletterSignup from '../../newsletter/NewsletterSignup'
import StorefrontProductGrid from '../StorefrontProductGrid'
import StorefrontTrustStrip from '../StorefrontTrustStrip'
import {
  STOREFRONT_SECTION_DEFAULTS,
  STOREFRONT_STYLE_DEFAULTS,
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
  VisualCopy,
  VisualImage,
  VisualImageCard,
  VisualGrid,
  VisualSection,
  VisualTitle,
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

const getCategoryPath = (categoriesPath, category) => (
  `${categoriesPath}/${category?.slug || category?._id || ''}`
)

const getProductImage = product => (
  product?.image ||
  product?.images?.[0] ||
  product?.selectedItem?.image ||
  product?.itemsPreview?.[0]?.image ||
  product?.variants?.[0]?.image ||
  product?.variants?.[0]?.images?.[0]
)

const getCategoryImage = category => {
  if (category?.image) {
    return getUploadUrl(UPLOAD_ROUTES.categories.icons, category.image)
  }

  if (category?.banner) {
    return getUploadUrl(UPLOAD_ROUTES.categories.banners, category.banner)
  }

  return getUploadUrl(UPLOAD_ROUTES.categories.icons, category?.icon)
}

const getVisualImages = ({ categories, products, store, storeImage }) => {
  const productImages = products
    .map(getProductImage)
    .map(image => getUploadUrl(UPLOAD_ROUTES.products.images, image))

  const categoryImages = categories.map(getCategoryImage)

  return [
    storeImage,
    ...productImages,
    ...categoryImages,
    getLogoUrl(store),
  ].filter(Boolean).slice(0, 5)
}

const StorefrontVisualBlock = ({ categories, products, store, storeImage, style }) => {
  if (!style || style === 'none') return null

  const images = getVisualImages({ categories, products, store, storeImage })

  if (!images.length) return null

  return (
    <VisualSection $variant={style}>
      <VisualCopy $variant={style}>
        <SectionEyebrow>Marca visual</SectionEyebrow>
        <VisualTitle $variant={style}>{store?.name || 'Tienda'}</VisualTitle>
      </VisualCopy>
      <VisualGrid $variant={style}>
        {images.map((image, index) => (
          <VisualImageCard key={`${image}-${index}`} $variant={style} $index={index}>
            <VisualImage src={image} alt={`${store?.name || 'Tienda'} ${index + 1}`} />
          </VisualImageCard>
        ))}
      </VisualGrid>
    </VisualSection>
  )
}

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
  const storefront = store?.storefront || {}
  const heroStyle = storefront.heroStyle || STOREFRONT_STYLE_DEFAULTS.heroStyle
  const productCardStyle = storefront.productCardStyle || STOREFRONT_STYLE_DEFAULTS.productCardStyle
  const categorySliderStyle =
    storefront.categorySliderStyle || STOREFRONT_STYLE_DEFAULTS.categorySliderStyle
  const visualSectionStyle =
    storefront.visualSectionStyle || STOREFRONT_STYLE_DEFAULTS.visualSectionStyle
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
      <TemplateHero $template={template} $heroStyle={heroStyle} $heroImage={storeImage}>
        <HeroContent>
          <HeroEyebrow $heroStyle={heroStyle}>{heroEyebrow}</HeroEyebrow>
          <HeroTitle $template={template} $heroStyle={heroStyle}>{heroTitle}</HeroTitle>
          <HeroDescription $heroStyle={heroStyle}>{heroDescription}</HeroDescription>

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

        {heroStyle !== 'background' && (
          <HeroMedia>
            <HeroImageFrame $template={template} $heroStyle={heroStyle}>
              {storeImage ? (
                <HeroImage src={storeImage} alt={heroTitle} />
              ) : (
                <HeroImageFallback>{heroTitle}</HeroImageFallback>
              )}
            </HeroImageFrame>
            {(logoUrl || store?.name) && (
              <HeroLogoBadge $heroStyle={heroStyle}>
                {logoUrl && <HeroLogo src={logoUrl} alt={store?.name || 'Logo'} />}
                <HeroLogoText>{store?.name || 'Tienda'}</HeroLogoText>
              </HeroLogoBadge>
            )}
          </HeroMedia>
        )}
      </TemplateHero>

      {sections.showTrustStrip && <StorefrontTrustStrip />}

      <MainStack $template={template}>
        {!!categories.length && sections.showCategories && (
          <TemplateSection $template={template}>
            <CategorySlider
              categories={categories.slice(0, 12)}
              title={translate('catalog.storeCategorySliderTitle')}
              subtitle={translate('catalog.storeCategorySliderSubtitle')}
              getPath={category => getCategoryPath(categoriesPath, category)}
              variant={categorySliderStyle}
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
                <StorefrontProductGrid
                  products={products}
                  storeSlug={activeStoreSlug}
                  cardStyle={productCardStyle}
                />
              ) : (
                <Empty description={translate('catalog.noStoreProducts')} />
              )}
            </ProductsWrap>
          </TemplateSection>
        )}

        {sections.showVisualSection && (
          <StorefrontVisualBlock
            categories={categories}
            products={products}
            store={store}
            storeImage={storeImage}
            style={visualSectionStyle}
          />
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
