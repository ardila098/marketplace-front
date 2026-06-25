import PropTypes from 'prop-types'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'

import {
  GalleryThumbs,
  GalleryThumbButton,
  GalleryThumbImage,
} from '../../../styles/styles'

const ContainerVariantsSlider = ({
  variants = [],
  selectedVariant,
  onSelectVariant,
}) => {
  if (!variants.length) return null

  return (
    <GalleryThumbs>
      {variants.map(variant => (
        <GalleryThumbButton
          key={variant._id}
          type="button"
          $active={variant._id === selectedVariant?._id}
          onClick={() => onSelectVariant(variant)}
        >
          <GalleryThumbImage
            src={getUploadUrl(
              UPLOAD_ROUTES.products.images,
              variant.images?.[0]
            )}
            alt={variant.name || 'Variante'}
          />
        </GalleryThumbButton>
      ))}
    </GalleryThumbs>
  )
}

ContainerVariantsSlider.propTypes = {
  variants: PropTypes.array,
  selectedVariant: PropTypes.object,
  onSelectVariant: PropTypes.func,
}

export default ContainerVariantsSlider