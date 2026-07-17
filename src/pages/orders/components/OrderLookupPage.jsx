import { Button, Empty, Form, Image, Input, message } from 'antd'
import { Package } from 'lucide-react'
import { useMemo, useState } from 'react'

import StatusTag from '../../../components/common/StatusTag'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { formatPrice } from '../../../helpers/formatPrice'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { orderService } from '../../../services/orderService'

import {
  AddressText,
  OrderCard,
  OrderCardTitle,
  OrderDate,
  OrderItem,
  OrderItemImage,
  OrderItemMeta,
  OrderItemName,
  OrderItemPrice,
  OrderLookupContainer,
  OrderLookupHero,
  OrderLookupLayout,
  OrderLookupText,
  OrderLookupTitle,
  OrderNumber,
  OrderResultHeader,
  OrderSection,
  OrderSectionTitle,
  StatusBadge,
  StatusGroup,
  StoreOrderBlock,
  StoreOrderHeader,
  StoreOrderTitle,
  SummaryGrid,
  SummaryRow,
  TotalRow,
} from '../styles'

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

const getStoreName = (storeOrder, translate) => {
  return storeOrder?.store?.name || storeOrder?.storeNameSnapshot || translate('orders.lookup.storeFallback')
}

const getItemName = (item, translate) => {
  return item.productNameSnapshot || item.productName || translate('orders.lookup.productFallback')
}

const getItemDescription = (item, translate) => {
  return item.itemNameSnapshot || item.referenceSnapshot?.name || translate('orders.lookup.itemFallback')
}

const getOrderStoreOrders = order => {
  return Array.isArray(order?.storeOrders) ? order.storeOrders : []
}

const getOrderProductsCount = order => {
  return getOrderStoreOrders(order).reduce((total, storeOrder) => {
    return total + (storeOrder.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)
  }, 0)
}

