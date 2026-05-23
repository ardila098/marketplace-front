import { useParams } from 'react-router-dom'
import { Card, Spin, Tabs } from 'antd'

import { useSellerProductDetail } from '../../../pages/seller/components/SellerProducts/hooks/useSellerProductDetail'

import ProductSummaryTab from './tabs/ProductSummaryTab'
import ProductReferencesTab from './tabs/ProductReferencesTab'
import ProductPartsTab from './tabs/ProductPartsTab'
import ProductInventoryTab from './tabs/ProductInventoryTab'
import ProductVariantsTab from './tabs/ProductVariantsTab'
import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'

const ProductManageTabs = () => {
  const { id } = useParams()

  const {
    loading,
    product,
    inventory,
    getProductDetail,
  } = useSellerProductDetail(id)

  if (loading && !product) {
    return <Spin />
  }

  if (!product) return null

  const baseItems = [
    {
      key: 'summary',
      label: 'Resumen',
      children: (
        <ProductSummaryTab product={product} />
      ),
    },
  ]

  const variantItems = [
    {
      key: 'variants',
      label: 'Variantes',
      children: (
        <ProductVariantsTab
          product={product}
          onRefresh={getProductDetail}
        />
      ),
    },
  ]

  const configurableSetItems = [
    {
      key: 'references',
      label: 'Referencias',
      children: (
        <ProductReferencesTab
          product={product}
          onRefresh={getProductDetail}
        />
      ),
    },
    {
      key: 'parts',
      label: 'Piezas',
      children: (
        <ProductPartsTab
          product={product}
          onRefresh={getProductDetail}
        />
      ),
    },
    {
      key: 'inventory',
      label: 'Inventario',
      children: (
        <ProductInventoryTab
          product={product}
          inventory={inventory}
          onRefresh={getProductDetail}
        />
      ),
    },
  ]

  const getItems = () => {
    if (product.productType === PRODUCT_TYPES.VARIANT.value) {
      return [
        ...baseItems,
        ...variantItems,
      ]
    }

    if (product.productType === PRODUCT_TYPES.CONFIGURABLE_SET.value) {
      return [
        ...baseItems,
        ...configurableSetItems,
      ]
    }

    return baseItems
  }

  return (
    <Card title={product.name}>
      <Tabs items={getItems()} />
    </Card>
  )
}

export default ProductManageTabs