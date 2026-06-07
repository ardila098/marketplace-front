import { useState, useCallback } from 'react'
import { catalogService } from '../services/catalogService'

const useCatalog = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getVerticalCatalog = useCallback(async filters => {
    try {
      setLoading(true)
      setError(null)
      const response = await catalogService.getCatalog(filters)
      setData(response.data || [])
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    loading,
    error,
    getVerticalCatalog,
  }
}

export default useCatalog
