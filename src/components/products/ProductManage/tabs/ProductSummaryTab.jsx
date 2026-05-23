import { Descriptions, Image, Space, Tag } from 'antd'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../../constants/uploadRoutes'


const ProductSummaryTab = ({ product }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Nombre">
          {product.name}
        </Descriptions.Item>

        <Descriptions.Item label="Slug">
          {product.slug}
        </Descriptions.Item>

        <Descriptions.Item label="Categoría">
          {product.category?.name || '-'}
        </Descriptions.Item>

        <Descriptions.Item label="Tienda">
          {product.store?.name || '-'}
        </Descriptions.Item>

        <Descriptions.Item label="Estado">
          <Tag>{product.status}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Precio base">
          {product.price}
        </Descriptions.Item>

        <Descriptions.Item label="Descripción">
          {product.description || '-'}
        </Descriptions.Item>
      </Descriptions>

      <Image.PreviewGroup>
        <Space wrap>
          {(product.images || []).map(image => (
            <Image
              key={image}
              width={90}
              height={90}
              src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
            />
          ))}
        </Space>
      </Image.PreviewGroup>
    </Space>
  )
}

export default ProductSummaryTab