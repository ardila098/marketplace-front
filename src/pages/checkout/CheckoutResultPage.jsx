import { Button, Descriptions, Result, Spin, Space, Typography } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import StatusTag from '../../components/common/StatusTag'
import { PAYMENT_STATUS } from '../../constants/orderConstants'
import { ROUTES } from '../../constants/routes'
import { orderService } from '../../services/orderService'
import { currency } from '../../utils/formatters'
import { CheckoutCard, CheckoutContainer } from './styles'

const getResultConfig = paymentStatus => {
  if (paymentStatus === PAYMENT_STATUS.APPROVED.value) {
    return {
      status: 'success',
      title: 'Pago aprobado',
      subtitle: 'Tu compra fue confirmada correctamente.',
    }
  }

  if (
    [
      PAYMENT_STATUS.REJECTED.value,
      PAYMENT_STATUS.FAILED.value,
      PAYMENT_STATUS.CANCELLED.value,
    ].includes(paymentStatus)
  ) {
    return {
      status: 'error',
      title: 'Pago no aprobado',
      subtitle: 'No pudimos confirmar el pago de esta orden.',
    }
  }

  return {
    status: 'info',
    title: 'Orden creada',
    subtitle: 'El pago está pendiente de confirmación.',
  }
}

const CheckoutResultPage = () => {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const pollingAttempts = useRef(0)
  const reference = searchParams.get('reference') || sessionStorage.getItem('lastCheckoutReference')
  const transactionId =
    searchParams.get('transactionId') ||
    searchParams.get('transaction_id') ||
    searchParams.get('id')

  const loadResult = useCallback(async ({ silent = false } = {}) => {
    if (!reference && !transactionId) {
      setOrder(null)
      setError(new Error('Referencia de pago no disponible'))
      setLoading(false)
      return null
    }

    if (!silent) {
      setLoading(true)
    }

    setError(null)

    try {
      const response = await orderService.getPaymentResult({
        reference,
        transactionId,
      })

      const nextOrder = response.data

      setOrder(nextOrder)

      return nextOrder
    } catch (err) {
      setError(err)
      setOrder(null)

      return null
    } finally {
      if (!silent) {
        setLoading(false)
      }
    }
  }, [reference, transactionId])

  useEffect(() => {
    let timeoutId
    let cancelled = false

    const syncResult = async ({ silent = false } = {}) => {
      const nextOrder = await loadResult({ silent })

      if (
        !cancelled &&
        nextOrder?.paymentStatus === PAYMENT_STATUS.PENDING.value &&
        pollingAttempts.current < 4
      ) {
        pollingAttempts.current += 1
        timeoutId = window.setTimeout(() => syncResult({ silent: true }), 3000)
      }
    }

    pollingAttempts.current = 0
    syncResult()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [loadResult])

  const resultConfig = useMemo(
    () => getResultConfig(order?.paymentStatus),
    [order?.paymentStatus]
  )

  if (loading) {
    return (
      <CheckoutContainer>
        <CheckoutCard>
          <Spin />
        </CheckoutCard>
      </CheckoutContainer>
    )
  }

  if (error || !order) {
    return (
      <CheckoutContainer>
        <CheckoutCard>
          <Result
            status="warning"
            title="No encontramos el resultado del pago"
            subTitle="Puedes consultar tu orden con el número de pedido y correo de compra."
            extra={[
              <Link key="lookup" to={ROUTES.ORDER_LOOKUP}>
                <Button type="primary">Consultar orden</Button>
              </Link>,
              <Link key="home" to={ROUTES.HOME}>
                <Button>Volver al marketplace</Button>
              </Link>,
            ]}
          />
        </CheckoutCard>
      </CheckoutContainer>
    )
  }

  return (
    <CheckoutContainer>
      <CheckoutCard>
        <Result
          status={resultConfig.status}
          title={resultConfig.title}
          subTitle={resultConfig.subtitle}
          extra={[
            <Link key="lookup" to={ROUTES.ORDER_LOOKUP}>
              <Button type="primary">Consultar orden</Button>
            </Link>,
            <Link key="home" to={ROUTES.HOME}>
              <Button>Continuar comprando</Button>
            </Link>,
          ]}
        />

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Resumen de la orden
          </Typography.Title>

          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Orden">{order.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Referencia">{order.paymentReference}</Descriptions.Item>
            <Descriptions.Item label="Total">{currency(order.totalPaid)}</Descriptions.Item>
            <Descriptions.Item label="Pago">
              <StatusTag status={order.paymentStatus} />
            </Descriptions.Item>
            <Descriptions.Item label="Orden">
              <StatusTag status={order.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Envío">
              <StatusTag status={order.fulfillmentStatus} />
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </CheckoutCard>
    </CheckoutContainer>
  )
}

export default CheckoutResultPage
