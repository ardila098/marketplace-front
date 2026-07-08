import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { orderService } from '../../../services/orderService'
import { useTableData } from '../../../hooks/useTableData'

const useOrders = orderId => {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState()
  const { tableData, setTableData } = useTableData({
    data: [],
    page: 1,
    pageSize: 10,
    search: '',
  })


  const getOrders = useCallback(async (search = '', page = 1, pageSize = 20) => {
    setLoading(true)
    const params = {
      search,
      page,
      pageSize,
    }
    try {
      const data = await orderService.getOrders(params)
      setTableData({
        data: data.data,
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getOrder = useCallback(async () => {
    try {
      const response = await orderService.getOrderById(orderId)
      setOrder(response?.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar la orden')
    }
  }, [orderId])

  useEffect(() => {
    getOrders({
      search: tableData.search,
      page: tableData.page,
      pageSize: tableData.pageSize,
    })
  }, [])

  useEffect(() => {
    getOrder()
  }, [orderId])

  return {
    getOrders,
    tableData,
    loading,
    getOrder,
    order,
  }
}

export default useOrders
