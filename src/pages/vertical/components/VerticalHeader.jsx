import { Space, Typography } from 'antd'
import styled from 'styled-components'

import CoverHero from '../../../components/common/CoverHero'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 576px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const IconBadge = styled.div`
  width: 64px;
  height: 64px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`

const VerticalHeader = ({ dataVertical, loadingProducts, productsCount }) => {
  const { translate } = useDictionaryTranslation()

  if (!dataVertical) return null

  const bannerUrl = getUploadUrl(UPLOAD_ROUTES.verticals.banners, dataVertical.banner)
  const iconUrl = getUploadUrl(UPLOAD_ROUTES.verticals.icons, dataVertical.icon)

  return (
    <CoverHero image={bannerUrl}>
      <Space direction="vertical" size={18}>
        <HeaderRow>
          {iconUrl && (
            <IconBadge>
              <img src={iconUrl} alt={`Icono de ${dataVertical.name}`} />
            </IconBadge>
          )}

          <div>
            <Typography.Text>
              {loadingProducts
                ? translate('loading')
                : `${productsCount} ${translate('catalog.productsCount')}`}
            </Typography.Text>

            <Typography.Title style={{ fontSize: 38, lineHeight: 1.08, margin: '8px 0 0', letterSpacing: 0 }}>
              {dataVertical.name}
            </Typography.Title>
          </div>
        </HeaderRow>

        {dataVertical.description && (
          <Typography.Paragraph style={{ fontSize: 16, maxWidth: 560, margin: 0 }}>
            {dataVertical.description}
          </Typography.Paragraph>
        )}
      </Space>
    </CoverHero>
  )
}

export default VerticalHeader
