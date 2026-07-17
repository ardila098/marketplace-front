import { Row, Typography } from 'antd'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const HeaderItemsList = () => {
  const { translate } = useDictionaryTranslation()

  return (
    <>
      <Row>
        <Typography.Text type="secondary">{translate('products')}</Typography.Text>
      </Row>
    </>
  )
}

export default HeaderItemsList
