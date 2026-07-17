import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Space, Switch, message } from 'antd'

import ProductVariantFields from './ProductVariantFields'
import ProductConfigurableSetFields from './ProductConfigurableSetFields'
import { PRODUCT_TYPES } from '../../../../../../constants/productTypeConstants'
import ImageUploadField from '../../../../../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../../../constants/uploadRoutes'
import SelectCategory from '../../../../../../components/selects/selectCategory/SelectCategory'
import SelectProductType from '../../../../../../components/selects/selectProductType/SelectProductType'
import { useDictionaryTranslation } from '../../../../../../hooks/useDictionaryTranslation'
import { storeService } from '../../../../../../services/storeService'

const FormEditSellerProduct = ({ loading = false, data, onSubmit, onCancel }) => {
  const { translate } = useDictionaryTranslation()
  const [form] = Form.useForm()
  const [storeVerticals, setStoreVerticals] = useState([])
  const productType = Form.useWatch('productType', form)
  const selectedVertical = Form.useWatch('vertical', form)
  const categoryParams = useMemo(() => {
    if (!selectedVertical) return { enabled: false }

    return {
      vertical: selectedVertical,
      isActive: true,
    }
  }, [selectedVertical])

  const normalizeStoreVerticals = useCallback(store => {
    const verticals = store?.verticals?.length
      ? store.verticals
      : [store?.vertical].filter(Boolean)

    return verticals
      .map(vertical => ({
        label: vertical?.name || vertical?.slug || 'Vertical',
        value: vertical?._id || vertical,
      }))
      .filter(vertical => vertical.value)
  }, [])

  const loadStoreVerticals = useCallback(async () => {
    try {
      const response = await storeService.getMyStore()
      const options = normalizeStoreVerticals(response.data)

      setStoreVerticals(options)

      if (!form.getFieldValue('vertical') && options.length === 1) {
        form.setFieldValue('vertical', options[0].value)
      }
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las verticales de la tienda')
    }
  }, [form, normalizeStoreVerticals])

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
      vertical: data?.vertical?._id || data?.vertical,
      isNewArrival: data?.isNewArrival ?? data?.isNew ?? false,
      category: data?.category?._id || data?.category,
    })
  }, [form, data])

  useEffect(() => {
    loadStoreVerticals()
  }, [loadStoreVerticals])

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
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col xs={24}>
          <ImageUploadField
            label={translate('products.form.images')}
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
            label={translate('products.form.name')}
            name="name"
            rules={[{ required: true, message: translate('products.form.nameRequired') }]}
          >
            <Input placeholder={translate('products.form.namePlaceholder')} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label={translate('products.form.vertical')}
            name="vertical"
            rules={[{ required: true, message: translate('products.form.verticalRequired') }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={storeVerticals}
              placeholder={translate('products.form.verticalPlaceholder')}
              onChange={() => form.setFieldValue('category', undefined)}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label={translate('products.form.category')}
            name="category"
            rules={[{ required: true, message: translate('products.form.categoryRequired') }]}
          >
            <SelectCategory
              disabled={!selectedVertical}
              params={categoryParams}
              placeholder={selectedVertical
                ? translate('products.form.category')
                : translate('products.form.categoryFirst')}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label={translate('products.form.type')}
            name="productType"
            rules={[{ required: true, message: translate('products.form.typeRequired') }]}
          >
            <SelectProductType />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label={translate('products.form.newProduct')} name="isNewArrival" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label={translate('products.form.description')} name="description">
            <Input.TextArea rows={4} placeholder={translate('products.form.descriptionPlaceholder')} />
          </Form.Item>
        </Col>

        <Col xs={24}>{renderProductTypeFields()}</Col>
      </Row>

      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>{translate('cancel')}</Button>

        <Button type="primary" htmlType="submit" loading={loading}>
          {translate('save')}
        </Button>
      </Space>
    </Form>
  )
}

export default FormEditSellerProduct
