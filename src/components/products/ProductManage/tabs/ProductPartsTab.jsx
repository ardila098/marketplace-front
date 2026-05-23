import { Empty, Table, Tag } from 'antd'

const ProductPartsTab = ({ product }) => {
  const parts = product.parts || []

  const columns = [
    {
      title: 'Pieza',
      dataIndex: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
    },
    {
      title: 'Selección',
      render: (_, record) => `${record.minSelect} - ${record.maxSelect}`,
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
  ]

  if (!parts.length) {
    return <Empty description="No hay piezas creadas" />
  }

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={parts}
      pagination={false}
    />
  )
}

export default ProductPartsTab