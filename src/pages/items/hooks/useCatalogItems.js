import { useCallback, useEffect, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

const useCatalogItems = () => {
  const [loading, setIsLoading] = useState(false)
  const [dataItems, setDataItems] = useState([])

  const getCatalogItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await catalogService.getCatalog()
      setDataItems(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getCatalogItems()
  }, [getCatalogItems])

  return {
    getCatalogItems,
    loading,
    dataItems,
  }
}

export default useCatalogItems
