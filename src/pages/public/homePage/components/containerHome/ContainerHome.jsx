import { Col, Row, } from 'antd'
import HeaderHome from './HeaderHome'
import VerticalsSlider from '../../../../../components/common/verticals/components/verticalsSlider/VerticaslSlider'



const ContainerHome = () => (
    <>
        <Col md={24} xs={24} lg={24}>
            <HeaderHome />
        </Col>

        <Col md={24} xs={24} lg={24}>
            <Row justify={'center'}>
                <Col md={24}>
                    <VerticalsSlider />
                </Col>
            </Row>
        </Col>




    </>
)

export default ContainerHome


