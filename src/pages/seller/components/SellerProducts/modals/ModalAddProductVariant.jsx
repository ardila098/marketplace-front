import { Modal } from 'antd'
import FormProductVariant from '../forms/FormProductVariant '

const ModalAddProductVariant = ({
  open,
  product,
  loading = false,
  onCancel,
  onSubmit,
}) => {
  const handleSubmit = values => {
    onSubmit?.({
      productId: product?._id || product?.id,
      payload: values,
    })
  }

  return (
    <Modal
      title={`Agregar variante${product?.name ? ` - ${product.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <FormProductVariant
        loading={loading}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default ModalAddProductVariant