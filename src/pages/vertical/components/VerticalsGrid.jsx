import { Row, Col } from 'antd'
import { ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import {
  GridCardContainer,
  GridCardImage,
  GridCardFallback,
  GridCardOverlay,
  GridCardIcon,
  GridCardTitle,
  GridCardExploreText,
} from '../../vertical/styles/styleVerticalsGrid'

const VerticalsGrid = ({ data }) => {
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()

  return (
    <Row gutter={[24, 24]} justify="center">
      {data.map(item => {
        const vertical = item.vertical || item

        if (!vertical?._id) return null

        return (
          <Col key={vertical._id} xs={24} sm={12} lg={6}>
            <GridCardContainer onClick={() => navigate(`/vertical/${vertical._id}`)}>
              {vertical.banner ? (
                <GridCardImage
                  src={getUploadUrl(UPLOAD_ROUTES.verticals.banners, vertical.banner)}
                  alt={`Vertical: ${vertical.name}`}
                />
              ) : (
                <GridCardFallback>
                  <ImageIcon size={30} />
                </GridCardFallback>
              )}

              <GridCardOverlay>
                {vertical.icon && (
                  <GridCardIcon
                    src={getUploadUrl(UPLOAD_ROUTES.verticals.icons, vertical.icon)}
                    alt={`Icono ${vertical.name}`}
                  />
                )}
                <div>
                  <GridCardTitle>{vertical.name}</GridCardTitle>
                  <GridCardExploreText>{translate('catalog.explore')}</GridCardExploreText>
                </div>
              </GridCardOverlay>
            </GridCardContainer>
          </Col>
        )
      })}
    </Row>
  )
}

export default VerticalsGrid
