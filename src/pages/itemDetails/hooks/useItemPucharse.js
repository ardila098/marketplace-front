import { useEffect, useState } from 'react'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart, selectCartAdding } from '../../../store/slices/cartSlice'
import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'

const useItemPucharse = item => {
  const dispatch = useDispatch()
  const adding = useSelector(selectCartAdding)
  const [selectedReference, setSelectedReference] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  const isConfigurableSet = item?.productType === PRODUCT_TYPES.CONFIGURABLE_SET.value
  const parts = selectedReference?.parts || []

  const selectedItems = parts
    .map(part => ({
      partId: part._id,
      inventoryItemId: selectedOptions[part._id],
    }))
    .filter(selectedItem => selectedItem.inventoryItemId)

  const isValid = isConfigurableSet
    ? parts.length > 0 && selectedItems.length === parts.length
    : Boolean(selectedReference?._id)

  const payload = isConfigurableSet
    ? {
        isValid,
        productId: item?._id,
        productType: item?.productType,
        referenceId: selectedReference?._id,
        selectedItems,
        quantity: 1,
      }
    : {
        isValid,
        productId: item?._id,
        productType: item?.productType,
        variantId: selectedReference?._id,
        quantity: 1,
      }

  useEffect(() => {
    if (!item) return

    setSelectedReference(item.references?.[0] || item.variants?.[0] || item)
    setSelectedOptions({})
  }, [item])

  const handleSelectReference = reference => {
    setSelectedReference(reference)
    setSelectedOptions({})
  }

  const handleSelectOption = (partId, inventoryItemId) => {
    setSelectedOptions(current => ({
      ...current,
      [partId]: inventoryItemId,
    }))
  }

  const handleAddCart = async () => {
    if (!isValid) {
      message.warning('Completa la selección del producto')
      return
    }

    try {
      await dispatch(addItemToCart(payload)).unwrap()
      message.success('Producto agregado al carrito')
    } catch (error) {
      message.error(error || 'No se pudo agregar al carrito')
    }
  }

  return {
    adding,
    selectedReference,
    selectedOptions,
    parts,
    isValid,
    handleSelectReference,
    handleSelectOption,
    handleAddCart,
  }
}

export default useItemPucharse