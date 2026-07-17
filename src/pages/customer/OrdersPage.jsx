import { Button, Empty, Input, Space, Table, Typography } from 'antd'
import { Link } from 'react-router-dom'

import StatusTag from '../../components/common/StatusTag'
import { ROUTES, buildRoute } from '../../constants/routes'
import useOrders from '../orders/hooks/useOrders'
import { currency } from '../../utils/formatters'
import { formatOrderDate, getOrderTotal } from '../orders/orderViewUtils'

const OrdersPage = () => {
  const { tableData, loading } = useOrders()

  const columns = [
    {
      title: 'Orden',
      render: (_, order) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{order.orderNumber}</Typography.Text>
          <Typography.Text type="secondary">{formatOrderDate(order.createdAt)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Total',
      render: (_, order) => currency(getOrderTotal(order)),
    },
    {
      title: 'Pago',
      dataIndex: 'paymentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: 'Envío',
      dataIndex: 'fulfillmentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: 'Tiendas',
      render: (_, order) => order.storeOrders?.length || 0,
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, order) => (
        <Link to={buildRoute(ROUTES.ORDER_DETAIL, { id: order._id })}>
          <Button>Ver detalle</Button>
        </Link>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Mis órdenes
        </Typography.Title>
        <Typography.Text type="secondary">
          Consulta el estado de tus compras y pagos.
        </Typography.Text>
      </div>

      <Input.Search
        allowClear
        placeholder="Buscar por número de orden"
        value={tableData.search}
        onChange={event => tableData.handleSearch(event.target.value)}
        style={{ maxWidth: 360 }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={tableData.rows}
        loading={loading}
        locale={{
          emptyText: <Empty description="Todavía no tienes órdenes" />,
        }}
        pagination={{
          current: tableData.page,
          pageSize: tableData.pageSize,
          total: tableData.total,
          showSizeChanger: true,
        }}
        onChange={tableData.handleTableChange}
        scroll={{ x: 760 }}
      />
    </Space>
  )
}

export default OrdersPage
