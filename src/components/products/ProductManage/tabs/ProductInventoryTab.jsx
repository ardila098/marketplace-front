import { Empty, Table, Tag } from 'antd'

const getAttributeValue = (attributes = [], label) => {
  return attributes.find(
    item => String(item.labelSnapshot).toLowerCase() === label.toLowerCase()
  )?.valueSnapshot
}

const ProductInventoryTab = ({ product, inventory }) => {
  const getReferenceName = referenceId => {
    return product.references?.find(
      reference => String(reference._id) === String(referenceId)
    )?.name || '-'
  }

  const getPartName = partId => {
    return product.parts?.find(
      part => String(part._id) === String(partId)
    )?.name || '-'
  }

  const columns = [
    {
      title: 'Referencia',
      dataIndex: 'referenceId',
      render: value => getReferenceName(value),
    },
    {
      title: 'Pieza',
      dataIndex: 'partId',
      render: value => getPartName(value),
    },
    {
      title: 'Talla',
      render: (_, record) => getAttributeValue(record.attributes, 'Talla') || '-',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
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
      render: (_, record) => Math.max(
        (record.stock || 0) - (record.reservedStock || 0),
        0
      ),
    },
  ]

  if (!inventory.length) {
    return <Empty description="No hay inventario creado" />
  }

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={inventory}
      pagination={{
        pageSize: 10,
      }}
    />
  )
}

export default ProductInventoryTab