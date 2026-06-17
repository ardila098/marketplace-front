import { useParams, Link } from 'react-router-dom'
import useItemDetails from './hooks/useItemDetails'
import { Empty, Spin } from 'antd'
import { useState } from 'react'
import ProductGallery from './components/ItemGallery'
import ProductInfo from './components/ItemInfo'
import ProductPurchasePanel from './components/ProductPurchasePanel'
import TrustBadges from './components/TrustBadges'
import ProductTabs from './components/ProductTabs'
import RelatedProduct from './components/RelatedProduct'

import { PageContainer, ProductLayout, GalleryColumn, InfoColumn } from './styles/styles'
import { BreadcrumbNav } from './styles/styleItemDetails'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { dataItem, isLoading } = useItemDetails(id)

  const [selectedDisplayItem, setSelectedDisplayItem] = useState(null)
  const [cartSelection, setCartSelection] = useState(null)

  // El backend devuelve el producto plano dentro de `data`
  const product = dataItem

  if (isLoading) {
    return (
      <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Spin size="large" />
      </PageContainer>
    )
  }

  if (!product) {
    return (
      <PageContainer>
        <Empty description="Producto no encontrado" />
      </PageContainer>
    )
  }

  // La vertical viene poblada como objeto { _id, name }
  const verticalName = product.vertical?.name || 'Categoría'

  return (
    <PageContainer>
      {/* 1. Breadcrumbs Nav */}
      <BreadcrumbNav>
        <Link to="/">Inicio</Link>
        <span className="separator">/</span>
        {product.vertical && (
          <>
            <Link to={`/vertical/${product.vertical?._id}`}>{verticalName}</Link>
            <span className="separator">/</span>
          </>
        )}
        {product.category && (
          <>
            <span className="current">{product.category.name}</span>
            <span className="separator">/</span>
          </>
        )}
        <span className="current">{product.name}</span>
      </BreadcrumbNav>

      {/* 2. Grid de Detalle */}
      <ProductLayout style={{ marginTop: '20px' }}>
        <GalleryColumn>
          <ProductGallery product={product} selectedItem={selectedDisplayItem} />
          <TrustBadges />
        </GalleryColumn>

        <InfoColumn>
          <ProductInfo product={product} selectedItem={selectedDisplayItem} />

          <ProductPurchasePanel
            product={product}
            onDisplayItemChange={setSelectedDisplayItem}
            onSelectionChange={setCartSelection}
          />
        </InfoColumn>
      </ProductLayout>

      {/* 3. Secciones Inferiores */}
      <ProductTabs product={product} />
      
      <RelatedProduct product={product} />
    </PageContainer>
  )
}

export default ProductDetailPage
