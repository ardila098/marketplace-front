import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'
import VariantSelector from './VariantSelector'
import ConfigurableSetSelector from './ConfigurableSetSelector'
import {
  addItemToCart,
  selectCartAdding,
} from '../../../store/slices/cartSlice'

import {
  PurchasePanel,
  AddCartButtonWrapper,
} from '../styles/styles'

const ProductPurchasePanel = ({
  product,
  onDisplayItemChange,
  onSelectionChange,
}) => {
  const dispatch = useDispatch()
  const adding = useSelector(selectCartAdding)

  const [selection, setSelection] = useState(null)

  const isConfigurableSet =
    Number(product?.productType) === PRODUCT_TYPES.CONFIGURABLE_SET.value

  useEffect(() => {
    onSelectionChange?.(selection)
  }, [selection, onSelectionChange])

  const handleAddCart = async () => {
    if (!selection?.isValid) {
      message.warning('Completa la selección del producto')
      return
    }

    try {
      await dispatch(addItemToCart(selection)).unwrap()
      message.success('Producto agregado al carrito')
    } catch (error) {
      message.error(error || 'No se pudo agregar al carrito')
    }
  }

  return (
    <PurchasePanel>
      {isConfigurableSet ? (
        <ConfigurableSetSelector
          product={product}
          onDisplayItemChange={onDisplayItemChange}
          onSelectionChange={setSelection}
        />
      ) : (
        <VariantSelector
          product={product}
          onDisplayItemChange={onDisplayItemChange}
          onSelectionChange={setSelection}
        />
      )}

      <AddCartButtonWrapper>
        <Button
          type="primary"
          size="large"
          block
          loading={adding}
          disabled={!selection?.isValid}
          onClick={handleAddCart}
        >
          Agregar al carrito
        </Button>
      </AddCartButtonWrapper>
    </PurchasePanel>
  )
}

export default ProductPurchasePanel