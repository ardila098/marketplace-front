import { useState } from 'react'

const initialModalData = {
  open: false,
  id: null,
  data: null,
}

const useProductsActions = ({ onDelete } = {}) => {
  const [modalData, setModalData] = useState(initialModalData)

  const handleCreate = () => {
    setModalData({
      open: true,
      id: null,
      data: null,
    })
  }

  const handleEdit = data => {
    setModalData({
      open: true,
      id: data._id || data.id,
      data,
    })
  }

  const handleClose = () => {
    setModalData(initialModalData)
  }

  const handleDelete = data => {
    onDelete?.(data)
  }

  return {
    modalData,
    handleCreate,
    handleEdit,
    handleClose,
    handleDelete,
  }
}

export default useProductsActions