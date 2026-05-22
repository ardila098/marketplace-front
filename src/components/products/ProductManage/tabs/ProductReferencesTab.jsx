import { Card, Empty, Image, Space, Tag } from 'antd'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../../constants/uploadRoutes'


const ProductReferencesTab = ({ product }) => {
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
          size="small"
          style={{ width: 260 }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Tag>{reference.key}</Tag>

            {reference.sku && (
              <div>
                SKU: {reference.sku}
              </div>
            )}

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