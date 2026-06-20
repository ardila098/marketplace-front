import { Col } from 'antd'
import HeaderHome from './HeaderHome'
import VerticalsSlider from '../../../components/common/verticals/components/verticalsSlider/VerticaslSlider'

const ContainerHome = () => {
  return (
    <>
      <HeaderHome />

      <Col md={24} xs={24}>
        <VerticalsSlider />
      </Col>
    </>
  )
}

export default ContainerHome
