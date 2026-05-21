import PropTypes from 'prop-types'
import { useState } from 'react'

const initialModalData = {
  open: false,
  data: null,
}

const useItemsTableActions = ({ onDelete, onGetItem }) => {
  const [dataItem, setDataItem] = useState(initialModalData)
  const [itemExternalData, setModalExternalData] = useState(initialModalData)


  const handleCreate = () => {
    setDataItem({
      open: true,
      data:null
    })
  }

  const handleCreateExternal = () => {
    setModalExternalData({
      open: true,
    })
  }

  const handleEdit = async (id) => {
    const data = await onGetItem(id)
    setDataItem({
      open: true,
      data
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

useItemsTableActions.propTypes = {
  onDelete: PropTypes.func,
  onGetItem: PropTypes.func,

}