import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import useItemDetails from '../hooks/useItemDetails'
import useCatalog from '../../../hooks/useCatalog'
import useItemPucharse from '../hooks/useItemPucharse'
import { getItemLabel } from '../../../helpers/catalogProduct'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useSeoMeta } from '../../../hooks/useSeoMeta'

import ItemGallery from './ItemGallery'
import ItemInfo from './ItemInfo'
import ProductTabs from './ProductTabs'
import TrustBadges from './TrustBadges'
import RelatedItems from './RelatedItems'
import ItemPucharse from './pucharse/ItemPucharse'

import { GalleryColumn, InfoColumn, PageContainer, ProductLayout } from '../styles/styles'

const ItemDetailsContainer = () => {
  const { id } = useParams()
  const { dataItem, isLoading } = useItemDetails(id)
  const { getVerticalCatalog, data } = useCatalog()
  const purchase = useItemPucharse(dataItem)
  const verticalId = dataItem?.vertical?._id || dataItem?.vertical
  const selectedLabel = getItemLabel(purchase.selectedReference)
  const displayItem = purchase.selectedReference || dataItem
  const seoImage = dataItem?.seo?.image ||
    displayItem?.image ||
    displayItem?.images?.[0] ||
    dataItem?.image ||
    dataItem?.images?.[0]
  const productDescription = dataItem?.seo?.description || dataItem?.description || selectedLabel
  const pageTitle = [
    dataItem?.seo?.title || dataItem?.name,
    selectedLabel,
    dataItem?.store?.name,
  ].filter(Boolean).join(' - ')
  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : ''

  useSeoMeta({
    title: pageTitle,
    description: productDescription,
    keywords: dataItem?.seo?.keywords,
    image: getUploadUrl(UPLOAD_ROUTES.products.images, seoImage),
    canonical: canonicalUrl,
    type: 'product',
    siteName: 'Cooqys',
    jsonLd: dataItem
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: dataItem.name,
          description: productDescription,
          image: getUploadUrl(UPLOAD_ROUTES.products.images, seoImage),
          brand: dataItem.store?.name,
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

  useEffect(() => {
    if (verticalId) {
      getVerticalCatalog({ vertical: verticalId })
    }
  }, [getVerticalCatalog, verticalId])

  return (
    <PageContainer>
      <Spin spinning={isLoading}>
        <ProductLayout style={{ marginTop: 20 }}>
          <GalleryColumn>
            <ItemGallery item={purchase.selectedReference || dataItem} />
            <TrustBadges />
          </GalleryColumn>

          <InfoColumn>
            <ItemInfo item={dataItem} selectedReference={purchase.selectedReference} />
            <ItemPucharse item={dataItem} purchase={purchase} />
            <ProductTabs product={dataItem} selectedReference={purchase.selectedReference} />
          </InfoColumn>
        </ProductLayout>

        <RelatedItems data={data} currentProduct={dataItem} verticalId={verticalId} />
      </Spin>
    </PageContainer>
  )
}

export default ItemDetailsContainer
