import { Avatar, Button, Card, Col, Result, Row, Space, Spin, Tag, Typography } from 'antd'
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import CreditApplicationForm from '../../components/credit/CreditApplicationForm'
import { ROUTES } from '../../constants/routes'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { brokerService } from '../../services/brokerService'
import { PageShell } from '../../styles/layoutStyles'

const Hero = styled.section`
  border: 1px solid #eceff1;
  border-radius: 28px;
  background: linear-gradient(135deg, #f7f8fa 0%, #ffffff 55%, #f3f7f5 100%);
  padding: 34px;
`

const ProfilePhoto = styled(Avatar)`
  box-shadow: 0 20px 46px rgba(17, 17, 17, 0.14);
  border: 6px solid #fff;
`

const Metric = styled.div`
  border: 1px solid #edf0f2;
  border-radius: 16px;
  background: #fff;
  padding: 14px 16px;
`

const SpecialtyCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    height: 100%;
  }
`

const SectionTitle = ({ children, subtitle }) => (
  <div>
    <Typography.Title level={3} style={{ marginBottom: subtitle ? 4 : 0, letterSpacing: 0 }}>
      {children}
    </Typography.Title>
    {subtitle && <Typography.Text type="secondary">{subtitle}</Typography.Text>}
  </div>
)

const BrokerPublicPage = () => {
  const { slug } = useParams()
  const [broker, setBroker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const loadBroker = useCallback(async () => {
    setLoading(true)
    setNotFound(false)

    try {
      const response = await brokerService.publicDetail(slug)
      setBroker(response.data)
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadBroker()
  }, [loadBroker])

  const photoUrl = useMemo(() => (
    getUploadUrl(UPLOAD_ROUTES.brokers.profileImages, broker?.profileImage)
  ), [broker?.profileImage])

  if (loading) {
    return <Spin fullscreen />
  }

  if (notFound || !broker) {
    return (
      <PageShell>
        <Result
          status="404"
          title="Broker no encontrado"
          subTitle="La pagina que buscas no esta disponible."
          extra={<Link to={ROUTES.HOME}><Button>Volver al inicio</Button></Link>}
        />
      </PageShell>
    )
  }

  const specialties = (broker.specialties || []).filter(item => item?.title)
  const services = (broker.services || []).filter(Boolean)

  return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Link to={ROUTES.HOME}>
          <Button icon={<ArrowLeft size={16} />}>Volver</Button>
        </Link>

        <Hero>
          <Row gutter={[28, 28]} align="middle">
            <Col xs={24} md={7} lg={6}>
              <ProfilePhoto
                size={180}
                src={photoUrl}
                icon={<BriefcaseBusiness size={54} />}
                style={{ background: '#111' }}
              />
            </Col>

            <Col xs={24} md={17} lg={11}>
              <Space direction="vertical" size={12}>
                <Space size={8} wrap>
                  <Tag color="default">{broker.title || 'Asesor de credito'}</Tag>
                  {broker.city && (
                    <Tag icon={<MapPin size={13} />}>{broker.city}</Tag>
                  )}
                </Space>

                <Typography.Title level={1} style={{ margin: 0, letterSpacing: 0, fontSize: 42 }}>
                  {broker.displayName}
                </Typography.Title>

                {broker.companyName && (
                  <Typography.Text strong>
                    {broker.companyName}
                  </Typography.Text>
                )}

                <Typography.Paragraph style={{ maxWidth: 680, marginBottom: 0, color: '#4b5563' }}>
                  {broker.summary || 'Te acompano a revisar alternativas de credito y a preparar tu solicitud con informacion clara antes de avanzar con aliados financieros.'}
                </Typography.Paragraph>
              </Space>
            </Col>

            <Col xs={24} lg={7}>
              <Row gutter={[12, 12]}>
                <Col xs={12}>
                  <Metric>
                    <Typography.Title level={3} style={{ margin: 0 }}>
                      {broker.experienceYears || 0}+
                    </Typography.Title>
                    <Typography.Text type="secondary">anos de experiencia</Typography.Text>
                  </Metric>
                </Col>
                <Col xs={12}>
                  <Metric>
                    <Typography.Title level={3} style={{ margin: 0 }}>
                      {broker.completedCases || 0}+
                    </Typography.Title>
                    <Typography.Text type="secondary">casos asesorados</Typography.Text>
                  </Metric>
                </Col>
                <Col xs={24}>
                  <Metric>
                    <Space>
                      <ShieldCheck size={18} />
                      <Typography.Text>Orientacion como asesor, sin promesas de aprobacion.</Typography.Text>
                    </Space>
                  </Metric>
                </Col>
              </Row>
            </Col>
          </Row>
        </Hero>

        {specialties.length > 0 && (
          <Space direction="vertical" size={14} style={{ width: '100%' }}>
            <SectionTitle subtitle="Areas donde puede acompanarte durante el proceso.">
              Especialidades
            </SectionTitle>
            <Row gutter={[16, 16]}>
              {specialties.map(item => (
                <Col xs={24} md={8} key={item.title}>
                  <SpecialtyCard>
                    <Space direction="vertical" size={10}>
                      <BriefcaseBusiness size={20} />
                      <Typography.Title level={4} style={{ margin: 0, letterSpacing: 0 }}>
                        {item.title}
                      </Typography.Title>
                      {item.description && (
                        <Typography.Text type="secondary">
                          {item.description}
                        </Typography.Text>
                      )}
                    </Space>
                  </SpecialtyCard>
                </Col>
              ))}
            </Row>
          </Space>
        )}

        {services.length > 0 && (
          <Card>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8}>
                <SectionTitle subtitle="Un acompanamiento claro antes de tomar decisiones.">
                  Servicios
                </SectionTitle>
              </Col>
              <Col xs={24} md={16}>
                <Row gutter={[12, 12]}>
                  {services.map(service => (
                    <Col xs={24} md={12} key={service}>
                      <Space align="start">
                        <CheckCircle2 size={18} />
                        <Typography.Text>{service}</Typography.Text>
                      </Space>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        )}

        <CreditApplicationForm
          brokerSlug={broker.slug}
          sourceType="broker_landing"
          title="Recibe asesoria personalizada"
          subtitle="El asesor revisara tus datos y te orientara sobre alternativas disponibles. La aprobacion depende del aliado financiero."
        />
      </Space>
    </PageShell>
  )
}

export default BrokerPublicPage
