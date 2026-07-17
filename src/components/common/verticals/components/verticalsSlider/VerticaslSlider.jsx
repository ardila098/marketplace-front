import { useNavigate } from 'react-router-dom'
import CardCarousel from '../../../CardCarousel/CardCarousel'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../../../hooks/useDictionaryTranslation'
import useVerticals from '../../../../../hooks/useVerticals'

const VerticalsSlider = () => {
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()
  const { data } = useVerticals()

  const items = data.map(item => {
    return {
      id: item?._id,
      title: item?.name,
      description: item?.description,
      image: getUploadUrl(UPLOAD_ROUTES.verticals.banners, item?.banner),
      icon: getUploadUrl(UPLOAD_ROUTES.verticals.icons, item?.icon),
    }
  })

  return (
    <CardCarousel
      title={translate('home.verticalsTitle')}
      items={items}
      onItemClick={item => navigate(`/vertical/${item.id}`)}
    />
  )
}

export default VerticalsSlider
