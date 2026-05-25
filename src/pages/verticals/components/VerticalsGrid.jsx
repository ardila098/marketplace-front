import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_ROUTES } from '../../../constants/uploadRoutes';

const VerticalsGrid = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Row gutter={[24, 24]} justify="center">
            {data.map((vertical) => (
                <Col key={vertical._id} xs={24} sm={12} lg={6}>
                    <div
                        onClick={() => navigate(`/vertical/${vertical._id}`)}
                        style={{
                            position: 'relative',
                            borderRadius: 15,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            height: 300
                        }}
                    >
                        <img
                            src={`${UPLOAD_ROUTES.verticals.banners}/${vertical.banner}`}
                            alt={`Vertical: ${vertical.name}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                objectPosition: 'top'
                            }}
                        />

                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '15px'
                        }}>
                            <img
                                src={`${UPLOAD_ROUTES.verticals.icons}/${vertical.icon}`}
                                alt={`Icono ${vertical.name}`}
                                style={{ width: 24, height: 24 }}
                            />
                            <div>
                                <div style={{ fontWeight: 600 }}>{vertical.name}</div>
                                <div style={{ fontSize: 12, color: '#000' }}>Explorar</div>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default VerticalsGrid;
