import { Card, Col, Row, Space, Statistic, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { CREDIT_APPLICATION_STATUS_LABELS } from '../../constants/creditApplications'
import { ROUTES } from '../../constants/routes'
import { brokerService } from '../../services/brokerService'
import { creditApplicationService } from '../../services/creditApplicationService'

const BrokerDashboardPage = () => {
  const [applications, setApplications] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [applicationsResponse, profileResponse] = await Promise.all([
        creditApplicationService.list(),
        brokerService.getMyProfile(),
      ])

      setApplications(applicationsResponse.data || [])
      setProfile(profileResponse.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar el resumen')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const metrics = useMemo(() => {
    const byStatus = applications.reduce((acc, application) => {
      acc[application.status] = (acc[application.status] || 0) + 1
      return acc
    }, {})

    return {
      total: applications.length,
      new: byStatus.new || 0,
      contacted: byStatus.contacted || 0,
      active: applications.filter(item => !['closed', 'lost'].includes(item.status)).length,
    }
  }, [applications])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Resumen broker
        </Typography.Title>
        <Typography.Text type="secondary">
          Gestiona solicitudes de asesoria sin prometer aprobaciones ni manejar desembolsos.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card loading={loading}><Statistic title="Solicitudes" value={metrics.total} /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card loading={loading}><Statistic title={CREDIT_APPLICATION_STATUS_LABELS.new} value={metrics.new} /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card loading={loading}><Statistic title={CREDIT_APPLICATION_STATUS_LABELS.contacted} value={metrics.contacted} /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card loading={loading}><Statistic title="Abiertas" value={metrics.active} /></Card>
        </Col>
      </Row>

      <Card title="Landing publica">
        <Typography.Paragraph type="secondary">
          Comparte tu landing para recibir solicitudes directas de clientes interesados en asesoria.
        </Typography.Paragraph>
        <Typography.Paragraph copyable>
          {profile?.publicPath ? `${window.location.origin}${profile.publicPath}` : '-'}
        </Typography.Paragraph>
        <Link to={ROUTES.BROKER_PROFILE}>Editar landing</Link>
      </Card>
    </Space>
  )
}

export default BrokerDashboardPage
