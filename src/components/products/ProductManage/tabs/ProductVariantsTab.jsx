import { Button, Empty, Image, Space, Table, Tag } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../../constants/uploadRoutes'



const formatAttributes = attributes => {
  return (attributes || [])
    .map(item => `${item.labelSnapshot}: ${item.valueSnapshot}`)
    .join(' / ')
}

const ProductVariantsTab = ({ product, onEdit }) => {
  const variants = product.variants || []

  const columns = [
    {
      title: 'Referencia',
      dataIndex: 'variantReference',
      render: value => value || '-',
    },
    {
      title: 'Atributos',
      render: (_, record) => formatAttributes(record.attributes) || '-',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      render: value => (
        <Tag color={value > 0 ? 'green' : 'red'}>
          {value}
        </Tag>
      ),
    },
    {
      title: 'Reservado',
      dataIndex: 'reservedStock',
      render: value => value || 0,
    },
    {
      title: 'Disponible',
      render: (_, record) =>
        Math.max((record.stock || 0) - (record.reservedStock || 0), 0),
    },
    {
      title: 'Imágenes',
      render: (_, record) => (
        <Image.PreviewGroup>
          <Space wrap>
            {(record.images || []).map(image => (
              <Image
                key={image}
                width={45}
                height={45}
                src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
              />
            ))}
          </Space>
        </Image.PreviewGroup>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'isActive',
      render: value => (
        <Tag color={value ? 'green' : 'red'}>
          {value ? 'Activa' : 'Inactiva'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit?.(record)}
        >
          Editar
        </Button>
      ),
    },
  ]

  if (!variants.length) {
    return <Empty description="No hay variantes creadas" />
  }

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={variants}
      pagination={false}
    />
  )
}

export default ProductVariantsTab
