import { useCallback, useEffect, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

const useItemDetails = id => {
  const [dataItem, setDataitem] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const getCatalogItem = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await catalogService.getCatalogItem(id)
      setDataitem(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getCatalogItem()
  }, [id])

  return {
    getCatalogItem,
    dataItem,
    isLoading,
  }
}

export default useItemDetails
