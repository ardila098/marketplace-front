import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { orderService } from '../../../../../services/orderService'


export const useSellerOrderDetail = orderId => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dispatching, setDispatching] = useState(false)

  const getOrder = useCallback(async () => {
    setLoading(true)

    try {
      const response = await orderService.getSellerOrderById(orderId)

      setOrder(response?.data?.data || response?.data || response || null)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar la orden')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  const dispatchOrder = async () => {
    setDispatching(true)

    try {
      const response = await orderService.dispatchSellerOrder(orderId)

      setOrder(response?.data?.data || response?.data || response || null)
      message.success('Orden marcada como despachada')
    } catch (error) {
      message.error(error?.message || 'No se pudo despachar la orden')
    } finally {
      setDispatching(false)
    }
  }

  useEffect(() => {
    if (orderId) getOrder()
  }, [orderId, getOrder])

  return {
    order,
    loading,
    dispatching,
    dispatchOrder,
  }
}