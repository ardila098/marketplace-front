import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_ROUTES } from '../../../constants/uploadRoutes';
import {
    GridCardContainer,
    GridCardImage,
    GridCardOverlay,
    GridCardIcon,
    GridCardTitle,
    GridCardExploreText
} from '../styles/styleVerticalsGrid';

const VerticalsGrid = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Row gutter={[24, 24]} justify="center">
            {data.map((item) => (
                <Col key={item.vertical._id} xs={24} sm={12} lg={6}>
                    <GridCardContainer onClick={() => navigate(`/vertical/${item.vertical._id}`)}>
                        <GridCardImage
                            src={`${UPLOAD_ROUTES.verticals.banners}/${item.vertical.banner}`}
                            alt={`Vertical: ${item.vertical.name}`}
                        />

                        <GridCardOverlay>
                            <GridCardIcon
                                src={`${UPLOAD_ROUTES.verticals.icons}/${item.vertical.icon}`}
                                alt={`Icono ${item.vertical.name}`}
                            />
                            <div>
                                <GridCardTitle>{item.vertical.name}</GridCardTitle>
                                <GridCardExploreText>Explorar</GridCardExploreText>
                            </div>
                        </GridCardOverlay>
                    </GridCardContainer>
                </Col>
            ))}
        </Row>
    );
};

export default VerticalsGrid;
