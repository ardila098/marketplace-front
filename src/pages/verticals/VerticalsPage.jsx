import useVerticals from "./hooks/useVerticals"
import { Col, Row, Typography } from 'antd'
import VerticalsGrid from './components/VerticalsGrid'
import FeaturedProducts from './components/FeaturedProducts'
import VerticalHeader from "./components/VerticalHeader"


const VerticalsPage = () => {
    const { data } = useVerticals()

    return (
        <Col md={24}>
            <Row style={{ padding: '48px 24px', margin: 'auto', maxWidth: '1200' }}>

                <VerticalHeader />

                <Col md={24} >
                    <VerticalsGrid data={data} />
                    <Row style={{ marginTop: 60 }}>
                        <Typography.Title level={3}>
                            Destacados por vertical
                        </Typography.Title>
                        <FeaturedProducts />
                    </Row>
                </Col >
            </Row>
        </Col>



    )
}


export default VerticalsPage