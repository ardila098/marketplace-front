import { useState } from 'react'

const initialModalData = {
  open: false,
  id: null,
  data: null,
}

const useItemsTableActions = ({ onDelete } = {}) => {
  const [dataItem, setDataItem] = useState(initialModalData)
  const [itemExternalData, setModalExternalData] = useState(initialModalData)


  const handleCreate = () => {
    setDataItem({
      open: true,
      id: null,
      data: null,
    })
  }

  const handleCreateExternal = () => {
    setModalExternalData({
      open: true,
      id: null,
      data: null,
    })
  }

  const handleEdit = data => {
    setDataItem({
      open: true,
      id: data._id || data.id,
      data,
    })
  }

  const handleClose = () => {
    setDataItem(initialModalData)
  }

  const handleDelete = data => {
    onDelete?.(data)
  }

  return {
    dataItem,
    handleCreate,
    handleEdit,
    handleClose,
    handleDelete,
    handleCreateExternal,
    itemExternalData
  }
}

export default useItemsTableActions