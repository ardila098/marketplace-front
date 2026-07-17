import { Typography } from 'antd'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const VerticalsHeader = () => {
  const { translate } = useDictionaryTranslation()

  return (
    <>
      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
          fontSize: 34,
          lineHeight: 1.12,
          letterSpacing: 0,
          marginBottom: 10,
        }}
      >
        {translate('catalog.categoriesTitle')}
      </Typography.Title>

      <Typography.Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: 40 }}>
        {translate('catalog.exploreCategories')}
      </Typography.Paragraph>
    </>
  )
}

export default VerticalsHeader
