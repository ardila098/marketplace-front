import { Button, Space, Tag } from 'antd'
import { Calendar, MapPin, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getPricingUnitLabel } from '../../constants/experiences'
import { buildRoute, ROUTES } from '../../constants/routes'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { currency } from '../../utils/formatters'

const Card = styled.article`
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 10px 26px rgba(17, 24, 39, 0.06);
`

const ImageLink = styled(Link)`
  display: block;
  aspect-ratio: 4 / 3;
  background: #f3f4f6;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 180ms ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }
`

const Placeholder = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  color: #9ca3af;
  font-size: 32px;
`

const Body = styled.div`
  padding: 16px;
`

const Title = styled.h3`
  color: #111827;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 6px;
`

const Price = styled.div`
  color: #111827;
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0 12px;
`

const Meta = styled.div`
  align-items: center;
  color: #6b7280;
  display: flex;
  gap: 6px;
  font-size: 13px;
`

const ExperienceCard = ({ experience, storeSlug }) => {
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const targetRoute = resolutionMode === 'host'
    ? `/experiences/${experience.slug}`
    : buildRoute(ROUTES.STOREFRONT_EXPERIENCE_DETAIL, {
        storeSlug,
        experienceSlug: experience.slug,
      })
  const image = experience.coverImage || experience.images?.[0]

  return (
    <Card>
      <ImageLink to={targetRoute} aria-label={`Ver ${experience.title}`}>
        {image ? (
          <Image src={getUploadUrl(UPLOAD_ROUTES.experiences.images, image)} alt={experience.title} />
        ) : (
          <Placeholder>{experience.title?.charAt(0) || 'E'}</Placeholder>
        )}
      </ImageLink>

      <Body>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Space wrap size={6}>
            {experience.city && <Tag>{experience.city}</Tag>}
            <Tag>{getPricingUnitLabel(experience.pricingUnit)}</Tag>
          </Space>

          <Title>{experience.title}</Title>

          <Space direction="vertical" size={4}>
            {experience.locationName && (
              <Meta>
                <MapPin size={14} />
                {experience.locationName}
              </Meta>
            )}
            {!!experience.capacityGuests && (
              <Meta>
                <Users size={14} />
                {experience.capacityGuests} personas
              </Meta>
            )}
            {!!experience.minNights && (
              <Meta>
                <Calendar size={14} />
                Desde {experience.minNights} noche{experience.minNights > 1 ? 's' : ''}
              </Meta>
            )}
          </Space>

          <Price>{currency(experience.price)}</Price>

          <Link to={targetRoute}>
            <Button block>Ver disponibilidad</Button>
          </Link>
        </Space>
      </Body>
    </Card>
  )
}

export default ExperienceCard
