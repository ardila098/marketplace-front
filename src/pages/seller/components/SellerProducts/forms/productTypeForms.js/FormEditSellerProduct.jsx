import { useEffect } from 'react'
import {
  Button, Col, Form, Input, Row, Space,
} from 'antd'



import ProductVariantFields from './ProductVariantFields'
import ProductConfigurableSetFields from './ProductConfigurableSetFields'
import { PRODUCT_TYPES } from '../../../../../../constants/productTypeConstants'
import ImageUploadField from '../../../../../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../../../constants/uploadRoutes'
import SelectCategory from '../../../../../../components/selects/selectCategory/SelectCategory'
import SelectProductType from '../../../../../../components/selects/selectProductType/SelectProductType'

const FormEditSellerProduct = ({
  loading = false,
  data,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm()
  const productType = Form.useWatch('productType', form)

  useEffect(() => {
    form.resetFields()

    form.setFieldsValue({
      productType: PRODUCT_TYPES.VARIANT.value,
      price: 0,
      compareAtPrice: 0,
      images: [],
      parts: [],
      specs: {},
      ...data,
      category: data?.category?._id || data?.category,

    })
  }, [form, data])

  const renderProductTypeFields = () => {


    if (productType === PRODUCT_TYPES.CONFIGURABLE_SET.value) {
      return <ProductConfigurableSetFields />
    }

    return <ProductVariantFields />
  }

  const handleFinish = values => {
    onSubmit?.(values)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <ImageUploadField
            label="Imágenes del producto"
            name="images"
            folder={UPLOAD_FOLDERS.products.images}
            uploadRoute={UPLOAD_ROUTES.products.images}
            maxCount={5}
            multiple
            disabled={loading}
          />
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'El nombre es obligatorio' }]}
          >
            <Input placeholder="Ej: Smartwatch 3" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Slug" name="slug">
            <Input placeholder="smartwatch-3" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Categoría"
            name="category"
            rules={[{ required: true, message: 'La categoría es obligatoria' }]}
          >
            <SelectCategory />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Tipo de producto"
            name="productType"
            rules={[
              { required: true, message: 'El tipo de producto es obligatorio' },
            ]}
          >
            <SelectProductType />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Descripción" name="description">
            <Input.TextArea rows={4} placeholder="Describe el producto" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          {renderProductTypeFields()}
        </Col>
      </Row>

      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>
          Cancelar
        </Button>

        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar
        </Button>
      </Space>
    </Form>
  )
}

export default FormEditSellerProduct