const OrderLookupPage = () => {
  const { translate } = useDictionaryTranslation()
  const [form] = Form.useForm()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const storeOrders = useMemo(() => getOrderStoreOrders(order), [order])
  const productsCount = useMemo(() => getOrderProductsCount(order), [order])

  const handleSearch = async values => {
    setLoading(true)

    try {
      const response = await orderService.lookupOrder({
        orderNumber: values.orderNumber?.trim(),
        email: values.email?.trim(),
      })
      const foundOrder = getOrderFromResponse(response)

      setOrder(foundOrder)
      message.success(translate('orders.lookup.success'))
    } catch (error) {
      setOrder(null)
      message.error(error?.message || translate('orders.lookup.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderLookupContainer>
      <OrderLookupHero>
        <OrderLookupTitle>{translate('orders.lookup.title')}</OrderLookupTitle>

        <OrderLookupText>
          {translate('orders.lookup.subtitle')}
        </OrderLookupText>
      </OrderLookupHero>

      <OrderLookupLayout>
        <OrderCard>
          <OrderCardTitle>{translate('orders.lookup.formTitle')}</OrderCardTitle>

          <Form form={form} layout="vertical" onFinish={handleSearch}>
            <Form.Item
              label={translate('orders.lookup.orderNumber')}
              name="orderNumber"
              rules={[
                {
                  required: true,
                  message: translate('orders.lookup.orderNumberRequired'),
                },
              ]}
            >
              <Input placeholder={translate('orders.lookup.orderNumberPlaceholder')} />
            </Form.Item>

            <Form.Item
              label={translate('orders.lookup.email')}
              name="email"
              rules={[
                {
                  required: true,
                  message: translate('orders.lookup.emailRequired'),
                },
                {
                  type: 'email',
                  message: translate('orders.lookup.emailInvalid'),
                },
              ]}
            >
              <Input placeholder={translate('orders.lookup.emailPlaceholder')} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {translate('orders.lookup.submit')}
            </Button>
          </Form>
        </OrderCard>

        <OrderCard>
          {!order ? (
            <Empty description={translate('orders.lookup.empty')} />
          ) : (
            <>
              <OrderResultHeader>
                <div>
                  <OrderNumber>{order.orderNumber}</OrderNumber>

                  <OrderDate>
                    {translate('orders.lookup.createdAt')} {formatDate(order.createdAt)}
                  </OrderDate>
                </div>

                <StatusGroup>
                  <StatusBadge>
                    {translate('orders.lookup.orderStatus')}: <StatusTag status={order.status} />
                  </StatusBadge>
                  <StatusBadge>
                    {translate('orders.lookup.paymentStatus')}: <StatusTag status={order.paymentStatus} />
                  </StatusBadge>
                  <StatusBadge>
                    {translate('orders.lookup.shippingStatus')}: <StatusTag status={order.fulfillmentStatus} />
                  </StatusBadge>
                </StatusGroup>
              </OrderResultHeader>

              <OrderSection>
                <OrderSectionTitle>{translate('orders.lookup.summary')}</OrderSectionTitle>
                <SummaryGrid>
                  <SummaryRow>
                    <span>{translate('products')}</span>
                    <strong>{productsCount}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{translate('subtotal')}</span>
                    <strong>{formatPrice(order.subtotal)}</strong>
                  </SummaryRow>
                  {Number(order.discountTotal || 0) > 0 && (
                    <SummaryRow>
                      <span>{translate('discount')}</span>
                      <strong>-{formatPrice(order.discountTotal)}</strong>
                    </SummaryRow>
                  )}
                  <SummaryRow>
                    <span>{translate('shipping')}</span>
                    <strong>{formatPrice(order.shippingTotal)}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{translate('orders.lookup.paymentMethod')}</span>
                    <strong>{order.paymentProvider || order.paymentMethod || translate('orders.payment.wompi')}</strong>
                  </SummaryRow>
                </SummaryGrid>
                <TotalRow>
                  <span>{translate('total')}</span>
                  <span>{formatPrice(order.totalPaid || order.total)}</span>
                </TotalRow>
              </OrderSection>

              <OrderSection>
                <OrderSectionTitle>{translate('orders.lookup.storeOrders')}</OrderSectionTitle>

                {!storeOrders.length ? (
                  <Empty description={translate('orders.lookup.noProducts')} />
                ) : (
                  storeOrders.map(storeOrder => (
                    <StoreOrderBlock key={storeOrder._id || storeOrder.storeOrderNumber}>
                      <StoreOrderHeader>
                        <div>
                          <StoreOrderTitle>{getStoreName(storeOrder, translate)}</StoreOrderTitle>
                          <OrderItemMeta>{storeOrder.storeOrderNumber}</OrderItemMeta>
                        </div>
                        <StatusTag status={storeOrder.status} />
                      </StoreOrderHeader>

                      {(storeOrder.items || []).map(item => {
                        const imageUrl = getUploadUrl(UPLOAD_ROUTES.products.images, item.imageSnapshot)

                        return (
                          <OrderItem key={item._id}>
                            <OrderItemImage>
                              {imageUrl ? (
                                <Image src={imageUrl} alt={getItemName(item, translate)} preview={false} />
                              ) : (
                                <Package size={22} />
                              )}
                            </OrderItemImage>

                            <div>
                              <OrderItemName>{getItemName(item, translate)}</OrderItemName>
                              <OrderItemMeta>{getItemDescription(item, translate)}</OrderItemMeta>
                              <OrderItemMeta>
                                {translate('orders.lookup.quantity')}: {item.quantity}
                              </OrderItemMeta>
                            </div>

                            <OrderItemPrice>{formatPrice(item.subtotal)}</OrderItemPrice>
                          </OrderItem>
                        )
                      })}
                    </StoreOrderBlock>
                  ))
                )}
              </OrderSection>

              <OrderSection>
                <OrderSectionTitle>{translate('orders.lookup.shippingData')}</OrderSectionTitle>

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
                  {order.shippingAddress?.notes && (
                    <div>{translate('orders.lookup.notes')}: {order.shippingAddress.notes}</div>
                  )}
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
