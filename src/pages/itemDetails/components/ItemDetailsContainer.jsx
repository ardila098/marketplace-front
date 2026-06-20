import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GalleryColumn, InfoColumn, PageContainer, ProductLayout } from '../styles/styles'
import { Spin } from 'antd'
import ProductTabs from './ProductTabs'
import TrustBadges from './TrustBadges'
import ProductPurchasePanel from './ProductPurchasePanel'
import useItemDetails from '../hooks/useItemDetails'
import useCatalog from '../../../hooks/useCatalog'
import RelatedItems from './RelatedItems'
import ItemGallery from './ItemGallery'
import ItemInfo from './ItemInfo'

const ItemDetailsContainer = () => {
  const { id } = useParams()
  const { dataItem, isLoading } = useItemDetails(id)
  const { getVerticalCatalog, data } = useCatalog()

  const [selectedDisplayItem, setSelectedDisplayItem] = useState(null)
  const [cartSelection, setCartSelection] = useState(null)

  useEffect(() => {
    const filters = {
      verticals: id,
    }
    getVerticalCatalog(filters)
  }, [id])

  return (
    <PageContainer>
      <Spin spinning={isLoading}>
        <ProductLayout style={{ marginTop: '20px' }}>
          <GalleryColumn>
            <ItemGallery product={dataItem} selectedItem={selectedDisplayItem} />
            <TrustBadges />
          </GalleryColumn>

          <InfoColumn>
            <ItemInfo product={dataItem} selectedItem={selectedDisplayItem} />

            <ProductPurchasePanel
              product={dataItem}
              onDisplayItemChange={setSelectedDisplayItem}
              onSelectionChange={setCartSelection}
            />
          </InfoColumn>
        </ProductLayout>

        <ProductTabs product={dataItem} />

        <RelatedItems data={data} />
      </Spin>
    </PageContainer>
  )
}

export default ItemDetailsContainer
