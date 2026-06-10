import { Button, Empty } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants/routes'
import {
  removeCartItem,
  selectCartItems,
  selectCartTotal,
  selectCartUpdating,
  updateCartItemQuantity,
} from '../../store/slices/cartSlice'

import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'

import {
  CartPageContainer,
  CartPageLayout,
  CartPageCard,
  CartPageTitle,
  CartSummaryCard,
  CartList,
} from '../../components/cart/styles'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME)
  }

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT)
  }

  if (!items.length) {
    return (
      <CartPageContainer>
        <CartPageCard>
          <Empty description="Tu carrito está vacío" />

          <Button type="primary" onClick={handleContinueShopping}>
            Continuar comprando
          </Button>
        </CartPageCard>
      </CartPageContainer>
    )
  }

  return (
    <CartPageContainer>
      <CartPageTitle>
        Carrito
      </CartPageTitle>

      <CartPageLayout>
        <CartPageCard>
          <CartList>
            {items.map(item => (
              <CartItem
                key={item._id}
                item={item}
                updating={updating}
                showSubtotal
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </CartList>
        </CartPageCard>

        <CartSummaryCard>
          <CartSummary
            total={total}
            buttonText="Continuar al checkout"
            onContinue={handleCheckout}
          />
        </CartSummaryCard>
      </CartPageLayout>
    </CartPageContainer>
  )
}

export default CartPage