import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'

import { orderService } from '../../../services/orderService'
import { useTableData } from '../../../hooks/useTableData'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const useOrders = orderId => {
  const { translate } = useDictionaryTranslation()
  const [loading, setLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [order, setOrder] = useState()
  const { tableData, setTableData } = useTableData({
    data: [],
    page: 1,
    pageSize: 10,
    search: '',
  })

  const getOrders = useCallback(async ({ search = '', page = 1, pageSize = 10 } = {}) => {
    setLoading(true)

    try {
      const response = await orderService.getOrders({ search, page, pageSize })
      const rows = response.data || []

      setTableData({
        data: rows,
        page: response.page || page,
        pageSize: response.pageSize || pageSize,
        total: response.total || rows.length,
      })
    } catch (error) {
      message.error(error?.message || translate('orders.messages.loadError'))
    } finally {
      setLoading(false)
    }
  }, [setTableData, translate])

  const getOrder = useCallback(async () => {
    if (!orderId) return null

    setDetailLoading(true)

    try {
      const response = await orderService.getOrderById(orderId)
      setOrder(response?.data)
      return response?.data
    } catch (error) {
      message.error(error?.message || translate('orders.messages.detailError'))
      return null
    } finally {
      setDetailLoading(false)
    }
  }, [orderId, translate])

  const runStoreOrderAction = useCallback(async ({ id, request, successMessage }) => {
    setActionLoadingId(id)

    try {
      const response = await request(id)
      message.success(successMessage)
      return response?.data
    } catch (error) {
      message.error(error?.message || translate('orders.messages.statusError'))
      return null
    } finally {
      setActionLoadingId(null)
    }
  }, [translate])

  const markStoreOrderSent = useCallback(id => {
    return runStoreOrderAction({
      id,
      request: orderService.markStoreOrderSentToPlatform,
      successMessage: translate('orders.messages.sentToPlatform'),
    })
  }, [runStoreOrderAction, translate])

  const markStoreOrderReceived = useCallback(id => {
    return runStoreOrderAction({
      id,
      request: orderService.markStoreOrderReceivedByPlatform,
      successMessage: translate('orders.messages.receivedByPlatform'),
    })
  }, [runStoreOrderAction, translate])

  useEffect(() => {
    if (orderId) return

    getOrders({
      search: tableData.search,
      page: tableData.page,
      pageSize: tableData.pageSize,
    })
  }, [getOrders, orderId, tableData.page, tableData.pageSize, tableData.search])

  useEffect(() => {
    getOrder()
  }, [getOrder])

  return {
    getOrders,
    tableData,
    loading,
    detailLoading,
    actionLoadingId,
    getOrder,
    order,
    markStoreOrderSent,
    markStoreOrderReceived,
  }
}

export default useOrders
