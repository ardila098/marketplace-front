import { Modal } from 'antd'
import FormProductVariant from '../forms/FormProductVariant '

const ModalAddProductVariant = ({
  open,
  product,
  variant,
  loading = false,
  onCancel,
  onSubmit,
}) => {
  const isEditing = Boolean(variant?._id)

  const handleSubmit = values => {
    onSubmit?.({
      productId: product?._id || product?.id,
      variantId: variant?._id,
      payload: values,
    })
  }

  const initialValues = variant
    ? {
      price: variant.price || 0,
      compareAtPrice: variant.compareAtPrice || 0,
      stock: variant.stock || 0,
      lowStockThreshold: variant.lowStockThreshold || 0,
      images: variant.images || [],
      attributes: variant.attributes?.length ? variant.attributes : [],
      variantReference: variant.variantReference || '',
      isActive: variant.isActive !== false,
    }
    : undefined

  return (
    <Modal
      title={`${isEditing ? 'Editar' : 'Agregar'} variante${product?.name ? ` - ${product.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <FormProductVariant
        loading={loading}
        initialValues={initialValues}
        stockLabel={isEditing ? 'Stock actual' : 'Stock inicial'}
        submitLabel={isEditing ? 'Guardar cambios' : 'Guardar variante'}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default ModalAddProductVariant
