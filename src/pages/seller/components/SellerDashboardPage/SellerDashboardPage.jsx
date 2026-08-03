import { Card, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import StatusTag from '../../../../components/common/StatusTag'
import {
  ActionList,
  DashboardHeader,
  DashboardSection,
  MetricGrid,
} from '../../../../components/dashboard/DashboardBlocks'
import { CREDIT_APPLICATION_STATUS_LABELS } from '../../../../constants/creditApplications'
import { ROUTES, buildRoute } from '../../../../constants/routes'
import { dashboardService } from '../../../../services/dashboardService'
import { currency } from '../../../../utils/formatters'

const SellerDashboardPage = () => {
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
      { key: 'payout', title: 'Ganancia estimada', value: data.payoutMonth, type: 'money' },
      { key: 'orders', title: 'Ordenes por preparar', value: data.pendingOrders },
      { key: 'sent', title: 'Enviadas a plataforma', value: data.sentOrders },
      { key: 'products', title: 'Productos aprobados', value: data.approvedProducts, description: `${data.products || 0} productos totales` },
      { key: 'pendingProducts', title: 'Productos en revision', value: data.pendingProducts },
      { key: 'pendingPayout', title: 'Por liquidar', value: data.pendingPayoutAmount, type: 'money' },
      { key: 'leads', title: 'Leads de credito', value: data.creditLeads },
      { key: 'agencyItems', title: 'Inventario agencia', value: data.agencyItems },
      { key: 'agencyLeads', title: 'Leads agencia', value: data.agencyLeads, description: `${data.newAgencyLeads || 0} nuevos` },
      { key: 'agencyCommission', title: 'Comision potencial', value: data.potentialAgencyCommission, type: 'money' },
    ]
  }, [summary])

  const orderColumns = [
    {
      title: 'Suborden',
      render: (_, storeOrder) => (
        <Link to={buildRoute(ROUTES.ORDER_DETAIL, { id: storeOrder._id })}>
          {storeOrder.storeOrderNumber}
        </Link>
      ),
    },
    {
      title: 'Orden',
      render: (_, storeOrder) => storeOrder.order?.orderNumber || '-',
    },
    {
      title: 'Cliente',
      render: (_, storeOrder) => storeOrder.order?.customer?.name || '-',
    },
    {
      title: 'Estado',
      render: (_, storeOrder) => <StatusTag status={storeOrder.status} />,
    },
    {
      title: 'Liquidacion',
      render: (_, storeOrder) => <StatusTag status={storeOrder.payoutStatus} />,
    },
    {
      title: 'Valor',
      render: (_, storeOrder) => currency(storeOrder.subtotal),
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
      title: 'Estado',
      render: (_, application) => (
        <Tag color={application.status === 'new' ? 'blue' : 'default'}>
          {CREDIT_APPLICATION_STATUS_LABELS[application.status] || application.status}
        </Tag>
      ),
    },
    {
      title: 'Valor solicitado',
      render: (_, application) => currency(application.values?.requestedAmount),
    },
  ]

  const store = summary?.store
  const isMarketplaceVisible = store?.marketplaceEnabled !== false

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <DashboardHeader
        title="Operacion de tienda"
        description="Controla pedidos, productos, configuracion y dinero pendiente sin perderte entre modulos."
      />

      {store && (
        <Card>
          <Space direction="vertical" size={6}>
            <Space wrap>
              <Typography.Title level={4} style={{ margin: 0 }}>{store.name}</Typography.Title>
              <StatusTag status={store.status} />
              <Tag color={isMarketplaceVisible ? 'green' : 'default'}>
                {isMarketplaceVisible ? 'Visible en marketplace' : 'Fuera del marketplace'}
              </Tag>
              <Tag>{store.businessType || 'retail'}</Tag>
            </Space>
            <Typography.Text type="secondary">
              {store.vertical?.name || 'Sin vertical'} · /stores/{store.slug}
            </Typography.Text>
          </Space>
        </Card>
      )}

      <MetricGrid metrics={metrics} loading={loading} />

      <ActionList actions={summary?.actions || []} loading={loading} />

      <DashboardSection title="Ordenes recientes">
        <Table
          rowKey="_id"
          columns={orderColumns}
          dataSource={summary?.recentOrders || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 820 }}
        />
      </DashboardSection>

      <DashboardSection title="Solicitudes recientes">
        <Table
          rowKey="_id"
          columns={leadColumns}
          dataSource={summary?.recentApplications || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 640 }}
        />
      </DashboardSection>
    </Space>
  )
}

export default SellerDashboardPage
