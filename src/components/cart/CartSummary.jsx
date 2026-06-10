import { Button, Typography } from 'antd'
import { formatPrice } from '../../helpers/formatPrice'
import {
  SummaryBox,
  SummaryRow,
} from './styles'

const CartSummary = ({
  total = 0,
  buttonText = 'Continuar',
  loading = false,
  disabled = false,
  onContinue,
}) => {
  return (
    <SummaryBox>
      <SummaryRow>
        <Typography.Text type="secondary">
          Subtotal
        </Typography.Text>

        <Typography.Title level={4} style={{ margin: 0 }}>
          {formatPrice(total)}
        </Typography.Title>
      </SummaryRow>

      <Button
        type="primary"
        block
        size="large"
        loading={loading}
        disabled={disabled}
        onClick={onContinue}
      >
        {buttonText}
      </Button>
    </SummaryBox>
  )
}

export default CartSummary