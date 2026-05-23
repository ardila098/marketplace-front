import { useEffect } from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import ImageUploadField from '../../../../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'



const normalizeKey = value => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
}

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

  const handleNameChange = event => {
    const name = event.target.value

    form.setFieldsValue({
      key: normalizeKey(name),
    })
  }

  const handleFinish = values => {
    const color = values.name

    onSubmit?.({
      productId: product?._id || product?.id,
      payload: {
        name: values.name,
        key: values.key || normalizeKey(values.name),
        sku: values.sku,
        images: values.images || [],
        attributes: [
          {
            labelSnapshot: 'Color',
            valueSnapshot: color,
          },
        ],
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
      >
        <Form.Item
          label="Nombre de la referencia"
          name="name"
          rules={[{ required: true, message: 'El nombre es obligatorio' }]}
        >
          <Input
            placeholder="Ej: Negro, Rojo, Azul"
            onChange={handleNameChange}
          />
        </Form.Item>

        <Form.Item
          label="Key"
          name="key"
          rules={[{ required: true, message: 'El key es obligatorio' }]}
        >
          <Input placeholder="Ej: negro" />
        </Form.Item>

        <Form.Item label="SKU de referencia" name="sku">
          <Input placeholder="Ej: BIKINI-VERONA-NEGRO" />
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