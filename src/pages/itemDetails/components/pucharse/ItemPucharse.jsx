import PropTypes from 'prop-types'
import { Button, Row } from 'antd'
import { PRODUCT_TYPES } from '../../../../constants/productTypeConstants'
import ConfigurableSetSelector from '../ConfigurableSetSelector'
import VariantSelector from '../VariantSelector'

import { AddCartButtonWrapper, PurchasePanel } from '../../styles/styles'

const ItemPucharse = ({ item, purchase }) => {
  if (!item) return null

  return (
    <PurchasePanel>
      <Row>
        {item.productType === PRODUCT_TYPES.CONFIGURABLE_SET.value ? (
          <ConfigurableSetSelector
            item={item}
            purchase={purchase}
          />
        ) : (
          <VariantSelector
            item={item}
            purchase={purchase}
          />
        )}
      </Row>

      <Row>
        <AddCartButtonWrapper>
          <Button
            type="primary"
            size="large"
            block
            loading={purchase.adding}
            disabled={!purchase.isValid}
            onClick={purchase.handleAddCart}
          >
            Agregar al carrito
          </Button>
        </AddCartButtonWrapper>
      </Row>
    </PurchasePanel>
  )
}

ItemPucharse.propTypes = {
  item: PropTypes.object,
  purchase: PropTypes.object,
}

export default ItemPucharse