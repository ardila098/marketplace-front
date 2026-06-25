import PropTypes from 'prop-types'

import {
  SelectorBlock,
  SelectorTitle,
  OptionsGrid,
  OptionButton,
  OptionLabel,
  OptionStock,
} from '../styles/styles'

const VariantSelector = ({ item, purchase }) => {
  const variants = item?.variants || []

  if (!variants.length) return null

  return (
    <SelectorBlock>
      <SelectorTitle>Opciones</SelectorTitle>

      <OptionsGrid>
        {variants.map(variant => (
          <OptionButton
            key={variant._id}
            type="button"
            $active={variant._id === purchase.selectedReference?._id}
            onClick={() => purchase.handleSelectReference(variant)}
          >
            <OptionLabel>
              {(variant.attributes || [])
                .map(attribute => attribute.valueSnapshot)
                .filter(Boolean)
                .join(' / ') || variant.name || 'Opción'}
            </OptionLabel>

            <OptionStock>
              {variant.stock || 0} disponibles
            </OptionStock>
          </OptionButton>
        ))}
      </OptionsGrid>
    </SelectorBlock>
  )
}

VariantSelector.propTypes = {
  item: PropTypes.object,
  purchase: PropTypes.object,
}

export default VariantSelector