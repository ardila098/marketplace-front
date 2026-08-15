import { Col, Empty, Row, Spin } from 'antd'
import { ImageIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import {
  CatalogHeader,
  CatalogTitle,
  Eyebrow,
  ResultCount,
} from '../../components/catalog/catalogStyles'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { useSeoMeta } from '../../hooks/useSeoMeta'
import { PageShell } from '../../styles/layoutStyles'
import useStoreCategories from './hooks/useStoreCategories'

const CategoryCard = styled(Link)`
  display: block;
  height: 100%;
  border: 1px solid #eceef2;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    color: inherit;
    border-color: #d8dde6;
    box-shadow: 0 10px 24px rgba(17, 24, 39, 0.06);
    transform: translateY(-2px);
  }
`

const CategoryImage = styled.div`
  height: 148px;
  background:
    linear-gradient(180deg, rgba(17, 24, 39, 0.04), rgba(17, 24, 39, 0.28)),
    ${({ $image }) => $image
      ? `url(${$image}) center/cover`
      : 'linear-gradient(135deg, #f5f6f8, #e7ebf0)'};
  display: grid;
  place-items: center;
  color: #9ca3af;
`

const CategoryBody = styled.div`
  padding: 16px;
`

const CategoryName = styled.h2`
  color: #111827;
  font-size: 16px;
  line-height: 1.25;
  margin: 0 0 6px;
  letter-spacing: 0;
`

const CategoryMeta = styled.div`
  color: #6b7280;
  font-size: 13px;
`

const CategoryDescription = styled.p`
  color: #6b7280;
  display: -webkit-box;
  font-size: 13px;
  line-height: 1.45;
  margin: 8px 0 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const getCategoryImage = category => {
  if (category.image) {
    return getUploadUrl(UPLOAD_ROUTES.categories.icons, category.image)
  }

  if (category.banner) {
    return getUploadUrl(UPLOAD_ROUTES.categories.banners, category.banner)
  }

  return getUploadUrl(UPLOAD_ROUTES.categories.icons, category.icon)
}

const StorefrontCategoriesPage = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const { currentStore: store, resolutionMode } = useSelector(state => state.storefront)
  const activeStoreSlug = storeSlug || store?.slug
  const { categories, loading } = useStoreCategories(activeStoreSlug)
  const storefront = store?.storefront || {}
  const seoImage = storefront.socialImage
    ? getUploadUrl(UPLOAD_ROUTES.stores.banners, storefront.socialImage)
    : getUploadUrl(UPLOAD_ROUTES.stores.banners, store?.banner) ||
      getUploadUrl(UPLOAD_ROUTES.stores.logos, store?.logo)
  const productsPath = resolutionMode === 'host'
    ? '/products'
    : activeStoreSlug
      ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: activeStoreSlug })
      : '/products'

  useSeoMeta({
    title: store?.name ? `Categorias - ${store.name}` : translate('categories'),
    description: storefront.seoDescription || store?.description,
    keywords: storefront.seoKeywords,
    image: seoImage,
    canonical: typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '',
    siteName: store?.name,
  })

  return (
    <PageShell>
      <CatalogHeader>
        <div>
          <Eyebrow>{store?.name || translate('stores')}</Eyebrow>
          <CatalogTitle>{translate('categories')}</CatalogTitle>
        </div>
        <ResultCount>
          {loading
            ? translate('loading')
            : `${categories.length} ${translate('catalog.categoriesCount')}`}
        </ResultCount>
      </CatalogHeader>

      {loading ? (
        <Spin />
      ) : !categories.length ? (
        <Empty description={translate('catalog.noStoreCategories')} />
      ) : (
        <Row gutter={[16, 16]}>
          {categories.map(category => {
            const image = getCategoryImage(category)

            return (
              <Col xs={24} sm={12} lg={8} key={category._id}>
                <CategoryCard to={`${productsPath}?category=${category._id}`}>
                  <CategoryImage $image={image}>
                    {!image && <ImageIcon size={28} />}
                  </CategoryImage>
                  <CategoryBody>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryMeta>
                      {category.productCount} {translate('catalog.productsCount')}
                    </CategoryMeta>
                    {category.description && (
                      <CategoryDescription>{category.description}</CategoryDescription>
                    )}
                  </CategoryBody>
                </CategoryCard>
              </Col>
            )
          })}
        </Row>
      )}
    </PageShell>
  )
}

export default StorefrontCategoriesPage
