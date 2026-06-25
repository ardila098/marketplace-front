import PropTypes from 'prop-types'

import { SelectorBlock, SelectorTitle } from '../styles/styles'

import ContainerReferenceParts from './pucharse/components/ContainerReferenceParts'
import ContainerReferencesSlider from './pucharse/components/ContainerReferencesSlider'

const ConfigurableSetSelector = ({ item, purchase }) => {
  return (
    <SelectorBlock>
      <SelectorTitle>Referencias</SelectorTitle>

      <ContainerReferencesSlider
        references={item?.references || []}
        selectedReference={purchase.selectedReference}
        onSelectReference={purchase.handleSelectReference}
      />

      <ContainerReferenceParts
        parts={purchase.parts}
        selectedOptions={purchase.selectedOptions}
        onSelectOption={purchase.handleSelectOption}
      />
    </SelectorBlock>
  )
}

ConfigurableSetSelector.propTypes = {
  item: PropTypes.object,
  purchase: PropTypes.object,
}

export default ConfigurableSetSelector