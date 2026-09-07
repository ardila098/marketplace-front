import { Col, Row, Space, Spin } from 'antd'
import HeaderItemsList from './HeaderItemsList'
import ProductCard from '../../../components/products/ProductCard'
import { PageShell } from '../../../styles/layoutStyles'
import PropTypes from 'prop-types'

const ContainerItemsList = ({ data, getProductPath, loading = false }) => {
  return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <HeaderItemsList />

        {loading ? (
          <div style={{ minHeight: 280, display: 'grid', placeItems: 'center' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[22, 22]}>
            {data?.map(item => (
              <Col xs={24} sm={12} lg={6} key={item._id}>
                <ProductCard product={item} detailPath={getProductPath?.(item)} />
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageShell>
  )
}

export default ContainerItemsList

ContainerItemsList.propTypes = {
  data: PropTypes.array,
  getProductPath: PropTypes.func,
  loading: PropTypes.bool,
}
