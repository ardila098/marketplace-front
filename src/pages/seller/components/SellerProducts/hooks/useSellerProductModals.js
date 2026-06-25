import { useState } from 'react'

const initialModal = {
  open: false,
  product: null,
}

export const useSellerProductModals = ({
  addVariant,
  addPiece,
  addInventoryItem,
  addReference,
}) => {
  const [variantModal, setVariantModal] = useState(initialModal)
  const [partsModal, setPartsModal] = useState(initialModal)
  const [inventoryModal, setInventoryModal] = useState(initialModal)
  const [referenceModal, setReferenceModal] = useState(initialModal)

  const openVariantModal = product => {
    setVariantModal({
      open: true,
      product,
    })
  }

  const openPartsModal = product => {
    setPartsModal({
      open: true,
      product,
    })
  }

  const openInventoryModal = product => {
    setInventoryModal({
      open: true,
      product,
    })
  }

  const closeVariantModal = () => {
    setVariantModal(initialModal)
  }

  const closePartsModal = () => {
    setPartsModal(initialModal)
  }

  const closeInventoryModal = () => {
    setInventoryModal(initialModal)
  }

  const submitVariant = async values => {
    const success = await addVariant(values)

    if (success) {
      closeVariantModal()
    }
  }

  const submitPiece = async values => {
    const success = await addPiece(values)

    if (success) {
      closePartsModal()
    }
  }

  const submitInventoryItem = async values => {
    const success = await addInventoryItem(values)

    if (success) {
      closeInventoryModal()
    }
  }


  const openReferenceModal = product => {
    setReferenceModal({
      open: true,
      product,
    })
  }

  const closeReferenceModal = () => {
    setReferenceModal(initialModal)
  }

  const submitReference = async values => {
    const success = await addReference(values)

    if (success) {
      closeReferenceModal()
    }
  }

  return {
    variantModal,
    partsModal,
    inventoryModal,

    openVariantModal,
    openPartsModal,
    openInventoryModal,

    closeVariantModal,
    closePartsModal,
    closeInventoryModal,

    submitVariant,
    submitPiece,
    submitInventoryItem,


    referenceModal,
    openReferenceModal,
    closeReferenceModal,
    submitReference

  }
}