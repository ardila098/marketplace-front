import { Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import StatusTag from '../../components/common/StatusTag'
import {
  ActionList,
  DashboardHeader,
  DashboardSection,
  MetricGrid,
} from '../../components/dashboard/DashboardBlocks'
import { CREDIT_APPLICATION_STATUS_LABELS } from '../../constants/creditApplications'
import { ROUTES, buildRoute } from '../../constants/routes'
import { dashboardService } from '../../services/dashboardService'
import { currency } from '../../utils/formatters'

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadSummary = useCallback(async () => {
    setLoading(true)

    try {
      const response = await dashboardService.getSummary()
      setSummary(response.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSummary()
  }, [loadSummary])

  const metrics = useMemo(() => {
    const data = summary?.metrics || {}

    return [
      { key: 'sales', title: 'Ventas del mes', value: data.salesMonth, type: 'money' },
      { key: 'profit', title: 'Ganancia plataforma', value: data.platformProfitMonth, type: 'money' },
      { key: 'stores', title: 'Tiendas', value: data.totalStores, description: `${data.marketplaceStores || 0} en marketplace` },
      { key: 'pendingProducts', title: 'Productos pendientes', value: data.pendingProducts },
      { key: 'orders', title: 'Ordenes esperando tiendas', value: data.waitingOrders },
      { key: 'received', title: 'Por recibir en plataforma', value: data.storeOrdersSentToPlatform },
      { key: 'payouts', title: 'Por liquidar a tiendas', value: summary?.payoutSummary?.pending?.totalAmount, type: 'money' },
      { key: 'credits', title: 'Leads de credito activos', value: data.activeCredits },
    ]
  }, [summary])

  const orderColumns = [
    {
      title: 'Orden',
      render: (_, order) => (
        <Link to={buildRoute(ROUTES.ORDER_DETAIL, { id: order._id })}>
          {order.orderNumber}
        </Link>
      ),
    },
    {
      title: 'Cliente',
      render: (_, order) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{order.customer?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{order.customer?.email || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Pago',
      render: (_, order) => <StatusTag status={order.paymentStatus} />,
    },
    {
      title: 'Envio',
      render: (_, order) => <StatusTag status={order.fulfillmentStatus} />,
    },
    {
      title: 'Total',
      render: (_, order) => currency(order.totalPaid),
    },
  ]

  const leadColumns = [
    {
      title: 'Cliente',
      render: (_, application) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{application.customer?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{application.customer?.phone || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Origen',
      render: (_, application) => application.store?.name || application.broker?.name || 'Plataforma',
    },
    {
      title: 'Estado',
      render: (_, application) => (
        <Tag color={application.status === 'new' ? 'blue' : 'default'}>
          {CREDIT_APPLICATION_STATUS_LABELS[application.status] || application.status}
        </Tag>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <DashboardHeader
        title="Centro operativo"
        description="Una vista rapida de ventas, aprobaciones, ordenes, liquidaciones y leads."
      />

      <MetricGrid metrics={metrics} loading={loading} />

      <ActionList actions={summary?.actions || []} loading={loading} />

      <DashboardSection title="Ordenes recientes">
        <Table
          rowKey="_id"
          columns={orderColumns}
          dataSource={summary?.recentOrders || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 760 }}
        />
      </DashboardSection>

      <DashboardSection title="Leads recientes">
        <Table
          rowKey="_id"
          columns={leadColumns}
          dataSource={summary?.recentApplications || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 620 }}
        />
      </DashboardSection>
    </Space>
  )
}

export default AdminDashboardPage
