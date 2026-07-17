import { Button, Card, Empty, Image, Space, Tag, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../../constants/uploadRoutes'

const { Text } = Typography

const formatPrice = value => {
  return Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })
}

const ProductReferencesTab = ({ product, onEdit }) => {
  const references = product.references || []

  if (!references.length) {
    return <Empty description="No hay referencias creadas" />
  }

  return (
    <Space wrap align="start">
      {references.map(reference => (
        <Card
          key={reference._id}
          title={reference.name}
          extra={(
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit?.(reference)}
            />
          )}
          size="small"
          style={{ width: 260 }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {reference.isDefault && (
              <Tag color="blue">
                Inicial
              </Tag>
            )}

            <Text strong>
              {formatPrice(reference.price)}
            </Text>

            {reference.compareAtPrice > reference.price && (
              <Text delete type="secondary">
                {formatPrice(reference.compareAtPrice)}
              </Text>
            )}

            {reference.attributes?.map(attribute => (
              <Tag key={`${attribute.labelSnapshot}-${attribute.valueSnapshot}`}>
                {attribute.labelSnapshot}: {attribute.valueSnapshot}
              </Tag>
            ))}

            <Image.PreviewGroup>
              <Space wrap>
                {(reference.images || []).map(image => (
                  <Image
                    key={image}
                    width={70}
                    height={70}
                    src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                  />
                ))}
              </Space>
            </Image.PreviewGroup>
          </Space>
        </Card>
      ))}
    </Space>
  )
}

export default ProductReferencesTab
