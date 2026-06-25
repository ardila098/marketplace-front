import { Currency } from 'lucide-react'
import AppTable from '../../components/common/AppTable'
import StatusTag from '../../components/common/StatusTag'
import useSellerOrders from './hooks/useSellerOrders'

const OrdersPage = () => {
  const { data } = useSellerOrders()


  return (
    <AppTable
      title="Mis órdenes"
      rows={[]}
      searchableFields={['code', 'status']}
      columns={[
        { title: 'Orden', dataIndex: 'code' },
        { title: 'Total', dataIndex: 'total', render: Currency },
        { title: 'Estado', dataIndex: 'status', render: status => <StatusTag status={status} /> },
      ]}
    />
  )
}

export default OrdersPage
