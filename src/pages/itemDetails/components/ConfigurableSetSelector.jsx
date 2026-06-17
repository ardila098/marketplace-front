import { useEffect, useMemo, useState } from 'react'

import {
  SelectorBlock,
  SelectorTitle,
  OptionsGrid,
  OptionButton,
  OptionLabel,
  OptionStock,
  PartBlock,
} from '../styles/styles'

const getOptionLabel = option => {
  return (option.attributes || [])
    .map(attribute => attribute.valueSnapshot)
    .filter(Boolean)
    .join(' / ')
}

const ConfigurableSetSelector = ({
  product,
  onDisplayItemChange,
  onSelectionChange,
}) => {
  const references = product.references || []

  const defaultReference = useMemo(() => {
    return references.find(reference => reference.isDefault) || references[0]
  }, [references])

  const [selectedReferenceId, setSelectedReferenceId] = useState(defaultReference?._id)
  const [selectedOptions, setSelectedOptions] = useState({})

  const selectedReference = references.find(reference => {
    return reference._id === selectedReferenceId
  })

  useEffect(() => {
    setSelectedOptions({})
  }, [selectedReferenceId])

  useEffect(() => {
    if (!selectedReference) return

    onDisplayItemChange?.(selectedReference)

    const parts = selectedReference.parts || []

    const selectedItems = parts
      .map(part => ({
        partId: part._id,
        inventoryItemId: selectedOptions[part._id],
      }))
      .filter(item => item.inventoryItemId)

    const isValid = parts.length > 0 && selectedItems.length === parts.length

    onSelectionChange?.({
      isValid,
      productId: product._id,
      productType: product.productType,
      referenceId: selectedReference._id,
      selectedItems,
      quantity: 1,
    })
  }, [
    product,
    selectedReference,
    selectedOptions,
    onDisplayItemChange,
    onSelectionChange,
  ])

  const handleSelectOption = (partId, inventoryItemId) => {
    setSelectedOptions(current => ({
      ...current,
      [partId]: inventoryItemId,
    }))
  }

  if (!references.length) return null

  return (
    <>
      <SelectorBlock>
        <SelectorTitle>Referencia</SelectorTitle>

        <OptionsGrid>
          {references.map(reference => (
            <OptionButton
              key={reference._id}
              type="button"
              $active={reference._id === selectedReferenceId}
              onClick={() => setSelectedReferenceId(reference._id)}
            >
              <OptionLabel>{reference.name}</OptionLabel>

              <OptionStock>
                {reference.stock} disponibles
              </OptionStock>
            </OptionButton>
          ))}
        </OptionsGrid>
      </SelectorBlock>

      {(selectedReference?.parts || []).map(part => (
        <PartBlock key={part._id}>
          <SelectorTitle>{part.name}</SelectorTitle>

          <OptionsGrid>
            {part.options.map(option => (
              <OptionButton
                key={option.inventoryItemId}
                type="button"
                $active={selectedOptions[part._id] === option.inventoryItemId}
                onClick={() =>
                  handleSelectOption(part._id, option.inventoryItemId)
                }
              >
                <OptionLabel>
                  {getOptionLabel(option) || 'Opción'}
                </OptionLabel>

                <OptionStock>
                  {option.stock} disponibles
                </OptionStock>
              </OptionButton>
            ))}
          </OptionsGrid>
        </PartBlock>
      ))}
    </>
  )
}

export default ConfigurableSetSelector