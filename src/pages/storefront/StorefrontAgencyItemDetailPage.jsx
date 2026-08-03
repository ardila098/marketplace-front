import { Button, Col, Descriptions, Empty, Image, Row, Space, Spin, Tag, Typography, message } from 'antd'
import { MessageCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AgencyLeadForm from '../../components/agency/AgencyLeadForm'
import CreditApplicationForm from '../../components/credit/CreditApplicationForm'
import { AGENCY_ITEM_KINDS, getAgencyKindLabel, getAgencyStatusColor, getAgencyStatusLabel } from '../../constants/agencyItems'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { agencyItemService } from '../../services/agencyItemService'
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

const getDetails = item => {
  if (item.kind === AGENCY_ITEM_KINDS.PROPERTY.value) {
    return [
      ['Tipo', item.property?.propertyType],
      ['Operacion', item.property?.operationType],
      ['Area', item.property?.areaM2 ? `${item.property.areaM2} m2` : null],
      ['Area construida', item.property?.builtAreaM2 ? `${item.property.builtAreaM2} m2` : null],
      ['Alcobas', item.property?.bedrooms],
      ['Banos', item.property?.bathrooms],
      ['Parqueaderos', item.property?.parkingSpaces],
      ['Administracion', item.property?.administrationFee ? currency(item.property.administrationFee) : null],
      ['Estrato', item.property?.stratum],
      ['Piso', item.property?.floor],
      ['Amoblado', item.property?.furnished ? 'Si' : null],
      ['Zona', item.property?.zone],
      ['Barrio', item.property?.neighborhood],
      ['Direccion', item.property?.address],
      ['Disponible desde', item.property?.availableFrom ? new Date(item.property.availableFrom).toLocaleDateString('es-CO') : null],
    ]
  }

  return [
    ['Marca', item.vehicle?.brand],
    ['Modelo', item.vehicle?.model],
    ['Version', item.vehicle?.version],
    ['Ano', item.vehicle?.year],
    ['Kilometraje', item.vehicle?.mileageKm ? `${item.vehicle.mileageKm.toLocaleString('es-CO')} km` : null],
    ['Transmision', item.vehicle?.transmission],
    ['Combustible', item.vehicle?.fuelType],
    ['Carroceria', item.vehicle?.bodyType],
    ['Cilindraje', item.vehicle?.engineCc ? `${item.vehicle.engineCc} cc` : null],
    ['Color', item.vehicle?.color],
    ['Estado', item.vehicle?.condition],
    ['Placa termina en', item.vehicle?.plateEnding],
    ['Propietario', item.vehicle?.ownerType],
    ['Recibe permuta', item.vehicle?.acceptsTradeIn ? 'Si' : null],
    ['Financiacion disponible', item.vehicle?.financingAvailable ? 'Si' : null],
    ['SOAT vence', item.vehicle?.soatExpiresAt ? new Date(item.vehicle.soatExpiresAt).toLocaleDateString('es-CO') : null],
    ['Tecnomecanica vence', item.vehicle?.technicalReviewExpiresAt ? new Date(item.vehicle.technicalReviewExpiresAt).toLocaleDateString('es-CO') : null],
  ]
}

const cleanPhone = phone => String(phone || '').replace(/[^\d+]/g, '')

const StorefrontAgencyItemDetailPage = () => {
  const { storeSlug, itemSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const activeStoreSlug = storeSlug || store?.slug
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!activeStoreSlug || !itemSlug) return

    setLoading(true)

    agencyItemService.getPublicBySlug(activeStoreSlug, itemSlug)
      .then(response => setItem(response.data))
      .catch(error => {
        message.error(error?.message || 'No se pudo cargar el item')
        setItem(null)
      })
      .finally(() => setLoading(false))
  }, [activeStoreSlug, itemSlug])

  const images = useMemo(() => item?.images || [], [item])
  const details = useMemo(() => getDetails(item || {}).filter(([, value]) => value !== undefined && value !== null && value !== ''), [item])
  const contact = item?.store?.settings?.contact || store?.settings?.contact || {}
  const phone = item?.contactPhone || contact.whatsapp || contact.phone
  const whatsappUrl = phone
    ? `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(`Hola, quiero informacion sobre ${item?.title || 'este item'}`)}`
    : ''

  if (loading) {
    return <Spin fullscreen />
  }

  if (!item) {
    return (
      <PageShell>
        <Empty description="Item no encontrado" />
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
                src={getUploadUrl(UPLOAD_ROUTES.agencyItems.images, images[0])}
                alt={item.title}
              />
            ) : (
              <div style={{ aspectRatio: '4 / 3', borderRadius: 16, background: '#f3f4f6' }} />
            )}

            {images.length > 1 && (
              <ThumbGrid>
                {images.slice(1, 5).map(image => (
                  <Image
                    key={image}
                    src={getUploadUrl(UPLOAD_ROUTES.agencyItems.images, image)}
                    alt={item.title}
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
                <Tag>{getAgencyKindLabel(item.kind)}</Tag>
                <Tag color={getAgencyStatusColor(item.status)}>{getAgencyStatusLabel(item.status)}</Tag>
                {item.city && <Tag>{item.city}</Tag>}
                {item.referenceCode && <Tag>Ref. {item.referenceCode}</Tag>}
              </Space>

              <div>
                <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
                  {item.title}
                </Typography.Title>
                <Price>{currency(item.price)}</Price>
              </div>

              {item.description && (
                <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                  {item.description}
                </Typography.Paragraph>
              )}

              {item.availabilityNotes && (
                <Typography.Paragraph style={{ margin: 0 }}>
                  {item.availabilityNotes}
                </Typography.Paragraph>
              )}

              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <Button type="primary" icon={<MessageCircle size={17} />} block>
                    Contactar asesor
                  </Button>
                </a>
              )}
            </Space>
          </InfoPanel>
        </Col>

        <Col xs={24}>
          <Descriptions title="Caracteristicas" bordered column={{ xs: 1, md: 2 }}>
            {details.map(([label, value]) => (
              <Descriptions.Item key={label} label={label}>
                {value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>

        <Col xs={24}>
          <AgencyLeadForm
            item={item}
            compact
            title="Quieres que te contacten por este anuncio?"
            subtitle={`Deja tus datos y ${store?.name || 'la agencia'} te contactara para continuar.`}
          />
        </Col>

        {store?.assignedBroker && (
          <Col xs={24}>
            <CreditApplicationForm
              storeId={store._id}
              sourceType="store_credit"
              compact
              title="Quieres revisar opciones de credito?"
              subtitle={`Un asesor puede contactarte para orientarte sobre ${item.title}.`}
            />
          </Col>
        )}
      </Row>
    </PageShell>
  )
}

export default StorefrontAgencyItemDetailPage

