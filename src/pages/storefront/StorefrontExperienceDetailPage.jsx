import { Col, Descriptions, Empty, Image, Row, Space, Spin, Tag, Typography, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import ExperienceBookingForm from '../../components/experiences/ExperienceBookingForm'
import { getPricingUnitLabel } from '../../constants/experiences'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { experienceService } from '../../services/experienceService'
import { PageShell } from '../../styles/layoutStyles'
import { currency } from '../../utils/formatters'

const Gallery = styled.div`
  display: grid;
  gap: 12px;
`

const MainImage = styled(Image)`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 16px;
  background: #f3f4f6;
`

const ThumbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const InfoPanel = styled.section`
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 16px;
  padding: 22px;
  position: sticky;
  top: 92px;
`

const Price = styled.div`
  color: #111827;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0;
`

const StorefrontExperienceDetailPage = () => {
  const { storeSlug, experienceSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const activeStoreSlug = storeSlug || store?.slug
  const [experience, setExperience] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!activeStoreSlug || !experienceSlug) return

    setLoading(true)

    experienceService.getPublicBySlug(activeStoreSlug, experienceSlug)
      .then(response => setExperience(response.data))
      .catch(error => {
        message.error(error?.message || 'No se pudo cargar la experiencia')
        setExperience(null)
      })
      .finally(() => setLoading(false))
  }, [activeStoreSlug, experienceSlug])

  const images = useMemo(() => experience?.images || [], [experience])
  const details = useMemo(() => ([
    ['Lugar', experience?.locationName],
    ['Ciudad', experience?.city],
    ['Direccion', experience?.address],
    ['Capacidad', experience?.capacityGuests ? `${experience.capacityGuests} personas` : null],
    ['Alcobas', experience?.bedrooms],
    ['Banos', experience?.bathrooms],
    ['Noches minimas', experience?.minNights],
    ['Amenidades', experience?.amenities?.join(', ')],
    ['Reglas', experience?.rules?.join(', ')],
    ['Notas de disponibilidad', experience?.availability?.notes],
  ].filter(([, value]) => value !== undefined && value !== null && value !== '')), [experience])

  if (loading) {
    return <Spin fullscreen />
  }

  if (!experience) {
    return (
      <PageShell>
        <Empty description="Experiencia no encontrada" />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Row gutter={[28, 28]}>
        <Col xs={24} lg={14}>
          <Gallery>
            {images[0] ? (
              <MainImage
                src={getUploadUrl(UPLOAD_ROUTES.experiences.images, images[0])}
                alt={experience.title}
              />
            ) : (
              <div style={{ aspectRatio: '4 / 3', borderRadius: 16, background: '#f3f4f6' }} />
            )}

            {images.length > 1 && (
              <ThumbGrid>
                {images.slice(1, 5).map(image => (
                  <Image
                    key={image}
                    src={getUploadUrl(UPLOAD_ROUTES.experiences.images, image)}
                    alt={experience.title}
                    style={{ aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 12 }}
                  />
                ))}
              </ThumbGrid>
            )}
          </Gallery>
        </Col>

        <Col xs={24} lg={10}>
          <InfoPanel>
            <Space direction="vertical" size={18} style={{ width: '100%' }}>
              <Space wrap>
                {experience.city && <Tag>{experience.city}</Tag>}
                <Tag>{getPricingUnitLabel(experience.pricingUnit)}</Tag>
                {!!experience.capacityGuests && <Tag>{experience.capacityGuests} personas</Tag>}
              </Space>

              <div>
                <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
                  {experience.title}
                </Typography.Title>
                <Price>{currency(experience.price)}</Price>
              </div>

              {experience.description && (
                <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                  {experience.description}
                </Typography.Paragraph>
              )}
            </Space>
          </InfoPanel>
        </Col>

        <Col xs={24}>
          <Descriptions title="Detalles" bordered column={{ xs: 1, md: 2 }}>
            {details.map(([label, value]) => (
              <Descriptions.Item key={label} label={label}>
                {value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>

        <Col xs={24}>
          <ExperienceBookingForm experience={experience} />
        </Col>
      </Row>
    </PageShell>
  )
}

export default StorefrontExperienceDetailPage
