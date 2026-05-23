import { useNavigate } from "react-router-dom"
import useVerticals from "../hooks/useVerticals"
import { UPLOAD_ROUTES } from "../../../constants/uploadRoutes"
import CardCarousel from "../../../components/common/CardCarousel/CardCarousel"


const VerticalsCarousel = () => {
    const navigate = useNavigate()
    const { data = [] } = useVerticals()

    console.log(data)

    const items = data
        .filter((vertical) => vertical.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((vertical) => ({
            id: vertical._id,
            title: vertical?.name,
            description: vertical?.description,
            image: `${UPLOAD_ROUTES.verticals?.banners}/${vertical.banner}`,
            icon: `${UPLOAD_ROUTES.verticals?.icons}/${vertical.icon}`,
            slug: vertical.slug,
        }))

    return (
        <CardCarousel
            title="Secciones"
            items={items}
            onItemClick={(item) => navigate(`/vertical/${item.id}`)}
        />
    )
}

export default VerticalsCarousel
