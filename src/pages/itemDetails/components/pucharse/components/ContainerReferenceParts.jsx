import PropTypes from 'prop-types'

import {
  OptionButton,
  OptionLabel,
  OptionsGrid,
  OptionStock,
  PartBlock,
  SelectorTitle,
} from '../../../styles/styles'

const ContainerReferenceParts = ({
  parts = [],
  selectedOptions = {},
  onSelectOption,
}) => {
  return (
    <>
      {parts.map(part => (
        <PartBlock key={part._id}>
          <SelectorTitle>{part.name}</SelectorTitle>

          <OptionsGrid>
            {(part.options || []).map(option => (
              <OptionButton
                key={option.inventoryItemId}
                type="button"
                $active={selectedOptions[part._id] === option.inventoryItemId}
                onClick={() => onSelectOption(part._id, option.inventoryItemId)}
              >
                <OptionLabel>
                  {(option.attributes || [])
                    .map(attribute => attribute.valueSnapshot)
                    .filter(Boolean)
                    .join(' / ') || 'Opción'}
                </OptionLabel>

                <OptionStock>
                  {option.stock || 0} disponibles
                </OptionStock>
              </OptionButton>
            ))}
          </OptionsGrid>
        </PartBlock>
      ))}
    </>
  )
}

ContainerReferenceParts.propTypes = {
  parts: PropTypes.array,
  selectedOptions: PropTypes.object,
  onSelectOption: PropTypes.func,
}

export default ContainerReferenceParts