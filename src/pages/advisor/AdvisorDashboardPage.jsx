import { Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  ActionList,
  DashboardHeader,
  DashboardSection,
  MetricGrid,
} from '../../components/dashboard/DashboardBlocks'
import { dashboardService } from '../../services/dashboardService'
import { currency } from '../../utils/formatters'

const AdvisorDashboardPage = () => {
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
      { key: 'stores', title: 'Negocios asociados', value: data.assignedStores },
      { key: 'pending', title: 'Pendiente', value: data.pendingAmount, type: 'money' },
      { key: 'processing', title: 'En proceso', value: data.processingAmount, type: 'money' },
      { key: 'paid', title: 'Pagado', value: data.paidAmount, type: 'money' },
      { key: 'outstanding', title: 'Total por recibir', value: data.outstandingAmount, type: 'money' },
      { key: 'outside', title: 'Fuera de marketplace', value: data.storesOutsideMarketplace },
    ]
  }, [summary])

  const storeColumns = [
    {
      title: 'Negocio',
      render: (_, store) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{store.name}</Typography.Text>
          <Typography.Text type="secondary">/stores/{store.slug}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Seller',
      render: (_, store) => store.owner?.name || '-',
    },
    {
      title: 'Marketplace',
      render: (_, store) => (
        <Tag color={store.marketplaceEnabled === false ? 'default' : 'green'}>
          {store.marketplaceEnabled === false ? 'No visible' : 'Visible'}
        </Tag>
      ),
    },
    {
      title: 'Pendiente',
      render: (_, store) => currency(store.metrics?.pendingAmount),
    },
  ]

  const commissionColumns = [
    {
      title: 'Suborden',
      dataIndex: 'storeOrderNumber',
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
      title: 'Comision asesor',
      render: (_, item) => (
        <Typography.Text strong>{currency(item.advisorCommissionAmount)}</Typography.Text>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <DashboardHeader
        title="Operacion asesor"
        description="Controla negocios conseguidos, comisiones pendientes y pagos de la plataforma."
      />

      <MetricGrid metrics={metrics} loading={loading} />

      <ActionList actions={summary?.actions || []} loading={loading} />

      <DashboardSection title="Negocios recientes">
        <Table
          rowKey="_id"
          columns={storeColumns}
          dataSource={summary?.stores || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 760 }}
        />
      </DashboardSection>

      <DashboardSection title="Comisiones pendientes">
        <Table
          rowKey={record => String(record.storeOrder)}
          columns={commissionColumns}
          dataSource={summary?.pendingCommissions || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 760 }}
        />
      </DashboardSection>
    </Space>
  )
}

export default AdvisorDashboardPage
