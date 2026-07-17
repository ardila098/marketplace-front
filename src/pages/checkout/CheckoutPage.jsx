import { Button, Empty, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PAYMENT_METHODS } from '../../constants/orderConstants'
import { ROUTES } from '../../constants/routes'
import { formatPrice } from '../../helpers/formatPrice'
import {
  getCartItemDescription,
  getCartItemName,
  getCartItemSubtotal,
} from '../../helpers/cartItem'
import {
  clearCartState,
  selectCartCouponCode,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from '../../store/slices/cartSlice'
import {
  createOrderFromCart,
  resetCheckoutState,
  selectCheckoutSubmitting,
} from '../../store/slices/checkoutSlice'
import {
  CheckoutContainer,
  CheckoutTitle,
  CheckoutLayout,
  CheckoutCard,
  CheckoutSummaryCard,
  SectionTitle,
  SummaryItem,
  SummaryItemName,
  SummaryItemMeta,
  SummaryItemPrice,
  SummaryTotal,
} from './styles'

const getCreatedOrder = response => response?.data?.data || response?.data || response || null

const CheckoutPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const discount = useSelector(selectCartDiscount)
  const total = useSelector(selectCartTotal)
  const couponCode = useSelector(selectCartCouponCode)
  const submitting = useSelector(selectCheckoutSubmitting)

  const handleSubmit = async values => {
    try {
      const response = await dispatch(createOrderFromCart(values)).unwrap()
      const createdOrder = getCreatedOrder(response)
      const reference = createdOrder?.paymentReference
      const paymentUrl = createdOrder?.paymentCheckout?.paymentUrl || createdOrder?.paymentUrl

      dispatch(clearCartState())

      if (reference) {
        sessionStorage.setItem('lastCheckoutReference', reference)
      }

      if (createdOrder?.orderNumber) {
        sessionStorage.setItem('lastCheckoutOrderNumber', createdOrder.orderNumber)
      }

      if (paymentUrl) {
        window.location.assign(paymentUrl)
        return
      }

      navigate(`${ROUTES.CHECKOUT_RESULT}${reference ? `?reference=${reference}` : ''}`)
    } catch (error) {
      message.error(error || 'No se pudo crear la orden')
    }
  }

  const handleContinueShopping = () => {
    dispatch(resetCheckoutState())
    navigate(ROUTES.HOME)
  }

  if (!items.length) {
    return (
      <CheckoutContainer>
        <CheckoutCard>
          <Empty description="Tu carrito está vacío" />

          <Button type="primary" onClick={handleContinueShopping}>
            Continuar comprando
          </Button>
        </CheckoutCard>
      </CheckoutContainer>
    )
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      <CheckoutLayout>
        <CheckoutCard>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              paymentMethod: PAYMENT_METHODS.WOMPI.value,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item name="paymentMethod" hidden>
              <Input />
            </Form.Item>

            <SectionTitle>Datos del cliente</SectionTitle>

            <Form.Item
              label="Nombre completo"
              name={['customer', 'name']}
              rules={[{ required: true, message: 'Ingresa tu nombre' }]}
            >
              <Input placeholder="Ej: Jhonatan Alvarez" />
            </Form.Item>

            <Form.Item
              label="Correo electrónico"
              name={['customer', 'email']}
              rules={[
                { required: true, message: 'Ingresa tu correo' },
                { type: 'email', message: 'Ingresa un correo válido' },
              ]}
            >
              <Input placeholder="correo@ejemplo.com" />
            </Form.Item>

            <Form.Item
              label="Teléfono"
              name={['customer', 'phone']}
              rules={[{ required: true, message: 'Ingresa tu teléfono' }]}
            >
              <Input placeholder="Ej: 3127164121" />
            </Form.Item>

            <SectionTitle>Dirección de envío</SectionTitle>

            <Form.Item
              label="Departamento"
              name={['shippingAddress', 'department']}
              rules={[{ required: true, message: 'Ingresa el departamento' }]}
            >
              <Input placeholder="Ej: Antioquia" />
            </Form.Item>

            <Form.Item
              label="Ciudad"
              name={['shippingAddress', 'city']}
              rules={[{ required: true, message: 'Ingresa la ciudad' }]}
            >
              <Input placeholder="Ej: Medellín" />
            </Form.Item>

            <Form.Item
              label="Dirección"
              name={['shippingAddress', 'address']}
              rules={[{ required: true, message: 'Ingresa la dirección' }]}
            >
              <Input placeholder="Ej: Calle 123 #45-67" />
            </Form.Item>

            <Form.Item label="Barrio" name={['shippingAddress', 'neighborhood']}>
              <Input placeholder="Ej: Laureles" />
            </Form.Item>

            <Form.Item label="Notas adicionales" name={['shippingAddress', 'notes']}>
              <Input.TextArea rows={3} placeholder="Apartamento, indicaciones, horarios, etc." />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
              Pagar con Wompi
            </Button>
          </Form>
        </CheckoutCard>

        <CheckoutSummaryCard>
          <SectionTitle>Resumen de compra</SectionTitle>

          {items.map(item => {
            const name = getCartItemName(item)
            const description = getCartItemDescription(item)
            const subtotal = getCartItemSubtotal(item)

            return (
              <SummaryItem key={item._id}>
                <div>
                  <SummaryItemName>{name}</SummaryItemName>
                  {description && <SummaryItemMeta>{description}</SummaryItemMeta>}
                  <SummaryItemMeta>Cantidad: {item.quantity}</SummaryItemMeta>
                </div>

                <SummaryItemPrice>{formatPrice(subtotal)}</SummaryItemPrice>
              </SummaryItem>
            )
          })}

          {discount > 0 && (
            <>
              <SummaryTotal>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </SummaryTotal>

              <SummaryTotal>
                <span>Descuento{couponCode ? ` (${couponCode})` : ''}</span>
                <span>-{formatPrice(discount)}</span>
              </SummaryTotal>
            </>
          )}

          <SummaryTotal>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </SummaryTotal>
        </CheckoutSummaryCard>
      </CheckoutLayout>
    </CheckoutContainer>
  )
}

export default CheckoutPage
