import AppTable from '../../components/common/AppTable'
import StatusTag from '../../components/common/StatusTag'
import { currency } from '../../utils/formatters'

const rows = [{ _id: '1', code: 'ORD-001', total: 89900, status: 'paid' }]

const OrdersPage = () => (
  <AppTable
    title="Mis órdenes"
    rows={rows}
    searchableFields={['code', 'status']}
    columns={[
      { title: 'Orden', dataIndex: 'code' },
      { title: 'Total', dataIndex: 'total', render: currency },
      { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> }
    ]}
  />
)

export default OrdersPage
