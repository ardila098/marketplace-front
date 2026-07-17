import { Button, Empty, Spin } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

import { PAYMENT_STATUS, STORE_ORDER_STATUS } from '../../../constants/orderConstants'
import { ROLES } from '../../../constants/roles'
import { useAuth } from '../../../hooks/useAuth'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { currency } from '../../../utils/formatters'
import useOrders from '../hooks/useOrders'
import {
  formatOrderDate,
  getAddressLine,
  getAdminOrderItems,
  getOrderTotal,
  getStoreName,
} from '../orderViewUtils'
import { DetailContainer, DetailGrid, DetailSide } from '../style'
import OrderDetailHeader from './OrderDetailHeader'
import OrderInfoPanel from './OrderInfoPanel'
import OrderItemsPanel from './OrderItemsPanel'
import OrderMetrics from './OrderMetrics'
import StoreOrdersPanel from './StoreOrdersPanel'

const canSellerSendToPlatform = storeOrder => {
  const isPaid = storeOrder?.order?.paymentStatus === PAYMENT_STATUS.APPROVED.value
  const isPendingDispatch = [
    STORE_ORDER_STATUS.PENDING.value,
    STORE_ORDER_STATUS.PREPARING.value,
  ].includes(storeOrder?.status)

  return isPaid && isPendingDispatch
}

const OrdersDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { role } = useAuth()
  const { translate } = useDictionaryTranslation()
  const {
    order,
    detailLoading,
    actionLoadingId,
    getOrder,
    markStoreOrderSent,
    markStoreOrderReceived,
  } = useOrders(id)

  const isSeller = Number(role) === ROLES.SELLER.value
  const isAdmin = Number(role) === ROLES.ADMIN.value
  const parentOrder = isSeller ? order?.order : order
  const storeOrder = isSeller ? order : null
  const customer = parentOrder?.customer || {}
  const sellerCanSend = canSellerSendToPlatform(storeOrder)
  const detailTitle = isSeller
    ? storeOrder?.storeOrderNumber
    : parentOrder?.orderNumber
  const detailSubtitle = isSeller
    ? `${translate('orders.table.parentOrder')}: ${parentOrder?.orderNumber || '-'}`
    : `${translate('orders.detail.createdAt')}: ${formatOrderDate(parentOrder?.createdAt)}`

  const handleSellerSend = async () => {
    const updated = await markStoreOrderSent(storeOrder._id)

    if (updated) {
      getOrder()
    }
  }

  const handleStoreOrderReceived = async selectedStoreOrder => {
    const updated = await markStoreOrderReceived(selectedStoreOrder._id)

    if (updated) {
      getOrder()
    }
  }

  const metrics = isSeller
    ? [
        {
          label: translate('orders.detail.subtotal'),
          value: currency(storeOrder?.subtotal),
        },
        {
          label: translate('orders.detail.gatewayFee'),
          value: currency(storeOrder?.paymentGatewayFeeShare),
        },
        {
          label: translate('orders.detail.platformCommission'),
          value: currency(storeOrder?.platformCommissionAmount),
        },
        {
          label: translate('orders.detail.payout'),
          value: currency(storeOrder?.payoutAmount),
        },
      ]
    : [
        {
          label: translate('orders.detail.totalPaid'),
          value: currency(getOrderTotal(parentOrder)),
        },
        {
          label: translate('orders.detail.gatewayFee'),
          value: currency(parentOrder?.paymentGatewayFeeTotal),
        },
        {
          label: translate('orders.detail.sellerPayoutTotal'),
          value: currency(parentOrder?.sellerPayoutTotal),
        },
        {
          label: translate('orders.detail.platformProfit'),
          value: currency(parentOrder?.platformProfit),
        },
      ]

  const customerRows = [
    { label: translate('orders.detail.name'), value: customer.name },
    { label: translate('orders.detail.email'), value: customer.email },
    { label: translate('orders.detail.phone'), value: customer.phone },
  ]

  const shippingRows = [
    {
      label: translate('orders.detail.address'),
      value: getAddressLine(parentOrder?.shippingAddress),
    },
    {
      label: translate('orders.detail.notes'),
      value: parentOrder?.shippingAddress?.notes,
    },
  ]

  const financeRows = isSeller
    ? [
        {
          label: translate('orders.detail.commissionRate'),
          value: `${storeOrder?.platformCommissionRate || 0}%`,
        },
        {
          label: translate('orders.detail.sentAt'),
          value: formatOrderDate(storeOrder?.sentToPlatformAt),
        },
        {
          label: translate('orders.detail.receivedAt'),
          value: formatOrderDate(storeOrder?.receivedByPlatformAt),
        },
      ]
    : [
        {
          label: translate('orders.detail.subtotal'),
          value: currency(parentOrder?.subtotal),
        },
        {
          label: translate('orders.detail.shippingTotal'),
          value: currency(parentOrder?.shippingTotal),
        },
        {
          label: translate('orders.detail.shippingCost'),
          value: currency(parentOrder?.shippingCost),
        },
        {
          label: translate('orders.detail.platformCommission'),
          value: currency(parentOrder?.platformCommissionTotal),
        },
      ]

  const statuses = isSeller
    ? [parentOrder?.paymentStatus, storeOrder?.status, storeOrder?.payoutStatus]
    : [parentOrder?.status, parentOrder?.paymentStatus, parentOrder?.fulfillmentStatus]

  const items = isSeller ? storeOrder?.items || [] : getAdminOrderItems(parentOrder)

  return (
    <DetailContainer>
      <Spin spinning={detailLoading}>
        {!order && !detailLoading ? (
          <Empty description={translate('orders.messages.detailEmpty')} />
        ) : (
          <DetailContainer>
            <OrderDetailHeader
              title={detailTitle || translate('orders.detail.order')}
              subtitle={detailSubtitle}
              statuses={statuses}
              onBack={() => navigate(-1)}
            >
              {isSeller && (
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  disabled={!sellerCanSend}
                  loading={actionLoadingId === storeOrder?._id}
                  onClick={handleSellerSend}
                >
                  {translate('orders.actions.markSent')}
                </Button>
              )}

            </OrderDetailHeader>

            <OrderMetrics metrics={metrics} />

            <DetailGrid>
              <OrderItemsPanel
                title={
                  isSeller
                    ? translate('orders.detail.productsToDispatch')
                    : translate('orders.detail.products')
                }
                items={items}
              />

              <DetailSide>
                {isSeller && (
                  <OrderInfoPanel
                    title={translate('orders.detail.store')}
                    rows={[
                      { label: translate('orders.detail.store'), value: getStoreName(storeOrder) },
                      {
                        label: translate('orders.detail.shippingFlow'),
                        value: translate('orders.detail.platformShippingFlow'),
                      },
                    ]}
                    emptyText={translate('orders.detail.noStoreInfo')}
                  />
                )}

                <OrderInfoPanel
                  title={translate('orders.detail.customer')}
                  rows={customerRows}
                  emptyText={translate('orders.detail.noCustomerInfo')}
                />

                {isAdmin && (
                  <OrderInfoPanel
                    title={translate('orders.detail.shipping')}
                    rows={shippingRows}
                    emptyText={translate('orders.detail.noShippingInfo')}
                  />
                )}

                <OrderInfoPanel
                  title={translate('orders.detail.finance')}
                  rows={financeRows}
                  emptyText={translate('orders.detail.noFinanceInfo')}
                />
              </DetailSide>
            </DetailGrid>

            {isAdmin && (
              <StoreOrdersPanel
                storeOrders={parentOrder?.storeOrders || []}
                loadingId={actionLoadingId}
                onReceive={handleStoreOrderReceived}
              />
            )}
          </DetailContainer>
        )}
      </Spin>
    </DetailContainer>
  )
}

export default OrdersDetails
