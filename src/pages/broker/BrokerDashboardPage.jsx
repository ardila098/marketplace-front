import { Card, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  ActionList,
  DashboardHeader,
  DashboardSection,
  MetricGrid,
} from '../../components/dashboard/DashboardBlocks'
import {
  CREDIT_APPLICATION_STATUS_LABELS,
  CREDIT_TYPE_LABELS,
} from '../../constants/creditApplications'
import { ROUTES } from '../../constants/routes'
import { dashboardService } from '../../services/dashboardService'
import { currency } from '../../utils/formatters'

const BrokerDashboardPage = () => {
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
      { key: 'total', title: 'Solicitudes', value: data.applications },
      { key: 'active', title: 'Abiertas', value: data.activeApplications },
      { key: 'new', title: 'Nuevas', value: data.newApplications },
      { key: 'contacted', title: 'Contactadas', value: data.contactedApplications },
      { key: 'approved', title: 'Aprobadas por aliado', value: data.approvedApplications },
      { key: 'lost', title: 'Perdidas', value: data.lostApplications },
    ]
  }, [summary])

  const applicationColumns = [
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
      title: 'Tipo',
      render: (_, application) => CREDIT_TYPE_LABELS[application.creditType] || application.creditType,
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
      title: 'Valor',
      render: (_, application) => currency(application.values?.requestedAmount),
    },
  ]

  const publicUrl = summary?.profile?.publicPath
    ? `${window.location.origin}${summary.profile.publicPath}`
    : '-'

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <DashboardHeader
        title="Operacion broker"
        description="Gestiona clientes interesados, seguimiento de credito y tu landing publica."
      />

      <MetricGrid metrics={metrics} loading={loading} />

      <ActionList actions={summary?.actions || []} loading={loading} />

      <Card title="Landing publica" loading={loading}>
        <Typography.Paragraph type="secondary">
          Comparte este enlace para recibir solicitudes directas.
        </Typography.Paragraph>
        <Typography.Paragraph copyable>{publicUrl}</Typography.Paragraph>
        <Link to={ROUTES.BROKER_PROFILE}>Editar landing</Link>
      </Card>

      <DashboardSection title="Solicitudes recientes">
        <Table
          rowKey="_id"
          columns={applicationColumns}
          dataSource={summary?.recentApplications || []}
          loading={loading}
          pagination={false}
          scroll={{ x: 680 }}
        />
      </DashboardSection>
    </Space>
  )
}

export default BrokerDashboardPage
