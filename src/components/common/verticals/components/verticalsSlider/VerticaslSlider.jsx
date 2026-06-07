import { useNavigate } from 'react-router-dom'
import CardCarousel from '../../../CardCarousel/CardCarousel'
import { UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'
import useVerticals from '../../../../../hooks/useVerticals'

const VerticalsSlider = () => {
  const navigate = useNavigate()
  const { data = [] } = useVerticals()

  const items = data.map(item => {
    return {
      id: item?._id,
      title: item?.name,
      description: item?.description,
      image: `${UPLOAD_ROUTES.verticals?.banners}/${item?.banner}`,
      icon: `${UPLOAD_ROUTES.verticals?.icons}/${item?.icon}`,
    }
  })

  return (
    <CardCarousel
      title="Secciones"
      items={items}
      onItemClick={item => navigate(`/vertical/${item.id}`)}
    />
  )
}

export default VerticalsSlider
