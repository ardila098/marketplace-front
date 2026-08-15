import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, message, Spin, Tabs } from 'antd'

import { useSellerProductDetail } from '../../../pages/seller/components/SellerProducts/hooks/useSellerProductDetail'
import { productService } from '../../../services/productService'

import ProductSummaryTab from './tabs/ProductSummaryTab'
import ProductReferencesTab from './tabs/ProductReferencesTab'
import ProductPartsTab from './tabs/ProductPartsTab'
import ProductInventoryTab from './tabs/ProductInventoryTab'
import ProductVariantsTab from './tabs/ProductVariantsTab'
import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'
import ModalAddProductVariant from '../../../pages/seller/components/SellerProducts/modals/ModalAddProductVariant'
import ModalAddProductReference from '../../../pages/seller/components/SellerProducts/modals/ModalAddProductReference'
import ModalAddInventoryItem from '../../../pages/seller/components/SellerProducts/modals/ModalAddInventoryItem'

const stockReason = 'Ajuste desde detalle del producto'

const ProductManageTabs = () => {
  const { id } = useParams()
  const [saving, setSaving] = useState(false)
  const [editingVariant, setEditingVariant] = useState(null)
  const [editingReference, setEditingReference] = useState(null)
  const [editingInventoryItem, setEditingInventoryItem] = useState(null)

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

  const productId = product._id || product.id

  const handleVariantSubmit = async ({ variantId, payload }) => {
    const { stock, ...data } = payload
    const quantity = Number(stock || 0) - Number(editingVariant?.stock || 0)

    setSaving(true)

    try {
      await productService.updateVariant(productId, variantId, data)

      if (quantity !== 0) {
        await productService.adjustVariantStock(productId, variantId, {
          quantity,
          reason: stockReason,
        })
      }

      message.success('Variante actualizada correctamente')
      setEditingVariant(null)
      getProductDetail()
    } catch (error) {
      message.error(error.message || 'No se pudo actualizar la variante')
    } finally {
      setSaving(false)
    }
  }

  const handleReferenceSubmit = async ({ referenceId, payload }) => {
    setSaving(true)

    try {
      await productService.updateReference(productId, referenceId, payload)
      message.success('Referencia actualizada correctamente')
      setEditingReference(null)
      getProductDetail()
    } catch (error) {
      message.error(error.message || 'No se pudo actualizar la referencia')
    } finally {
      setSaving(false)
    }
  }

  const handleInventorySubmit = async ({ inventoryItemId, payload }) => {
    const { stock, ...data } = payload
    const quantity = Number(stock || 0) - Number(editingInventoryItem?.stock || 0)

    setSaving(true)

    try {
      await productService.updateInventoryItem(productId, inventoryItemId, data)

      if (quantity !== 0) {
        await productService.adjustInventoryItemStock(productId, inventoryItemId, {
          quantity,
          reason: stockReason,
        })
      }

      message.success('Inventario actualizado correctamente')
      setEditingInventoryItem(null)
      getProductDetail()
    } catch (error) {
      message.error(error.message || 'No se pudo actualizar el inventario')
    } finally {
      setSaving(false)
    }
  }

  const handleSeoSubmit = async values => {
    setSaving(true)

    try {
      await productService.update(productId, values)
      message.success('SEO actualizado correctamente')
      getProductDetail()
    } catch (error) {
      message.error(error.message || 'No se pudo actualizar el SEO')
    } finally {
      setSaving(false)
    }
  }

  const baseItems = [
    {
      key: 'summary',
      label: 'Resumen',
      children: (
        <ProductSummaryTab
          product={product}
          saving={saving}
          onSaveSeo={handleSeoSubmit}
        />
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
          onEdit={setEditingVariant}
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
          onEdit={setEditingReference}
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
          onEdit={setEditingInventoryItem}
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
    <>
      <Card title={product.name}>
        <Tabs items={getItems()} />
      </Card>

      <ModalAddProductVariant
        open={Boolean(editingVariant)}
        product={product}
        variant={editingVariant}
        loading={saving}
        onCancel={() => setEditingVariant(null)}
        onSubmit={handleVariantSubmit}
      />

      <ModalAddProductReference
        open={Boolean(editingReference)}
        product={product}
        reference={editingReference}
        loading={saving}
        onCancel={() => setEditingReference(null)}
        onSubmit={handleReferenceSubmit}
      />

      <ModalAddInventoryItem
        open={Boolean(editingInventoryItem)}
        product={product}
        inventoryItem={editingInventoryItem}
        loading={saving}
        onCancel={() => setEditingInventoryItem(null)}
        onSubmit={handleInventorySubmit}
      />
    </>
  )
}

export default ProductManageTabs
