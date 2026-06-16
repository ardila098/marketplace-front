import { Button, Empty, Form, Input, message, Radio, Result } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants/routes'
import { formatPrice } from '../../helpers/formatPrice'
import {
  getCartItemDescription,
  getCartItemName,
  getCartItemSubtotal,
} from '../../helpers/cartItem'

import { clearCartState, selectCartItems, selectCartTotal } from '../../store/slices/cartSlice'

import {
  createOrderFromCart,
  resetCheckoutState,
  selectCheckoutSubmitting,
  selectCreatedOrder,
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

const CheckoutPage = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const submitting = useSelector(selectCheckoutSubmitting)
  const order = useSelector(selectCreatedOrder)

  const handleSubmit = async values => {
    try {
      await dispatch(createOrderFromCart(values)).unwrap()

      dispatch(clearCartState())

      message.success('Orden creada correctamente')
    } catch (error) {
      message.error(error || 'No se pudo crear la orden')
    }
  }

  const handleContinueShopping = () => {
    dispatch(resetCheckoutState())
    navigate(ROUTES.HOME)
  }

  if (order) {
    return (
      <CheckoutContainer>
        <CheckoutCard>
          <Result
            status="success"
            title="Orden creada correctamente"
            subTitle={`Número de orden: ${order.orderNumber}`}
            extra={[
              <Button key="home" type="primary" onClick={handleContinueShopping}>
                Continuar comprando
              </Button>,
            ]}
          />
        </CheckoutCard>
      </CheckoutContainer>
    )
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
              paymentMethod: 'manual',
            }}
            onFinish={handleSubmit}
          >
            <SectionTitle>Datos del cliente</SectionTitle>

            <Form.Item
              label="Nombre completo"
              name={['customer', 'name']}
              rules={[
                {
                  required: true,
                  message: 'Ingresa tu nombre',
                },
              ]}
            >
              <Input placeholder="Ej: Jhonatan Alvarez" />
            </Form.Item>

            <Form.Item
              label="Correo electrónico"
              name={['customer', 'email']}
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

            <Form.Item
              label="Teléfono"
              name={['customer', 'phone']}
              rules={[
                {
                  required: true,
                  message: 'Ingresa tu teléfono',
                },
              ]}
            >
              <Input placeholder="Ej: 3127164121" />
            </Form.Item>

            <SectionTitle>Dirección de envío</SectionTitle>

            <Form.Item
              label="Departamento"
              name={['shippingAddress', 'department']}
              rules={[
                {
                  required: true,
                  message: 'Ingresa el departamento',
                },
              ]}
            >
              <Input placeholder="Ej: Antioquia" />
            </Form.Item>

            <Form.Item
              label="Ciudad"
              name={['shippingAddress', 'city']}
              rules={[
                {
                  required: true,
                  message: 'Ingresa la ciudad',
                },
              ]}
            >
              <Input placeholder="Ej: Medellín" />
            </Form.Item>

            <Form.Item
              label="Dirección"
              name={['shippingAddress', 'address']}
              rules={[
                {
                  required: true,
                  message: 'Ingresa la dirección',
                },
              ]}
            >
              <Input placeholder="Ej: Calle 123 #45-67" />
            </Form.Item>

            <Form.Item label="Barrio" name={['shippingAddress', 'neighborhood']}>
              <Input placeholder="Ej: Laureles" />
            </Form.Item>

            <Form.Item label="Notas adicionales" name={['shippingAddress', 'notes']}>
              <Input.TextArea rows={3} placeholder="Apartamento, indicaciones, horarios, etc." />
            </Form.Item>

            <SectionTitle>Método de pago</SectionTitle>

            <Form.Item
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: 'Selecciona un método de pago',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="manual">Pago manual</Radio>
              </Radio.Group>
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
              Confirmar compra
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
