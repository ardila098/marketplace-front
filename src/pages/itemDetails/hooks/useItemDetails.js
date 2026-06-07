import { useCallback, useEffect, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

const useItemDetails = id => {
  const [dataItem, setDataitem] = useState()

  const getCatalogItem = useCallback(async () => {
    try {
      const data = await catalogService.getCatalogItem(id)
      console.log(data)
      setDataitem(data)
    } catch (error) {
      console.error(error)
    }
  }, [id])

  useEffect(() => {
    getCatalogItem()
  }, [id])

  return {
    getCatalogItem,
    dataItem,
  }
}

export default useItemDetails
