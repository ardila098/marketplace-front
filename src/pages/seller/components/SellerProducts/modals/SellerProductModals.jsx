import ModalAddProductVariant from './ModalAddProductVariant'
import ModalAddInventoryItem from './ModalAddInventoryItem'
import ModalAddProductReference from './ModalAddProductReference'
import ModalManageProductParts from './ModalManageProductParts'

const SellerProductModals = ({
  saving,
  modals,
}) => {
  return (
    <>
      <ModalAddProductVariant
        open={modals.variantModal.open}
        product={modals.variantModal.product}
        loading={saving}
        onCancel={modals.closeVariantModal}
        onSubmit={modals.submitVariant}
      />

      <ModalManageProductParts
        open={modals.partsModal.open}
        product={modals.partsModal.product}
        loading={saving}
        onCancel={modals.closePartsModal}
        onSubmit={modals.submitPiece}
      />

      <ModalAddInventoryItem
        open={modals.inventoryModal.open}
        product={modals.inventoryModal.product}
        loading={saving}
        onCancel={modals.closeInventoryModal}
        onSubmit={modals.submitInventoryItem}
      />


      <ModalAddProductReference
        open={modals.referenceModal.open}
        product={modals.referenceModal.product}
        loading={saving}
        onCancel={modals.closeReferenceModal}
        onSubmit={modals.submitReference}
      />
    </>
  )
}

export default SellerProductModals