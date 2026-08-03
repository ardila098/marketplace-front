import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { MapPin } from 'lucide-react'
import { Button, Space, Tag } from 'antd'
import { getAgencyKindLabel, getAgencyStatusColor, getAgencyStatusLabel } from '../../constants/agencyItems'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
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

const Location = styled.div`
  align-items: center;
  color: #6b7280;
  display: flex;
  gap: 6px;
  font-size: 13px;
`

const Specs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0 16px;
`

const AgencyItemCard = ({ item, storeSlug }) => {
  const resolutionMode = useSelector(state => state.storefront.resolutionMode)
  const targetRoute = resolutionMode === 'host'
    ? `/agency-items/${item.slug}`
    : buildRoute(ROUTES.STOREFRONT_AGENCY_ITEM_DETAIL, {
        storeSlug,
        itemSlug: item.slug,
      })
  const image = item.coverImage || item.images?.[0]

  return (
    <Card>
      <ImageLink to={targetRoute} aria-label={`Ver ${item.title}`}>
        {image ? (
          <Image src={getUploadUrl(UPLOAD_ROUTES.agencyItems.images, image)} alt={item.title} />
        ) : (
          <Placeholder>{item.title?.charAt(0) || 'A'}</Placeholder>
        )}
      </ImageLink>

      <Body>
        <Space direction="vertical" size={2} style={{ width: '100%' }}>
          <Space wrap size={6}>
            <Tag>{getAgencyKindLabel(item.kind)}</Tag>
            {item.status && (
              <Tag color={getAgencyStatusColor(item.status)}>{getAgencyStatusLabel(item.status)}</Tag>
            )}
          </Space>
          <Title>{item.title}</Title>
          {item.city && (
            <Location>
              <MapPin size={14} />
              {item.city}
            </Location>
          )}
        </Space>

        <Price>{currency(item.price)}</Price>

        {!!item.specs?.length && (
          <Specs>
            {item.specs.slice(0, 4).map((spec, index) => (
              <Tag key={`${spec}-${index}`}>{spec}</Tag>
            ))}
          </Specs>
        )}

        <Link to={targetRoute}>
          <Button block>Ver detalle</Button>
        </Link>
      </Body>
    </Card>
  )
}

export default AgencyItemCard
