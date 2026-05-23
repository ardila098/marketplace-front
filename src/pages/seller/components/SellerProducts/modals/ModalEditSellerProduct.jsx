import { Modal } from 'antd'
import PropTypes from 'prop-types'
import FormEditSellerProduct from '../forms/productTypeForms.js/FormEditSellerProduct'

const ModalEditSellerProduct = ({ open, loading, data, onSubmit, onCancel, }) => {

  const handleSubmitProduct = async payload => {
    const success = await onSubmit({
      id: data?._id,
      payload,
    })

    if (success) {
      onCancel()
    }
  }

  return (
    <Modal
      title={data?._id ? 'editProduct' : 'createProduct'}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      width={760}
    >
      <FormEditSellerProduct
        loading={loading}
        data={data}
        onSubmit={handleSubmitProduct}
        onCancel={onCancel}
      />
    </Modal>
  )
}

export default ModalEditSellerProduct


ModalEditSellerProduct.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}