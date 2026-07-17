import { Button, Input, Table, Tooltip } from 'antd'
import { EyeOutlined, SendOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import StatusTag from '../../../components/common/StatusTag'
import { PAYMENT_STATUS, STORE_ORDER_STATUS } from '../../../constants/orderConstants'
import { ROUTES, buildRoute } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { currency } from '../../../utils/formatters'
import useOrders from '../hooks/useOrders'
import {
  formatOrderDate,
  getItemsCount,
  getItemsPreview,
  getStoreOrderCustomer,
  getStoreOrderPaymentStatus,
} from '../orderViewUtils'
import {
  ActionGroup,
  CellMeta,
  CellStack,
  CellTitle,
  OrdersCount,
  OrdersHeaderText,
  OrdersPageHeader,
  OrdersPageShell,
  OrdersSubtitle,
  OrdersTitle,
  OrdersToolbar,
  TablePanel,
} from '../style'

const canMarkSentToPlatform = storeOrder => {
  const isPaid = getStoreOrderPaymentStatus(storeOrder) === PAYMENT_STATUS.APPROVED.value
  const isPendingDispatch = [
    STORE_ORDER_STATUS.PENDING.value,
    STORE_ORDER_STATUS.PREPARING.value,
  ].includes(storeOrder?.status)

  return isPaid && isPendingDispatch
}

const SellerOrdersView = () => {
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()
  const {
    tableData,
    loading,
    getOrders,
    markStoreOrderSent,
    actionLoadingId,
  } = useOrders()

  const refreshOrders = () => {
    return getOrders({
      search: tableData.search,
      page: tableData.page,
      pageSize: tableData.pageSize,
    })
  }

  const handleMarkSent = async storeOrder => {
    const updated = await markStoreOrderSent(storeOrder._id)

    if (updated) {
      refreshOrders()
    }
  }

  const columns = [
    {
      title: translate('orders.table.storeOrder'),
      render: (_, storeOrder) => (
        <CellStack>
          <CellTitle>{storeOrder.storeOrderNumber}</CellTitle>
          <CellMeta>
            {translate('orders.table.parentOrder')}: {storeOrder.order?.orderNumber || '-'}
          </CellMeta>
          <CellMeta>{formatOrderDate(storeOrder.createdAt)}</CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.customer'),
      render: (_, storeOrder) => {
        const customer = getStoreOrderCustomer(storeOrder)

        return (
          <CellStack>
            <CellTitle>{customer.name || translate('orders.detail.customerFallback')}</CellTitle>
            <CellMeta>{customer.email || '-'}</CellMeta>
            <CellMeta>{customer.phone || '-'}</CellMeta>
          </CellStack>
        )
      },
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
      title: translate('orders.table.payment'),
      render: (_, storeOrder) => <StatusTag status={getStoreOrderPaymentStatus(storeOrder)} />,
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
      title: translate('orders.table.actions'),
      align: 'right',
      render: (_, storeOrder) => {
        const canSend = canMarkSentToPlatform(storeOrder)
        const sendTooltip = canSend
          ? translate('orders.actions.markSent')
          : translate('orders.actions.waitPaymentOrDispatch')

        return (
          <ActionGroup>
            <Tooltip title={translate('orders.actions.viewDetail')}>
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(buildRoute(ROUTES.ORDER_DETAIL, { id: storeOrder._id }))}
              >
                {translate('orders.actions.view')}
              </Button>
            </Tooltip>

            <Tooltip title={sendTooltip}>
              <span>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  disabled={!canSend}
                  loading={actionLoadingId === storeOrder._id}
                  onClick={() => handleMarkSent(storeOrder)}
                >
                  {translate('orders.actions.send')}
                </Button>
              </span>
            </Tooltip>
          </ActionGroup>
        )
      },
    },
  ]

  return (
    <OrdersPageShell>
      <OrdersPageHeader>
        <OrdersHeaderText>
          <OrdersTitle>{translate('orders.seller.title')}</OrdersTitle>
          <OrdersSubtitle>{translate('orders.seller.subtitle')}</OrdersSubtitle>
        </OrdersHeaderText>
      </OrdersPageHeader>

      <OrdersToolbar>
        <Input.Search
          allowClear
          value={tableData.search}
          placeholder={translate('orders.search.sellerPlaceholder')}
          onChange={event => tableData.handleSearch(event.target.value)}
          style={{ maxWidth: 360 }}
        />

        <OrdersCount>
          {tableData.total} {translate('orders.table.results')}
        </OrdersCount>
      </OrdersToolbar>

      <TablePanel>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={tableData.rows}
          loading={loading}
          pagination={{
            current: tableData.page,
            pageSize: tableData.pageSize,
            total: tableData.total,
            showSizeChanger: true,
          }}
          onChange={tableData.handleTableChange}
          scroll={{ x: 1120 }}
        />
      </TablePanel>
    </OrdersPageShell>
  )
}

export default SellerOrdersView
