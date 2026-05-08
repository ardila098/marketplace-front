import AppTable from '../../components/common/AppTable'
import StatusTag from '../../components/common/StatusTag'
import { currency } from '../../utils/formatters'

const rows = [
  { _id: '1', customer: 'Cliente demo', total: 189800, status: 'paid' }
]

const SellerOrdersPage = () => (
  <AppTable
    title="Órdenes de la tienda"
    rows={rows}
    searchableFields={['customer', 'status']}
    columns={[
      { title: 'Cliente', dataIndex: 'customer' },
      { title: 'Total', dataIndex: 'total', render: currency },
      { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> }
    ]}
  />
)

export default SellerOrdersPage
