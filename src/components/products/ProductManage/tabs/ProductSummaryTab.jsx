import { useEffect } from 'react'
import { Button, Descriptions, Form, Image, Input, Space, Tag, Typography } from 'antd'
import styled from 'styled-components'

import ImageUploadField from '../../../uploads/ImageUploadField/ImageUploadField'
import { getUploadUrl, UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../constants/uploadRoutes'

const SeoPanel = styled.section`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 18px;
  background: #fff;
`

const getSeoValues = product => ({
  seo: {
    title: product?.seo?.title || '',
    description: product?.seo?.description || '',
    keywords: Array.isArray(product?.seo?.keywords)
      ? product.seo.keywords.join(', ')
      : product?.seo?.keywords || '',
    image: product?.seo?.image || '',
  },
})

const ProductSummaryTab = ({ product, onSaveSeo, saving }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(getSeoValues(product))
  }, [form, product])

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

      <SeoPanel>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          SEO del producto
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          Ajusta como se ve este producto al compartirlo y cuando sea indexado.
        </Typography.Paragraph>

        <Form form={form} layout="vertical" onFinish={onSaveSeo}>
          <Form.Item label="Titulo SEO" name={['seo', 'title']}>
            <Input placeholder={product.name} />
          </Form.Item>

          <Form.Item label="Descripcion SEO" name={['seo', 'description']}>
            <Input.TextArea rows={3} maxLength={170} showCount />
          </Form.Item>

          <Form.Item label="Palabras clave" name={['seo', 'keywords']}>
            <Input placeholder="producto, tienda, categoria" />
          </Form.Item>

          <ImageUploadField
            label="Imagen para compartir"
            name={['seo', 'image']}
            folder={UPLOAD_FOLDERS.products.images}
            uploadRoute={UPLOAD_ROUTES.products.images}
            maxCount={1}
            multiple={false}
          />

          <Button type="primary" htmlType="submit" loading={saving}>
            Guardar SEO
          </Button>
        </Form>
      </SeoPanel>
    </Space>
  )
}

export default ProductSummaryTab
