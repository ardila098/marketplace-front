import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import AppTable from '../../../../components/common/AppTable'
import StatusTag from '../../../../components/common/StatusTag'

import useSellerOrders from '../../../customer/hooks/useSellerOrders'

import { formatCurrency } from '../../../../utils/formatters'

import {
  OrderCell,
  OrderCellTitle,
  OrderCellText,
} from './style'

const SellerOrdersPage = () => {
  const navigate = useNavigate()

  const { data, getSellerOrders } = useSellerOrders()

  const columns = [
    {
      title: 'Pedido',
      render: (_, order) => (
        <OrderCell>
          <OrderCellTitle>{order.orderNumber}</OrderCellTitle>

          <OrderCellText>
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('es-CO')
              : '-'}
          </OrderCellText>
        </OrderCell>
      ),
    },
    {
      title: 'Cliente',
      render: (_, order) => (
        <OrderCell>
          <OrderCellTitle>
            {order.customer?.name || 'Cliente'}
          </OrderCellTitle>

          <OrderCellText>
            {order.customer?.phone || '-'}
          </OrderCellText>
        </OrderCell>
      ),
    },
    {
      title: 'Productos',
      render: (_, order) => (
        <OrderCell>
          {(order.items || []).map(item => (
            <div key={item._id}>
              <OrderCellTitle>
                {item.productNameSnapshot || 'Producto'}
              </OrderCellTitle>

              <OrderCellText>
                {item.itemNameSnapshot || 'Sin opción'}
              </OrderCellText>

              <OrderCellText>
                Cantidad: {item.quantity}
              </OrderCellText>
            </div>
          ))}
        </OrderCell>
      ),
    },
    {
      title: 'Total tienda',
      render: (_, order) =>
        formatCurrency(order.sellerSubtotal || order.total || 0),
    },
    {
      title: 'Pago',
      dataIndex: 'paymentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: 'Despacho',
      dataIndex: 'fulfillmentStatus',
      render: status => <StatusTag status={status} />,
    },
    {
      title: 'Acción',
      render: (_, order) => (
        <Button
          onClick={() =>
            navigate(`/seller/orderDetail/${order._id}`)
          }
        >
          Ver pedido
        </Button>
      ),
    },
  ]

  return (
    <AppTable
      columns={columns}
      tableData={data}
      onChange={getSellerOrders}
      showCreate={false}
      searchPlaceholder="Buscar pedido, cliente o producto"
    />
  )
}

export default SellerOrdersPage