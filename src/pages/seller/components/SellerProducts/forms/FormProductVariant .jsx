import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import ImageUploadField from '../../../../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'

const FormProductVariant = ({
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm()

  const handleFinish = values => {
    onSubmit?.({
      price: values.price,
      compareAtPrice: values.compareAtPrice || 0,
      stock: values.stock || 0,
      lowStockThreshold: values.lowStockThreshold || 0,
      images: values.images || [],
      attributes: values.attributes || [],
      isActive: true,
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        compareAtPrice: 0,
        stock: 0,
        lowStockThreshold: 0,
        images: [],
        attributes: [
          {
            labelSnapshot: 'Talla',
            valueSnapshot: '',
          },
        ],
      }}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <ImageUploadField
            label="Imágenes de la variante"
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
            label="Precio"
            name="price"
            rules={[{ required: true, message: 'El precio es obligatorio' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Precio anterior"
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
                    new Error('El precio anterior debe ser mayor al precio actual')
                  )
                },
              }),
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Stock inicial" name="stock">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Alerta stock bajo" name="lowStockThreshold">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.List name="attributes">
            {(fields, { add, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }}>
                {fields.map(field => (
                  <Row gutter={12} key={field.key}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...field}
                        label="Atributo"
                        name={[field.name, 'labelSnapshot']}
                        rules={[{ required: true, message: 'Atributo requerido' }]}
                      >
                        <Input placeholder="Ej: Talla, Color, Capacidad" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item
                        {...field}
                        label="Valor"
                        name={[field.name, 'valueSnapshot']}
                        rules={[{ required: true, message: 'Valor requerido' }]}
                      >
                        <Input placeholder="Ej: M, Negro, 128GB" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={2}>
                      <Button
                        danger
                        block
                        icon={<DeleteOutlined />}
                        onClick={() => remove(field.name)}
                        style={{
                          marginTop: 30,
                          border: 'none',
                          boxShadow: 'none',
                        }}
                      />
                    </Col>
                  </Row>
                ))}

                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  Agregar atributo
                </Button>
              </Space>
            )}
          </Form.List>
        </Col>
      </Row>

      <Space style={{ width: '100%', justifyContent: 'flex-end', marginTop: 24 }}>
        <Button onClick={onCancel}>
          Cancelar
        </Button>

        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar variante
        </Button>
      </Space>
    </Form>
  )
}

export default FormProductVariant