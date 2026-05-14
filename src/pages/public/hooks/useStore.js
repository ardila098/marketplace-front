import { useCallback, useEffect, useState } from 'react'
import { storeService } from '../../../services/storeService'

const useStore = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getStores = useCallback(async () => {
    try {
      setLoading(true)
      const response = await storeService.list()
      setData(response?.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getStores()
  }, [getStores])

  return {
    data,
    loading,
    getStores
  }
}

export default useStore