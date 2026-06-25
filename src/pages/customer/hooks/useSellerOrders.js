import { useCallback, useEffect, useState } from 'react'
import { orderService } from '../../../services/orderService'

const useSellerOrders = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getSellerOrders = useCallback(async filters => {
    try {
      setLoading(true)
      const response = await orderService.sellerOrders(filters)
      setData(response?.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getSellerOrders()
  }, [])

  return {
    data,
    loading,
    getSellerOrders,
  }
}

export default useSellerOrders
