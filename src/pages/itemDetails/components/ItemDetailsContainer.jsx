import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import useItemDetails from '../hooks/useItemDetails'
import useCatalog from '../../../hooks/useCatalog'
import useItemPucharse from '../hooks/useItemPucharse'

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
