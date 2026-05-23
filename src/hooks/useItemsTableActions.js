import PropTypes from 'prop-types'
import { useState } from 'react'

const initialModalData = {
  open: false,
  data: null,
}

const useItemsTableActions = ({ onDelete, onGetItem }) => {
  const [dataItem, setDataItem] = useState(initialModalData)
  const [itemExternalData, setItemExternalData] = useState(initialModalData)


  const handleCreate = () => {
    setDataItem({
      open: true,
      data: null
    })
  }

  const handleCreateExternal = async (id) => {
    const data = await onGetItem(id)
    setItemExternalData({
      open: true,
      data
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

  const handleCloseExternal = () => {
    setItemExternalData(initialModalData)
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
    itemExternalData,
    handleCloseExternal
  }
}

export default useItemsTableActions

useItemsTableActions.propTypes = {
  onDelete: PropTypes.func,
  onGetItem: PropTypes.func,

}