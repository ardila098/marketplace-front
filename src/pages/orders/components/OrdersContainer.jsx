import { Empty } from 'antd'

import { ROLES } from '../../../constants/roles'
import { useAuth } from '../../../hooks/useAuth'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import AdminOrdersView from './AdminOrdersView'
import SellerOrdersView from './SellerOrdersView'

const OrdersContainer = () => {
  const { role } = useAuth()
  const { translate } = useDictionaryTranslation()

  if (Number(role) === ROLES.ADMIN.value) {
    return <AdminOrdersView />
  }

  if (Number(role) === ROLES.SELLER.value) {
    return <SellerOrdersView />
  }

  return <Empty description={translate('orders.messages.unsupportedRole')} />
}

export default OrdersContainer
