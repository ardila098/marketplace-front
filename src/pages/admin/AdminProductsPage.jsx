import { Button, Space } from 'antd'
import AppTable from '../../components/common/AppTable'
import StatusTag from '../../components/common/StatusTag'

const rows = [
  { _id: '1', name: 'Audífonos Redmi', store: 'Tech Importados', status: 'pending' }
]

const AdminProductsPage = () => (
  <AppTable
    title="Productos"
    rows={rows}
    searchableFields={['name', 'store', 'status']}
    columns={[
      { title: 'Producto', dataIndex: 'name' },
      { title: 'Tienda', dataIndex: 'store' },
      { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> },
      { title: 'Acciones', render: () => <Space><Button>Aprobar</Button><Button danger>Rechazar</Button></Space> }
    ]}
  />
)

export default AdminProductsPage
