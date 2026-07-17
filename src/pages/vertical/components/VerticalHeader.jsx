import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import {
  BannerContainer,
  BannerOverlay,
  BannerContent,
  IconWrapper,
  TitleSection,
  BannerTitle,
  BannerSubtitle,
} from '../styles/styleVerticalPage'

const VerticalHeader = ({ dataVertical, loadingProducts, productsCount }) => {
  const { translate } = useDictionaryTranslation()

  if (!dataVertical) return null

  const bannerUrl = getUploadUrl(UPLOAD_ROUTES.verticals.banners, dataVertical.banner)
  const iconUrl = getUploadUrl(UPLOAD_ROUTES.verticals.icons, dataVertical.icon)

  return (
    <BannerContainer $bgImage={bannerUrl}>
      <BannerOverlay>
        <BannerContent>
          <IconWrapper>
            <img src={iconUrl} alt={`Icono de ${dataVertical.name}`} />
          </IconWrapper>
          <TitleSection>
            <BannerTitle>{dataVertical.name}</BannerTitle>
            <BannerSubtitle>
              {loadingProducts
                ? translate('loading')
                : `${productsCount} ${translate('catalog.productsCount')}`}
            </BannerSubtitle>
          </TitleSection>
        </BannerContent>
      </BannerOverlay>
    </BannerContainer>
  )
}

export default VerticalHeader
