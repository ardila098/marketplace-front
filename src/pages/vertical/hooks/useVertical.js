import { useCallback, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

const useVertical = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()

  const getVerticalCatalog = useCallback(async filters => {
    setLoading(true)
    try {
      const newData = await catalogService.getCatalog(filters)
      setData(newData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    getVerticalCatalog,
    data,
    loading,
  }
}

export default useVertical
