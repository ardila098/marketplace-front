import { Button, InputNumber, Typography } from 'antd'
import { Trash2 } from 'lucide-react'

import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { formatPrice } from '../../helpers/formatPrice'
import {
  getCartItemDescription,
  getCartItemImage,
  getCartItemName,
  getCartItemSubtotal,
} from '../../helpers/cartItem'

import {
  CartItemWrapper,
  CartItemImage,
  CartItemContent,
  CartItemName,
  CartItemMeta,
  CartItemPrice,
  CartItemActions,
} from './styles'

const CartItem = ({
  item,
  updating = false,
  showSubtotal = false,
  onUpdateQuantity,
  onRemove,
}) => {
  const image = getCartItemImage(item)
  const name = getCartItemName(item)
  const description = getCartItemDescription(item)
  const subtotal = getCartItemSubtotal(item)

  return (
    <CartItemWrapper>
      <CartItemImage
        src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
        width={76}
        height={76}
        preview={false}
      />

      <CartItemContent>
        <CartItemName strong>
          {name}
        </CartItemName>

        {description && (
          <CartItemMeta type="secondary">
            {description}
          </CartItemMeta>
        )}

        <CartItemPrice strong>
          {formatPrice(item.priceSnapshot)}
        </CartItemPrice>

        {showSubtotal && (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Subtotal: {formatPrice(subtotal)}
          </Typography.Text>
        )}

        <CartItemActions>
          <InputNumber
            min={1}
            value={item.quantity}
            disabled={updating}
            onChange={quantity => onUpdateQuantity?.(item._id, quantity)}
          />

          <Button
            type="text"
            danger
            disabled={updating}
            icon={<Trash2 size={16} />}
            onClick={() => onRemove?.(item._id)}
          />
        </CartItemActions>
      </CartItemContent>
    </CartItemWrapper>
  )
}

export default CartItem