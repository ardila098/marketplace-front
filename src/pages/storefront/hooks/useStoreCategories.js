import { useCallback, useEffect, useState } from 'react'
import { storeService } from '../../../services/storeService'

const useStoreCategories = storeSlug => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const loadCategories = useCallback(async () => {
    if (!storeSlug) {
      setCategories([])
      return
    }

    setLoading(true)

    try {
      const response = await storeService.getCategories(storeSlug)
      setCategories(response.data || [])
    } catch (error) {
      console.error(error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [storeSlug])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    loading,
    reload: loadCategories,
  }
}

export default useStoreCategories
