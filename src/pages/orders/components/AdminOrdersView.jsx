import { Button, Input, Table, Tooltip } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import StatusTag from '../../../components/common/StatusTag'
import { ROUTES, buildRoute } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { currency } from '../../../utils/formatters'
import useOrders from '../hooks/useOrders'
import { formatOrderDate, getItemsCount, getOrderTotal } from '../orderViewUtils'
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

const AdminOrdersView = () => {
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()
  const { tableData, loading } = useOrders()

  const columns = [
    {
      title: translate('orders.table.order'),
      render: (_, order) => (
        <CellStack>
          <CellTitle>{order.orderNumber}</CellTitle>
          <CellMeta>{formatOrderDate(order.createdAt)}</CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.customer'),
      render: (_, order) => (
        <CellStack>
          <CellTitle>{order.customer?.name || translate('orders.detail.customerFallback')}</CellTitle>
          <CellMeta>{order.customer?.email || '-'}</CellMeta>
          <CellMeta>{order.customer?.phone || '-'}</CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.stores'),
      render: (_, order) => {
        const storeOrders = order.storeOrders || []
        const itemsCount = storeOrders.reduce((total, storeOrder) => {
          return total + getItemsCount(storeOrder.items)
        }, 0)

        return (
          <CellStack>
            <CellTitle>{storeOrders.length} {translate('stores')}</CellTitle>
            <CellMeta>{itemsCount} {translate('products')}</CellMeta>
          </CellStack>
        )
      },
    },
    {
      title: translate('orders.table.amounts'),
      render: (_, order) => (
        <CellStack>
          <CellTitle>{currency(getOrderTotal(order))}</CellTitle>
          <CellMeta>
            {translate('orders.detail.platformProfit')}: {currency(order.platformProfit)}
          </CellMeta>
        </CellStack>
      ),
    },
    {
      title: translate('orders.table.payment'),
      dataIndex: 'paymentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: translate('orders.table.fulfillment'),
      dataIndex: 'fulfillmentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: translate('orders.table.actions'),
      align: 'right',
      render: (_, order) => (
        <ActionGroup>
          <Tooltip title={translate('orders.actions.viewDetail')}>
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(buildRoute(ROUTES.ORDER_DETAIL, { id: order._id }))}
            >
              {translate('orders.actions.view')}
            </Button>
          </Tooltip>
        </ActionGroup>
      ),
    },
  ]

  return (
    <OrdersPageShell>
      <OrdersPageHeader>
        <OrdersHeaderText>
          <OrdersTitle>{translate('orders.admin.title')}</OrdersTitle>
          <OrdersSubtitle>{translate('orders.admin.subtitle')}</OrdersSubtitle>
        </OrdersHeaderText>
      </OrdersPageHeader>

      <OrdersToolbar>
        <Input.Search
          allowClear
          value={tableData.search}
          placeholder={translate('orders.search.placeholder')}
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
          scroll={{ x: 980 }}
        />
      </TablePanel>
    </OrdersPageShell>
  )
}

export default AdminOrdersView
