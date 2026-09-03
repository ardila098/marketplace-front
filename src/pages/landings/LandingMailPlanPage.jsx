import { Card, Col, Descriptions, Empty, Row, Spin, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import {
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  Toolbar,
} from '../../styles/dashboardStyles'
import { landingSubscriptionService } from '../../services/landingSubscriptionService'

const STATUS_META = Object.freeze({
  active: { label: 'Activa', color: 'green' },
  past_due: { label: 'Pago vencido', color: 'gold' },
  cancelled: { label: 'Cancelada', color: 'red' },
  expired: { label: 'Expirada', color: 'default' },
})

const formatDate = value => {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeZone: 'America/Bogota',
  }).format(new Date(value))
}

const isActive = subscription => {
  if (!subscription) return false
  if (subscription.status !== 'active') return false
  if (subscription.endsAt && new Date(subscription.endsAt).getTime() < Date.now()) return false
  return true
}

const LandingMailPlanPage = () => {
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await landingSubscriptionService.getMine()
      setSubscription(response.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar tu plan de correo')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const active = isActive(subscription)
  const effectiveStatus =
    subscription?.status === 'active' &&
    subscription?.endsAt &&
    new Date(subscription.endsAt).getTime() <= Date.now()
      ? 'expired'
      : subscription?.status
  const meta = STATUS_META[effectiveStatus] || { label: effectiveStatus, color: 'default' }

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Plan de correo</PageTitle>
          <PageDescription>
            Las notificaciones por correo de tus landings (confirmaciones y solicitudes) se envían mientras tu plan esté activo.
          </PageDescription>
        </PageIntro>
      </Toolbar>

      <Spin spinning={loading}>
        {subscription ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title={
                  <SpaceWrap>
                    <span>Plan {subscription.billingPeriod === 'yearly' ? 'anual' : 'mensual'}</span>
                    <Tag color={active ? 'green' : meta.color}>{active ? 'Activa' : meta.label}</Tag>
                  </SpaceWrap>
                }
              >
                <Descriptions bordered column={1} size="middle">
                  <Descriptions.Item label="Estado">
                    <Tag color={active ? 'green' : meta.color}>{active ? 'Activa' : meta.label}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Periodo">
                    {subscription.billingPeriod === 'yearly' ? 'Anual' : 'Mensual'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Precio">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0,
                    }).format(subscription.price || 0)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Inicio">{formatDate(subscription.startsAt)}</Descriptions.Item>
                  <Descriptions.Item label="Vence">{formatDate(subscription.endsAt)}</Descriptions.Item>
                  {subscription.notes ? (
                    <Descriptions.Item label="Nota">{subscription.notes}</Descriptions.Item>
                  ) : null}
                </Descriptions>

                <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
                  Si tu plan vence o se cancela, tus landings siguen publicadas, pero Cooqys no enviará correos de confirmación ni notificaciones de solicitudes.
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        ) : (
          <Card>
            <Empty description="Aún no tienes un plan de correo activo">
              <Typography.Text type="secondary">
                Contacta al equipo de Cooqys para activar el plan mensual o anual y poder enviar notificaciones desde tus landings.
              </Typography.Text>
            </Empty>
          </Card>
        )}
      </Spin>
    </PageStack>
  )
}

const SpaceWrap = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
    {children}
  </div>
)

export default LandingMailPlanPage
