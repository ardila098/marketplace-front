import { useEffect, useState } from 'react'

const useConfigurableSetSelection = ({ item }) => {
  const [selectedReference, setSelectedReference] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  const references = item?.references || []
  const parts = selectedReference?.parts || []

  const syncSelection = (reference, options) => {
    const referenceParts = reference?.parts || []

    
  }

  useEffect(() => {
    const reference = references.find(item => item.isDefault) || references[0] || null

    setSelectedReference(reference)
    setSelectedOptions({})

    if (reference) {
      syncSelection(reference, {})
    }
  }, [item])

  const handleSelectReference = reference => {
    setSelectedReference(reference)
    setSelectedOptions({})
    syncSelection(reference, {})
  }

  const handleSelectOption = (partId, inventoryItemId) => {
    const nextOptions = {
      ...selectedOptions,
      [partId]: inventoryItemId,
    }

    setSelectedOptions(nextOptions)
    syncSelection(selectedReference, nextOptions)
  }

  return {
    references,
    parts,
    selectedReference,
    selectedOptions,
    handleSelectReference,
    handleSelectOption,
  }
}

export default useConfigurableSetSelection
