import { Drawer, Empty } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants/routes'
import {
  closeCartDrawer,
  removeCartItem,
  selectCartItems,
  selectCartTotal,
  selectCartUpdating,
  updateCartItemQuantity,
} from '../../store/slices/cartSlice'

import CartItem from './CartItem'
import CartSummary from './CartSummary'
import { CartList, CartFooter } from './styles'

const CartDrawer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const open = useSelector(state => state.cart.drawerOpen)
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const updating = useSelector(selectCartUpdating)


  const handleUpdateQuantity = (itemId, quantity) => {
    if (!quantity) return

    dispatch(
      updateCartItemQuantity({
        itemId,
        quantity,
      })
    )
  }

  const handleRemoveItem = itemId => {
    dispatch(removeCartItem(itemId))
  }

  const handleGoToCart = () => {
    dispatch(closeCartDrawer())
    navigate(ROUTES.CUSTOMER_CART)
  }

  return (
    <Drawer
      title="Carrito"
      open={open}
      onClose={() => dispatch(closeCartDrawer())}
      width={420}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        },
      }}
    >
      {!items.length ? (
        <Empty description="Tu carrito está vacío" />
      ) : (
        <>
          <CartList>
            {items.map(item => (
              <CartItem
                key={item._id}
                item={item}
                updating={updating}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </CartList>

          <CartFooter>
            <CartSummary
              total={total}
              buttonText="Ver carrito y pagar"
              onContinue={handleGoToCart}
            />
          </CartFooter>
        </>
      )}
    </Drawer>
  )
}

export default CartDrawer
