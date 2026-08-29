import { Empty, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ItemGallery from '../itemDetails/components/ItemGallery'
import ItemInfo from '../itemDetails/components/ItemInfo'
import ItemPucharse from '../itemDetails/components/pucharse/ItemPucharse'
import ProductTabs from '../itemDetails/components/ProductTabs'
import RelatedItems from '../itemDetails/components/RelatedItems'
import TrustBadges from '../itemDetails/components/TrustBadges'
import { getItemLabel } from '../../helpers/catalogProduct'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { useSeoMeta } from '../../hooks/useSeoMeta'
import useItemPucharse from '../itemDetails/hooks/useItemPucharse'
import {
  GalleryColumn,
  InfoColumn,
  PageContainer,
  ProductLayout,
} from '../itemDetails/styles/styles'
import useStoreProductDetail from './hooks/useStoreProductDetail'

const StorefrontProductDetailPage = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug, productSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const activeStoreSlug = storeSlug || store?.slug
  const { product, relatedProducts, loading } = useStoreProductDetail(activeStoreSlug, productSlug)
  const purchase = useItemPucharse(product)
  const storefront = store?.storefront || {}
  const detailLayout = storefront.productDetailLayout || 'classic'
  const cardStyle = storefront.productCardStyle || 'classic'
  const selectedLabel = getItemLabel(purchase.selectedReference)
  const displayItem = purchase.selectedReference || product
  const seoImage = product?.seo?.image ||
    displayItem?.image ||
    displayItem?.images?.[0] ||
    product?.image ||
    product?.images?.[0]
  const productDescription = product?.seo?.description || product?.description || selectedLabel
  const pageTitle = [
    product?.seo?.title || product?.name,
    selectedLabel,
    store?.name,
  ].filter(Boolean).join(' - ')
  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : ''

  useSeoMeta({
    title: pageTitle,
    description: productDescription,
    keywords: product?.seo?.keywords,
    image: getUploadUrl(UPLOAD_ROUTES.products.images, seoImage),
    canonical: canonicalUrl,
    type: 'product',
    siteName: store?.name,
    jsonLd: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: productDescription,
          image: getUploadUrl(UPLOAD_ROUTES.products.images, seoImage),
          brand: store?.name,
          offers: displayItem?.price
            ? {
                '@type': 'Offer',
                priceCurrency: 'COP',
                price: Number(displayItem.price),
                availability: 'https://schema.org/InStock',
                url: canonicalUrl,
              }
            : undefined,
        }
      : null,
  })

  return (
    <PageContainer $layout={detailLayout}>
      <Spin spinning={loading}>
        {!product && !loading ? (
          <Empty description={translate('productNotFound')} />
        ) : (
          <>
            <ProductLayout $layout={detailLayout}>
              <GalleryColumn>
                <ItemGallery item={purchase.selectedReference || product} />
                <TrustBadges />
              </GalleryColumn>

              <InfoColumn $layout={detailLayout}>
                <ItemInfo item={product} selectedReference={purchase.selectedReference} />
                <ItemPucharse item={product} purchase={purchase} />
                <ProductTabs product={product} selectedReference={purchase.selectedReference} />
              </InfoColumn>
            </ProductLayout>

            <RelatedItems
              data={relatedProducts}
              storeSlug={activeStoreSlug}
              currentProduct={product}
              cardStyle={cardStyle}
            />
          </>
        )}
      </Spin>
    </PageContainer>
  )
}

export default StorefrontProductDetailPage
