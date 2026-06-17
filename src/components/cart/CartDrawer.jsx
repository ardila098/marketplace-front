import { Button, Drawer, Empty, Image, InputNumber, Space, Typography } from 'antd'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../../constants/routes'
import { closeCartDrawer, removeCartItem, selectCartItems, selectCartTotal, updateCartQuantity } from '../../store/slices/cartSlice'
import { formatCurrency } from '../../utils/formatters'

const Item = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`

const Footer = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
`

const CartDrawer = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.cart.drawerOpen)
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <Drawer
      title="Carrito"
      open={open}
      onClose={() => dispatch(closeCartDrawer())}
      width={420}
      styles={{ body: { display: 'flex', flexDirection: 'column', gap: 16 } }}
    >
      {items.length === 0 ? (
        <Empty description="Tu carrito está vacío" />
      ) : (
        <>
          <div style={{ flex: 1 }}>
            {items.map(item => (
              <Item key={item.id}>
                <Image src={item.variant.image || item.product.images?.[0]} width={72} height={72} preview={false} style={{ objectFit: 'cover', borderRadius: 12 }} />
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Typography.Text strong>{item.product.name}</Typography.Text>
                  <Typography.Text type="secondary">
                    {Object.values(item.variant.attributes || {}).join(' / ')}
                  </Typography.Text>
                  <Typography.Text>{formatCurrency(item.priceSnapshot)}</Typography.Text>
                  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <InputNumber min={1} value={item.quantity} onChange={quantity => dispatch(updateCartQuantity({ id: item.id, quantity }))} />
                    <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => dispatch(removeCartItem(item.id))} />
                  </Space>
                </Space>
              </Item>
            ))}
          </div>
          <Footer>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                <Typography.Text type="secondary">Subtotal</Typography.Text>
                <Typography.Title level={4} style={{ margin: 0 }}>{formatCurrency(total)}</Typography.Title>
              </Space>
              <Link to={ROUTES.CUSTOMER_CART} onClick={() => dispatch(closeCartDrawer())}>
                <Button type="primary" block size="large">Ver carrito y pagar</Button>
              </Link>
            </Space>
          </Footer>
        </>
      )}
    </Drawer>
  )
}

export default CartDrawer
