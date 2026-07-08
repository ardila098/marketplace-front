import { Button, Empty, Form, Input, message } from 'antd'
import { useState } from 'react'

import { formatPrice } from '../../../helpers/formatPrice'
import { orderService } from '../../../services/orderService'

import {
  OrderLookupContainer,
  OrderLookupHero,
  OrderLookupTitle,
  OrderLookupText,
  OrderLookupLayout,
  OrderCard,
  OrderCardTitle,
  OrderResultHeader,
  OrderNumber,
  OrderDate,
  StatusGroup,
  StatusBadge,
  OrderSection,
  OrderSectionTitle,
  OrderItem,
  OrderItemName,
  OrderItemMeta,
  OrderItemPrice,
  TotalRow,
  AddressText,
} from '../styles'

const STATUS_LABELS = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  paid: 'Pagado',
  failed: 'Fallido',
  refunded: 'Reembolsado',
  processing: 'En preparación',
  ready_to_ship: 'Lista para enviar',
  shipped: 'Enviada',
  delivered: 'Entregada',
  manual: 'Manual',
  wompi: 'Wompi',
}

const getLabel = value => {
  return STATUS_LABELS[value] || value || 'Sin estado'
}

const getOrderFromResponse = response => {
  return response?.data?.data || response?.data || response || null
}

const formatDate = value => {
  if (!value) return ''

  return new Date(value).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getItemName = item => {
  return item.productNameSnapshot || item.productName || 'Producto'
}

const getItemDescription = item => {
  return item.itemNameSnapshot || ''
}

const OrderLookupPage = () => {
  const [form] = Form.useForm()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async values => {
    setLoading(true)

    try {
      const response = await orderService.lookupOrder(values)
      const foundOrder = getOrderFromResponse(response)

      setOrder(foundOrder)
      message.success('Orden encontrada')
    } catch (error) {
      setOrder(null)
      message.error(error?.message || 'No se pudo consultar la orden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderLookupContainer>
      <OrderLookupHero>
        <OrderLookupTitle>Consulta tu orden</OrderLookupTitle>

        <OrderLookupText>
          Ingresa el número de orden y el correo usado en la compra para consultar el estado de tu
          pedido.
        </OrderLookupText>
      </OrderLookupHero>

      <OrderLookupLayout>
        <OrderCard>
          <OrderCardTitle>Datos de consulta</OrderCardTitle>

          <Form form={form} layout="vertical" onFinish={handleSearch}>
            <Form.Item
              label="Número de orden"
              name="orderNumber"
              rules={[
                {
                  required: true,
                  message: 'Ingresa el número de orden',
                },
              ]}
            >
              <Input placeholder="Ej: ORD-1781453077630-BFDFA8" />
            </Form.Item>

            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Ingresa tu correo',
                },
                {
                  type: 'email',
                  message: 'Ingresa un correo válido',
                },
              ]}
            >
              <Input placeholder="correo@ejemplo.com" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Consultar orden
            </Button>
          </Form>
        </OrderCard>

        <OrderCard>
          {!order ? (
            <Empty description="Aquí aparecerá la información de tu orden" />
          ) : (
            <>
              <OrderResultHeader>
                <div>
                  <OrderNumber>{order.orderNumber}</OrderNumber>

                  <OrderDate>Creada el {formatDate(order.createdAt)}</OrderDate>
                </div>

                <StatusGroup>
                  <StatusBadge>Orden: {getLabel(order.status)}</StatusBadge>

                  <StatusBadge>Pago: {getLabel(order.paymentStatus)}</StatusBadge>

                  <StatusBadge>Envío: {getLabel(order.fulfillmentStatus)}</StatusBadge>
                </StatusGroup>
              </OrderResultHeader>

              <OrderSection>
                <OrderSectionTitle>Productos</OrderSectionTitle>

                {(order.items || []).map(item => {
                  const name = getItemName(item)
                  const description = getItemDescription(item)

                  return (
                    <OrderItem key={item._id}>
                      <div>
                        <OrderItemName>{name}</OrderItemName>

                        {description && <OrderItemMeta>{description}</OrderItemMeta>}

                        <OrderItemMeta>Cantidad: {item.quantity}</OrderItemMeta>
                      </div>

                      <OrderItemPrice>{formatPrice(item.subtotal)}</OrderItemPrice>
                    </OrderItem>
                  )
                })}

                <TotalRow>
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </TotalRow>
              </OrderSection>

              <OrderSection>
                <OrderSectionTitle>Datos de envío</OrderSectionTitle>

                <AddressText>
                  <div>{order.customer?.name}</div>
                  <div>{order.customer?.email}</div>
                  <div>{order.customer?.phone}</div>
                  <br />
                  <div>
                    {order.shippingAddress?.address}
                    {order.shippingAddress?.neighborhood
                      ? `, ${order.shippingAddress.neighborhood}`
                      : ''}
                  </div>
                  <div>
                    {order.shippingAddress?.city}, {order.shippingAddress?.department}
                  </div>
                  {order.shippingAddress?.notes && <div>Notas: {order.shippingAddress.notes}</div>}
                </AddressText>
              </OrderSection>
            </>
          )}
        </OrderCard>
      </OrderLookupLayout>
    </OrderLookupContainer>
  )
}

export default OrderLookupPage
