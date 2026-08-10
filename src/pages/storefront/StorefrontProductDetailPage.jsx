import { Empty, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ItemGallery from '../itemDetails/components/ItemGallery'
import ItemInfo from '../itemDetails/components/ItemInfo'
import ItemPucharse from '../itemDetails/components/pucharse/ItemPucharse'
import ProductTabs from '../itemDetails/components/ProductTabs'
import RelatedItems from '../itemDetails/components/RelatedItems'
import TrustBadges from '../itemDetails/components/TrustBadges'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
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

  return (
    <PageContainer>
      <Spin spinning={loading}>
        {!product && !loading ? (
          <Empty description={translate('productNotFound')} />
        ) : (
          <>
            <ProductLayout style={{ marginTop: 20 }}>
              <GalleryColumn>
                <ItemGallery item={purchase.selectedReference || product} />
                <TrustBadges />
              </GalleryColumn>

              <InfoColumn>
                <ItemInfo item={product} selectedReference={purchase.selectedReference} />
                <ItemPucharse item={product} purchase={purchase} />
                <ProductTabs product={product} selectedReference={purchase.selectedReference} />
              </InfoColumn>
            </ProductLayout>

            <RelatedItems
              data={relatedProducts}
              storeSlug={activeStoreSlug}
              currentProduct={product}
            />
          </>
        )}
      </Spin>
    </PageContainer>
  )
}

export default StorefrontProductDetailPage
