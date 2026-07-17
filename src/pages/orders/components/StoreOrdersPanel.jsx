import { Button, Table, Tooltip } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import StatusTag from '../../../components/common/StatusTag'
import { STORE_ORDER_STATUS } from '../../../constants/orderConstants'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { currency } from '../../../utils/formatters'
import { formatOrderDate, getItemsCount, getItemsPreview, getStoreName } from '../orderViewUtils'
import { ActionGroup, CellMeta, CellStack, CellTitle, Panel, PanelTitle } from '../style'

const canReceiveStoreOrder = storeOrder => {
  return storeOrder?.status === STORE_ORDER_STATUS.SENT_TO_PLATFORM.value
}

const StoreOrdersPanel = ({ storeOrders = [], loadingId, onReceive }) => {
  const { translate } = useDictionaryTranslation()

  const columns = [
    {
      title: translate('orders.table.store'),
      render: (_, storeOrder) => (
        <CellStack>
          <CellTitle>{getStoreName(storeOrder)}</CellTitle>
          <CellMeta>{storeOrder.storeOrderNumber}</CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.products'),
      render: (_, storeOrder) => (
        <CellStack>
          <CellTitle>{getItemsCount(storeOrder.items)} {translate('products')}</CellTitle>
          <CellMeta>
            {getItemsPreview(storeOrder.items, translate('orders.detail.productFallback'))}
          </CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.amounts'),
      render: (_, storeOrder) => (
        <CellStack>
          <CellTitle>{currency(storeOrder.subtotal)}</CellTitle>
          <CellMeta>
            {translate('orders.detail.payout')}: {currency(storeOrder.payoutAmount)}
          </CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.status'),
      dataIndex: 'status',
      render: status => <StatusTag status={status} />,
    },
    {
      title: translate('orders.table.payout'),
      dataIndex: 'payoutStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: translate('orders.table.updated'),
      render: (_, storeOrder) => (
        <CellStack>
          <CellMeta>
            {translate('orders.detail.sentAt')}: {formatOrderDate(storeOrder.sentToPlatformAt)}
          </CellMeta>
          <CellMeta>
            {translate('orders.detail.receivedAt')}: {formatOrderDate(storeOrder.receivedByPlatformAt)}
          </CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.actions'),
      align: 'right',
      render: (_, storeOrder) => {
        const enabled = canReceiveStoreOrder(storeOrder)

        return (
          <ActionGroup>
            <Tooltip
              title={
                enabled
                  ? translate('orders.actions.markReceived')
                  : translate('orders.actions.waitStoreDispatch')
              }
            >
              <span>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  disabled={!enabled}
                  loading={loadingId === storeOrder._id}
                  onClick={() => onReceive(storeOrder)}
                >
                  {translate('orders.actions.receive')}
                </Button>
              </span>
            </Tooltip>
          </ActionGroup>
        )
      },
    },
  ]

  return (
    <Panel>
      <PanelTitle>{translate('orders.detail.storeOrders')}</PanelTitle>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={storeOrders}
        pagination={false}
        scroll={{ x: 980 }}
        size="middle"
      />
    </Panel>
  )
}

export default StoreOrdersPanel
