import { Col, Typography } from "antd"
import PropTypes from "prop-types"

const HeaderTable = ({ title = 'Items', description = '' }) => {
  return (
    <Col>
      <Typography.Title level={2} style={{ margin: 0 }}>
        {title}
      </Typography.Title>

      <Typography.Text type="secondary">
        {description}
      </Typography.Text>
    </Col>
  )
}

export default HeaderTable


HeaderTable.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string

}