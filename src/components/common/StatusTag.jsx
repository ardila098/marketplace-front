import { Tag } from 'antd'

import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const statusMap = {
  pending_payment: { color: 'gold', labelKey: 'orders.status.pendingPayment' },
  pending: { color: 'gold', labelKey: 'orders.status.pending' },
  preparing: { color: 'blue', labelKey: 'orders.status.preparing' },
  approved: { color: 'green', labelKey: 'orders.status.approved' },
  rejected: { color: 'red', labelKey: 'orders.status.rejected' },
  failed: { color: 'red', labelKey: 'orders.status.failed' },
  paid: { color: 'green', labelKey: 'orders.status.paid' },
  cancelled: { color: 'red', labelKey: 'orders.status.cancelled' },
  completed: { color: 'green', labelKey: 'orders.status.completed' },
  refunded: { color: 'purple', labelKey: 'orders.status.refunded' },
  waiting_stores: { color: 'gold', labelKey: 'orders.status.waitingStores' },
  consolidating: { color: 'blue', labelKey: 'orders.status.consolidating' },
  ready_to_ship: { color: 'cyan', labelKey: 'orders.status.readyToShip' },
  shipped: { color: 'geekblue', labelKey: 'orders.status.shipped' },
  delivered: { color: 'green', labelKey: 'orders.status.delivered' },
  sent_to_platform: { color: 'blue', labelKey: 'orders.status.sentToPlatform' },
  received_by_platform: { color: 'green', labelKey: 'orders.status.receivedByPlatform' },
  processing: { color: 'blue', labelKey: 'orders.status.processing' },
  not_configured: { color: 'default', labelKey: 'stores.domain.notConfigured' },
  pending_verification: { color: 'gold', labelKey: 'stores.domain.pendingVerification' },
  verified: { color: 'green', labelKey: 'stores.domain.verified' },
  draft: { color: 'default', labelKey: 'draft' },
  active: { color: 'green', labelKey: 'active' },
  inactive: { color: 'default', labelKey: 'inactive' },
}

const StatusTag = ({ status }) => {
  const { translate } = useDictionaryTranslation()
  const current = statusMap[status] || { color: 'default' }
  const label = current.labelKey ? translate(current.labelKey) : status || translate('orders.status.empty')

  return <Tag color={current.color}>{label}</Tag>
}

export default StatusTag
