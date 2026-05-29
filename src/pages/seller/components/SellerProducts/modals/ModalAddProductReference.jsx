import { useEffect } from 'react'
import { Button, Form, Input, InputNumber, Modal, Space, Switch } from 'antd'
import ImageUploadField from '../../../../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'

const ModalAddProductReference = ({
  open,
  product,
  loading = false,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open, form])

  const handleFinish = values => {
    onSubmit?.({
      productId: product?._id || product?.id,
      payload: {
        name: values.name,
        price: values.price || 0,
        compareAtPrice: values.compareAtPrice || 0,
        images: values.images || [],
        attributes: [
          {
            labelSnapshot: 'Color',
            valueSnapshot: values.name,
          },
        ],
        isDefault: Boolean(values.isDefault),
        isActive: true,
      },
    })
  }

  return (
    <Modal
      title={`Agregar referencia${product?.name ? ` - ${product.name}` : ''}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          price: product?.price || 0,
          compareAtPrice: product?.compareAtPrice || 0,
          isDefault: false,
        }}
      >
        <Form.Item
          label="Nombre de la referencia"
          name="name"
          rules={[{ required: true, message: 'El nombre es obligatorio' }]}
        >
          <Input placeholder="Ej: Negro, Rojo, Azul" />
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'El precio es obligatorio' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Ej: 130000" />
        </Form.Item>

        <Form.Item
          label="Precio comparativo"
          name="compareAtPrice"
          dependencies={['price']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const price = Number(getFieldValue('price') || 0)
                const compareAtPrice = Number(value || 0)

                if (!compareAtPrice || compareAtPrice > price) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  new Error('El precio comparativo debe ser mayor al precio actual')
                )
              },
            }),
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Ej: 160000" />
        </Form.Item>

        <Form.Item label="Referencia inicial" name="isDefault" valuePropName="checked">
          <Switch />
        </Form.Item>

        <ImageUploadField
          label="Imágenes de esta referencia"
          name="images"
          folder={UPLOAD_FOLDERS.products.images}
          uploadRoute={UPLOAD_ROUTES.products.images}
          maxCount={5}
          multiple
          disabled={loading}
        />

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar referencia
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}

export default ModalAddProductReference