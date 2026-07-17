import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { storeService } from '../../../services/storeService'

const EMPTY_FILTERS = {}

const useStoreProducts = (storeSlug, filters = EMPTY_FILTERS) => {
  const filtersKey = JSON.stringify(filters || EMPTY_FILTERS)
  const stableFilters = useMemo(() => JSON.parse(filtersKey), [filtersKey])
  const requestIdRef = useRef(0)
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 24,
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    if (!storeSlug) {
      setProducts([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await storeService.getProducts(storeSlug, stableFilters)

      if (requestIdRef.current !== requestId) return

      setProducts(response.data || [])
      setPagination({
        page: response.page || stableFilters.page || 1,
        pageSize: response.pageSize || stableFilters.pageSize || 24,
        total: response.total || 0,
      })
    } catch (err) {
      if (requestIdRef.current !== requestId) return

      console.error(err)
      setError(err)
      setProducts([])
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false)
      }
    }
  }, [stableFilters, storeSlug])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    pagination,
    loading,
    error,
    reload: loadProducts,
  }
}

export default useStoreProducts
