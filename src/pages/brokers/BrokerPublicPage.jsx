import { Button, Col, Result, Row, Space, Spin, Tag, Typography } from 'antd'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import CreditApplicationForm from '../../components/credit/CreditApplicationForm'
import { ROUTES } from '../../constants/routes'
import { brokerService } from '../../services/brokerService'
import { PageShell } from '../../styles/layoutStyles'

const Hero = styled.section`
  border-radius: 24px;
  background: #111;
  color: #fff;
  padding: 40px;
`

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

  return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Link to={ROUTES.HOME}>
          <Button icon={<ArrowLeft size={16} />}>Volver</Button>
        </Link>

        <Hero>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={14}>
              <Space direction="vertical" size={14}>
                <Tag color="default">{broker.title || 'Asesor de credito'}</Tag>
                <Typography.Title level={1} style={{ color: '#fff', margin: 0, letterSpacing: 0 }}>
                  {broker.displayName}
                </Typography.Title>
                {broker.companyName && (
                  <Typography.Text style={{ color: 'rgba(255,255,255,.76)' }}>
                    {broker.companyName}
                  </Typography.Text>
                )}
                <Typography.Paragraph style={{ color: 'rgba(255,255,255,.82)', maxWidth: 680 }}>
                  {broker.summary || 'Te acompano para revisar alternativas de credito y conectar tu solicitud con aliados financieros.'}
                </Typography.Paragraph>
              </Space>
            </Col>
            <Col xs={24} lg={10}>
              <Space direction="vertical" size={10}>
                {(broker.services || []).map(service => (
                  <Typography.Text key={service} style={{ color: '#fff' }}>
                    <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    {service}
                  </Typography.Text>
                ))}
              </Space>
            </Col>
          </Row>
        </Hero>

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
