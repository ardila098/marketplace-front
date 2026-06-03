import useVerticals from "./hooks/useVerticals"
import { Col, Row, Typography } from 'antd'
import VerticalsGrid from './components/VerticalsGrid'
import FeaturedProducts from './components/FeaturedProducts'
import VerticalsHeader from "./components/VerticalsHeader"


const VerticalsPage = () => {
    const { data } = useVerticals()

    return (
        <Col md={24}>
            <Row style={{ padding: '48px 24px', margin: 'auto', maxWidth: 1200 }}>
                <Col span={24}>
                    <VerticalsHeader />
                </Col>

                <Col span={24} >
                    <VerticalsGrid data={data} />
                    <Row style={{ marginTop: 60 }} gutter={[0, 24]}>
                        <Col span={24}>
                            <Typography.Title level={3}>
                                Destacados por vertical
                            </Typography.Title>
                        </Col>
                        <Col span={24}>
                            <FeaturedProducts data={data} />
                        </Col>
                    </Row>
                </Col >
            </Row>
        </Col>
    )
}


export default VerticalsPage