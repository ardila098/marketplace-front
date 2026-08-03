import { Space, Table, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { advisorService } from '../../services/advisorService'
import { currency } from '../../utils/formatters'

const formatDate = value => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const AdvisorPayoutsPage = () => {
  const [pending, setPending] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [pendingResponse, payoutsResponse] = await Promise.all([
        advisorService.getPending(),
        advisorService.getPayouts(),
      ])

      setPending(pendingResponse.data || [])
      setPayouts(payoutsResponse.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las comisiones')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const pendingColumns = [
    {
      title: 'Suborden',
      render: (_, item) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{item.storeOrderNumber}</Typography.Text>
          <Typography.Text type="secondary">Orden {item.orderNumber}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Negocio',
      dataIndex: 'storeName',
    },
    {
      title: 'Comision plataforma',
      render: (_, item) => currency(item.platformCommissionAmount),
    },
    {
      title: '% asesor',
      render: (_, item) => `${item.commissionRate || 0}%`,
    },
    {
      title: 'Comision asesor',
      render: (_, item) => (
        <Typography.Text strong>{currency(item.advisorCommissionAmount)}</Typography.Text>
      ),
    },
  ]

  const payoutColumns = [
    {
      title: 'Liquidacion',
      render: (_, payout) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{payout.payoutNumber}</Typography.Text>
          <Typography.Text type="secondary">{formatDate(payout.createdAt)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Estado',
      render: (_, payout) => <StatusTag status={payout.status} />,
    },
    {
      title: 'Items',
      render: (_, payout) => payout.items?.length || 0,
    },
    {
      title: 'Valor',
      render: (_, payout) => (
        <Typography.Text strong>{currency(payout.totalAmount)}</Typography.Text>
      ),
    },
    {
      title: 'Pagado',
      render: (_, payout) => formatDate(payout.paidAt),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Comisiones
        </Typography.Title>
        <Typography.Text type="secondary">
          Revisa lo pendiente por liquidar y el historial de pagos de la plataforma.
        </Typography.Text>
      </div>

      <Table
        title={() => 'Pendientes por liquidar'}
        rowKey={record => String(record.storeOrder)}
        columns={pendingColumns}
        dataSource={pending}
        loading={loading}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 820 }}
      />

      <Table
        title={() => 'Historial de liquidaciones'}
        rowKey="_id"
        columns={payoutColumns}
        dataSource={payouts}
        loading={loading}
        scroll={{ x: 760 }}
      />
    </Space>
  )
}

export default AdvisorPayoutsPage
