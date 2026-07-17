import { useCallback, useEffect, useState } from 'react'
import { storeService } from '../../../services/storeService'

const useStoreProductDetail = (storeSlug, productSlug) => {
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadProduct = useCallback(async () => {
    if (!storeSlug || !productSlug) {
      setProduct(null)
      setRelatedProducts([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await storeService.getProductBySlug(storeSlug, productSlug)
      setProduct(response.data?.product || null)
      setRelatedProducts(response.data?.relatedProducts || [])
    } catch (err) {
      console.error(err)
      setError(err)
      setProduct(null)
      setRelatedProducts([])
    } finally {
      setLoading(false)
    }
  }, [productSlug, storeSlug])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  return {
    product,
    relatedProducts,
    loading,
    error,
    reload: loadProduct,
  }
}

export default useStoreProductDetail
