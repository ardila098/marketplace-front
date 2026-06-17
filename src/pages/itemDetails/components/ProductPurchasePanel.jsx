import { useEffect, useState } from 'react'
import { Button } from 'antd'

import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'
import VariantSelector from './VariantSelector'
import ConfigurableSetSelector from './ConfigurableSetSelector'

import {
  PurchasePanel,
  AddCartButtonWrapper,
} from '../styles/styles'

const ProductPurchasePanel = ({
  product,
  onDisplayItemChange,
  onSelectionChange,
}) => {
  const [selection, setSelection] = useState(null)

  const isConfigurableSet =
    Number(product.productType) === PRODUCT_TYPES.CONFIGURABLE_SET.value

  useEffect(() => {
    onSelectionChange?.(selection)
  }, [selection, onSelectionChange])

  const handleAddCart = () => {
    console.log('ADD CART PAYLOAD:', selection)
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