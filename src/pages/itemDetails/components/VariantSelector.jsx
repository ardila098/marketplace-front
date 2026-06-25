import PropTypes from 'prop-types'

import { SelectorBlock, SelectorTitle } from '../styles/styles'
import ContainerVariantsSlider from './pucharse/components/ContainerVariantsSlider'

const VariantSelector = ({ item, purchase }) => {
  return (
    <SelectorBlock>
      <SelectorTitle>Selecciona una opción</SelectorTitle>

      <ContainerVariantsSlider
        variants={item?.variants || []}
        selectedVariant={purchase.selectedReference}
        onSelectVariant={purchase.handleSelectReference}
      />
    </SelectorBlock>
  )
}

VariantSelector.propTypes = {
  item: PropTypes.object,
  purchase: PropTypes.object,
}

export default VariantSelector