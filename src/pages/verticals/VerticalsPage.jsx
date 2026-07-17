import { Col, Row, Spin, Typography } from 'antd'
import { useEffect } from 'react'
import VerticalsGrid from '../vertical/components/VerticalsGrid'
import FeaturedProducts from '../vertical/components/FeaturedProducts'
import VerticalsHeader from '../vertical/components/VerticalsHeader'
import useVerticals from '../../hooks/useVerticals'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const VerticalsPage = () => {
  const { catalogData, data, getVerticalsCatalog, loading } = useVerticals()
  const { translate } = useDictionaryTranslation()

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
          {loading ? <Spin /> : <VerticalsGrid data={data} />}
          <Row style={{ marginTop: 60 }} gutter={[0, 24]}>
            <Col span={24}>
              <Typography.Title level={3}>{translate('catalog.featuredByVertical')}</Typography.Title>
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
