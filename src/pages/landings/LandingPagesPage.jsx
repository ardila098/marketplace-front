import { PlusOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag, Typography } from 'antd'
import { useMemo } from 'react'

import {
  getLandingDomainStatusColor,
  getLandingDomainStatusLabel,
  getLandingStatusColor,
  getLandingStatusLabel,
} from '../../constants/landingPages'
import { ROLES } from '../../constants/roles'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { useAuth } from '../../hooks/useAuth'
import {
  ImagePlaceholder,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  ThumbnailImage,
  Toolbar,
} from '../../styles/dashboardStyles'
import { currency } from '../../utils/formatters'
import { PublicPathText } from './styles'
import useLanding from './hooks/useLanding'
import { useNavigate } from 'react-router-dom'

const getPublicUrl = landing => {
  if (landing?.domain?.url) return landing.domain.url
  if (!landing?.slug) return ''

  return `${window.location.origin}/l/${landing.slug}`
}

const renderImage = landing => {
  const image = landing.coverImage || landing.hero?.image || landing.product?.images?.[0]

  if (!image) {
    return <ImagePlaceholder $width={54} $height={42} $radius={8} />
  }

  return (
    <ThumbnailImage src={getUploadUrl(UPLOAD_ROUTES.landings.images, image)} alt={landing.name} />
  )
}

const LandingPagesPage = () => {
  const { role } = useAuth()
  const isAdmin = Number(role) === ROLES.ADMIN.value
  const { loading, landings } = useLanding()
  const Navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        title: '',
        width: 76,
        render: (_, landing) => renderImage(landing),
      },
      {
        title: 'Landing',
        render: (_, landing) => (
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{landing.name}</Typography.Text>
            <Typography.Text type="secondary">
              {landing.product?.name || landing.offer?.title || '-'}
            </Typography.Text>
          </Space>
        ),
      },
      {
        title: 'Oferta',
        render: (_, landing) => (
          <Space direction="vertical" size={0}>
            <Typography.Text>{currency(landing.offer?.price)}</Typography.Text>
            {landing.offer?.badge && (
              <Typography.Text type="secondary">{landing.offer.badge}</Typography.Text>
            )}
          </Space>
        ),
      },
      {
        title: 'Estado',
        render: (_, landing) => (
          <Space>
            <Tag color={getLandingStatusColor(landing.status)}>
              {getLandingStatusLabel(landing.status)}
            </Tag>
            {!landing.isActive && <Tag>Inactiva</Tag>}
          </Space>
        ),
      },
      {
        title: 'URL',
        render: (_, landing) => (
          <Space direction="vertical" size={2}>
            <PublicPathText copyable={{ text: getPublicUrl(landing) }}>
              {getPublicUrl(landing)}
            </PublicPathText>
            {landing.domain?.hostname && (
              <Space size={6} wrap>
                <Tag color={getLandingDomainStatusColor(landing.domain.status)}>
                  {getLandingDomainStatusLabel(landing.domain.status)}
                </Tag>
                <Typography.Text type="secondary">{landing.domain.hostname}</Typography.Text>
              </Space>
            )}
          </Space>
        ),
      },
      {
        title: 'Acciones',
        align: 'right',
        render: (_, landing) => (
          <Button onClick={() => Navigate(`/landing/builder/${landing._id}`)}>Editar</Button>
        ),
      },
    ],
    []
  )

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>{isAdmin ? 'Landings' : 'Mis landings'}</PageTitle>
          <PageDescription>
            Crea paginas de venta rapidas para productos, packs o campanas puntuales.
          </PageDescription>
        </PageIntro>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => Navigate(`/landing/builder`)}>
          Nueva landing
        </Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={landings}
        loading={loading}
        scroll={{ x: 960 }}
      />
    </PageStack>
  )
}

export default LandingPagesPage
