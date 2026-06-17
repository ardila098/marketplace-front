import { useEffect } from 'react'
import { Col, Row, Typography } from 'antd'
import VerticalsGrid from '../vertical/components/VerticalsGrid'
import FeaturedProducts from '../vertical/components/FeaturedProducts'
import VerticalsHeader from '../vertical/components/VerticalsHeader'
import useVerticals from '../../hooks/useVerticals'

const VerticalsPage = () => {
  const { catalogData, getVerticalsCatalog } = useVerticals()

  useEffect(() => {
    getVerticalsCatalog(8)
  }, [getVerticalsCatalog])

  return (
    <Col md={24}>
      <Row style={{ padding: '48px 24px', margin: 'auto', maxWidth: 1200 }}>
        <Col span={24}>
          <VerticalsHeader />
        </Col>

        <Col span={24}>
          <VerticalsGrid data={catalogData} />
          <Row style={{ marginTop: 60 }} gutter={[0, 24]}>
            <Col span={24}>
              <Typography.Title level={3}>Destacados por vertical</Typography.Title>
            </Col>
            <Col span={24}>
              <FeaturedProducts data={catalogData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

export default VerticalsPage
