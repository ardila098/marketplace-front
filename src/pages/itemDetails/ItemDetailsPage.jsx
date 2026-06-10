import { useParams } from 'react-router-dom'
import useItemDetails from './hooks/useItemDetails'
import { Empty, Spin } from 'antd'
import { useState } from 'react'
import ProductGallery from './components/ItemGallery'
import ProductInfo from './components/ItemInfo'
import ProductPurchasePanel from './components/ProductPurchasePanel'

import { PageContainer, ProductLayout, GalleryColumn, InfoColumn } from './styles/styles'

const ProductDetailPage = () => {
  const { id } = useParams()

  const { dataItem, isLoading } = useItemDetails(id)
  const [selectedDisplayItem, setSelectedDisplayItem] = useState(null)
  const [cartSelection, setCartSelection] = useState(null)

  if (isLoading) {
    return (
      <PageContainer>
        <Spin spinning />
      </PageContainer>
    )
  }

  if (!dataItem) {
    return (
      <PageContainer>
        <Empty description="Producto no encontrado" />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ProductLayout>
        <GalleryColumn>
          <ProductGallery product={dataItem} selectedItem={selectedDisplayItem} />
        </GalleryColumn>

        <InfoColumn>
          <ProductInfo product={dataItem} selectedItem={selectedDisplayItem} />

          <ProductPurchasePanel
            product={dataItem}
            onDisplayItemChange={setSelectedDisplayItem}
            onSelectionChange={setCartSelection}
          />

          {cartSelection && (
            <pre style={{ marginTop: 20, fontSize: 12 }}>
              {JSON.stringify(cartSelection, null, 2)}
            </pre>
          )}
        </InfoColumn>
      </ProductLayout>
    </PageContainer>
  )
}

export default ProductDetailPage
