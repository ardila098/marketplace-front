import { Empty, Spin } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import {
  CatalogTitle,
  Eyebrow,
  ResultCount,
} from '../../components/catalog/catalogStyles'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { useSeoMeta } from '../../hooks/useSeoMeta'
import { PageShell } from '../../styles/layoutStyles'
import {
  CategoryActions,
  CategoryButton,
  CategoryCopy,
  CategoryDescription,
  CategoryHero,
  CategoryImage,
  CategoryProductsHeader,
} from './storefrontCategoryStyles'
import useStoreCategories from './hooks/useStoreCategories'
import useStoreProducts from './hooks/useStoreProducts'

const matchesCategory = (category, value) => {
  const target = String(value || '')

  return [
    category?._id,
    category?.id,
    category?.slug,
  ].filter(Boolean).map(String).includes(target)
}

const getCategoryImage = category => {
  if (category?.image) {
    return getUploadUrl(UPLOAD_ROUTES.categories.icons, category.image)
  }

  if (category?.banner) {
    return getUploadUrl(UPLOAD_ROUTES.categories.banners, category.banner)
  }

  return getUploadUrl(UPLOAD_ROUTES.categories.icons, category?.icon)
}

const StorefrontCategoryPage = () => {
  const { translate } = useDictionaryTranslation()
  const { categorySlug, storeSlug } = useParams()
  const { currentStore: store, resolutionMode } = useSelector(state => state.storefront)
  const activeStoreSlug = storeSlug || store?.slug
  const storefront = store?.storefront || {}
  const cardStyle = storefront.productCardStyle || 'classic'
  const { categories, loading: loadingCategories } = useStoreCategories(activeStoreSlug)
  const category = useMemo(() => (
    categories.find(item => matchesCategory(item, categorySlug))
  ), [categories, categorySlug])
  const isObjectIdParam = /^[a-f0-9]{24}$/i.test(String(categorySlug || ''))
  const resolvedCategoryId = category?._id || (isObjectIdParam ? categorySlug : null)
  const { products, loading: loadingProducts } = useStoreProducts(
    resolvedCategoryId ? activeStoreSlug : null,
    {
      category: resolvedCategoryId,
      pageSize: 48,
      sort: 'newest',
    }
  )
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
  const title = category?.name || translate('categories')
  const image = getCategoryImage(category)
  const loading = loadingCategories || loadingProducts

  useSeoMeta({
    title: store?.name ? `${title} - ${store.name}` : title,
    description: category?.description || storefront.seoDescription || store?.description,
    keywords: storefront.seoKeywords,
    image,
    canonical: typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '',
    siteName: store?.name,
  })

  return (
    <PageShell>
      <Spin spinning={loading}>
        <CategoryHero>
          <CategoryCopy>
            <Eyebrow>{store?.name || translate('stores')}</Eyebrow>
            <CatalogTitle>{title}</CatalogTitle>
            {category?.description && (
              <CategoryDescription>{category.description}</CategoryDescription>
            )}
            <CategoryActions>
              <Link to={categoriesPath}>
                <CategoryButton icon={<ArrowLeft size={16} />}>
                  {translate('categories')}
                </CategoryButton>
              </Link>
              <Link to={productsPath}>
                <CategoryButton type="primary">{translate('products')}</CategoryButton>
              </Link>
            </CategoryActions>
          </CategoryCopy>
          <CategoryImage $image={image} />
        </CategoryHero>

        <CategoryProductsHeader>
          <CatalogTitle>{title}</CatalogTitle>
          <ResultCount>
            {loading
              ? translate('loading')
              : `${products.length} ${translate('catalog.productsCount')}`}
          </ResultCount>
        </CategoryProductsHeader>

        {!products.length && !loading ? (
          <Empty description={translate('catalog.noStoreProducts')} />
        ) : (
          <StorefrontProductGrid
            products={products}
            storeSlug={activeStoreSlug}
            cardStyle={cardStyle}
          />
        )}
      </Spin>
    </PageShell>
  )
}

export default StorefrontCategoryPage
