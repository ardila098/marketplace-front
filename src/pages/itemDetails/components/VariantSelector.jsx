import { useEffect, useState } from 'react'

import {
  SelectorBlock,
  SelectorTitle,
  OptionsGrid,
  OptionButton,
  OptionLabel,
  OptionStock,
} from '../styles/styles'

const getVariantLabel = variant => {
  return (variant.attributes || [])
    .map(attribute => attribute.valueSnapshot)
    .filter(Boolean)
    .join(' / ')
}

const VariantSelector = ({
  product,
  onDisplayItemChange,
  onSelectionChange,
}) => {
  const variants = product.variants || []
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?._id)

  const selectedVariant = variants.find(variant => variant._id === selectedVariantId)

  useEffect(() => {
    if (!selectedVariant) return

    onDisplayItemChange?.(selectedVariant)

    onSelectionChange?.({
      isValid: true,
      productId: product._id,
      productType: product.productType,
      variantId: selectedVariant._id,
      quantity: 1,
    })
  }, [product, selectedVariant, onDisplayItemChange, onSelectionChange])

  if (!variants.length) return null

  return (
    <SelectorBlock>
      <SelectorTitle>Selecciona una opción</SelectorTitle>

      <OptionsGrid>
        {variants.map(variant => (
          <OptionButton
            key={variant._id}
            type="button"
            $active={variant._id === selectedVariantId}
            onClick={() => setSelectedVariantId(variant._id)}
          >
            <OptionLabel>
              {getVariantLabel(variant) || 'Opción'}
            </OptionLabel>

            <OptionStock>
              {variant.stock} disponibles
            </OptionStock>
          </OptionButton>
        ))}
      </OptionsGrid>
    </SelectorBlock>
  )
}

export default VariantSelector