import { useNavigate } from "react-router-dom"
import CardCarousel from "../../../CardCarousel/CardCarousel"
import useVerticals from "../../../../../pages/verticals/hooks/useVerticals"
import { UPLOAD_ROUTES } from "../../../../../constants/uploadRoutes"


const VerticalsSlider = () => {
    const navigate = useNavigate()
    const { data = [] } = useVerticals()

    console.log(data)

    const items = data
        .filter((item) => item.vertical && item.vertical.isActive !== false)
        .sort((a, b) => (a.vertical.sortOrder || 0) - (b.vertical.sortOrder || 0))
        .map((item) => {
            const vertical = item.vertical;
            return {
                id: vertical._id,
                title: vertical?.name,
                description: vertical?.description,
                image: `${UPLOAD_ROUTES.verticals?.banners}/${vertical.banner}`,
                icon: `${UPLOAD_ROUTES.verticals?.icons}/${vertical.icon}`,
                slug: vertical.slug,
            }
        })

    return (
        <CardCarousel
            title="Secciones"
            items={items}
            onItemClick={(item) => navigate(`/vertical/${item.id}`)}
        />
    )
}

export default VerticalsSlider


