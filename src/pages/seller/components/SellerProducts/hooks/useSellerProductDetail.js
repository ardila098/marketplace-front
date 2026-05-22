import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { productService } from '../../../../../services/productService'

export const useSellerProductDetail = productId => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [inventory, setInventory] = useState([])

  const getProductDetail = useCallback(async () => {
    if (!productId) return

    setLoading(true)

    try {
      const response = await productService.getSellerProductDetail(productId)

      setProduct(response.data.product)
      setInventory(response.data.inventory || [])
    } catch (error) {
      message.error(error.message || 'No se pudo cargar el producto')
    } finally {
      setLoading(false)
    }
  }, [productId])

  useEffect(() => {
    getProductDetail()
  }, [getProductDetail])

  return {
    loading,
    product,
    inventory,
    getProductDetail,
  }
}