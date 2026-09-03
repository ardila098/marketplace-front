import { Button, Result, Spin, message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { landingPageService } from '../../services/landingPageService'
import { getLandingPaymentMethodLabel } from '../../constants/landingPages'

const PAYMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
}

const LandingPaymentResultPage = () => {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const [lead, setLead] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const attempts = useRef(0)

  const reference = searchParams.get('reference') || ''
  const transactionId =
    searchParams.get('transactionId') ||
    searchParams.get('transaction_id') ||
    searchParams.get('id') ||
    ''

  const loadResult = useCallback(async ({ silent = false } = {}) => {
    if (!reference && !transactionId) {
      setError(new Error('Referencia de pago no disponible'))
      setLoading(false)
      return
    }

    if (!silent) setLoading(true)
    setError(null)

    try {
      const response = await landingPageService.getLandingPaymentResult({
        reference,
        transactionId,
      })
      setLead(response.data)
      return response.data
    } catch (err) {
      if (!silent) {
        setError(err)
        message.error(err?.message || 'No se pudo consultar el pago')
      }
      return null
    } finally {
      if (!silent) setLoading(false)
    }
  }, [reference, transactionId])

  useEffect(() => {
    let timeoutId
    let cancelled = false

    const syncResult = async ({ silent = false } = {}) => {
      const nextLead = await loadResult({ silent })

      if (
        !cancelled &&
        nextLead?.paymentStatus === PAYMENT_STATUS.PENDING &&
        attempts.current < 4
      ) {
        attempts.current += 1
        timeoutId = window.setTimeout(() => syncResult({ silent: true }), 3000)
      }
    }

    attempts.current = 0
    syncResult()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [loadResult])

  if (loading) {
    return (
      <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <Result
          status="warning"
          title="No encontramos el resultado del pago"
          subTitle="Revisa el enlace que Wompi te entregó o vuelve a intentar la compra."
          extra={slug ? <Link to={`/l/${slug}`}><Button>Volver a la landing</Button></Link> : null}
        />
      </div>
    )
  }

  const approved = lead.paymentStatus === PAYMENT_STATUS.APPROVED
  const rejected = [
    PAYMENT_STATUS.REJECTED,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.CANCELLED,
  ].includes(lead.paymentStatus)

  return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <Result
        status={approved ? 'success' : rejected ? 'error' : 'info'}
        title={approved ? 'Pago aprobado' : rejected ? 'Pago no aprobado' : 'Pedido en espera de confirmación'}
        subTitle={
          approved
            ? 'Tu pedido quedó registrado. Te enviaremos la confirmación y los detalles de entrega.'
            : rejected
              ? 'No pudimos confirmar el pago. Puedes intentarlo de nuevo o elegir contra entrega.'
              : 'Estamos confirmando el pago. Esta página se actualizará sola.'
        }
        extra={slug ? <Link to={`/l/${slug}`}><Button type="primary">Volver a la landing</Button></Link> : null}
      />

      {lead.orderNumber ? (
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          Pedido: <strong>{lead.orderNumber}</strong>
          {lead.paymentMethod ? ` · ${getLandingPaymentMethodLabel(lead.paymentMethod)}` : ''}
        </div>
      ) : null}
    </div>
  )
}

export default LandingPaymentResultPage
