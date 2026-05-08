import { Button, Form, Input, InputNumber, Space } from 'antd'
import { useState } from 'react'
import AppTable from '../../components/common/AppTable'
import CrudModal from '../../components/common/CrudModal'
import StatusTag from '../../components/common/StatusTag'
import { currency } from '../../utils/formatters'

const initialRows = [
  { _id: '1', name: 'Audífonos Redmi', vertical: 'tech', status: 'draft', price: 89900 }
]

const SellerProductsPage = () => {
  const [rows, setRows] = useState(initialRows)
  const [open, setOpen] = useState(false)

  const handleCreate = values => {
    setRows([...rows, { _id: String(Date.now()), status: 'draft', ...values }])
    setOpen(false)
  }

  return (
    <>
      <AppTable
        title="Mis productos"
        rows={rows}
        searchableFields={['name', 'vertical', 'status']}
        filters={[{ key: 'status', label: 'Estado', options: [{ label: 'Borrador', value: 'draft' }, { label: 'Pendiente', value: 'pending' }] }]}
        primaryAction={{ label: 'Crear producto', onClick: () => setOpen(true) }}
        columns={[
          { title: 'Producto', dataIndex: 'name' },
          { title: 'Vertical', dataIndex: 'vertical' },
          { title: 'Precio desde', dataIndex: 'price', render: currency },
          { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> },
          { title: 'Acciones', render: () => <Space><Button>Editar</Button><Button>Variantes</Button></Space> }
        ]}
      />
      <CrudModal open={open} title="Crear producto" onCancel={() => setOpen(false)} onSubmit={handleCreate}>
        <Form.Item label="Nombre" name="name" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Vertical" name="vertical" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Precio base" name="price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
      </CrudModal>
    </>
  )
}

export default SellerProductsPage
