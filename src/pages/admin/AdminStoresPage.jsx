import { Button, Space } from 'antd'
import AppTable from '../../components/common/AppTable'
import StatusTag from '../../components/common/StatusTag'

const rows = [
  { _id: '1', name: 'Verona', owner: 'Seller demo', vertical: 'woman', status: 'pending' }
]

const AdminStoresPage = () => (
  <AppTable
    title="Tiendas"
    rows={rows}
    searchableFields={['name', 'owner', 'vertical', 'status']}
    filters={[{ key: 'status', label: 'Estado', options: [{ label: 'Pendiente', value: 'pending' }, { label: 'Aprobada', value: 'approved' }] }]}
    columns={[
      { title: 'Tienda', dataIndex: 'name' },
      { title: 'Seller', dataIndex: 'owner' },
      { title: 'Vertical', dataIndex: 'vertical' },
      { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> },
      { title: 'Acciones', render: () => <Space><Button>Aprobar</Button><Button danger>Rechazar</Button></Space> }
    ]}
  />
)

export default AdminStoresPage
