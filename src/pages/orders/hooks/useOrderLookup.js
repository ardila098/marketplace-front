import { message } from 'antd'
import { useState } from 'react'

import { orderService } from '../../../services/orderService'

const getOrderFromResponse = response => {
  return response?.data?.data || response?.data || response || null
}

export const useOrderLookup = () => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchOrder = async values => {
    setLoading(true)

    try {
      const response = await orderService.lookupOrder(values)
      const foundOrder = getOrderFromResponse(response)

      setOrder(foundOrder)
      message.success('Orden encontrada')
    } catch (error) {
      setOrder(null)
      message.error(error?.message || 'No se pudo consultar la orden')
    } finally {
      setLoading(false)
    }
  }

  return {
    order,
    loading,
    searchOrder,
  }
}
