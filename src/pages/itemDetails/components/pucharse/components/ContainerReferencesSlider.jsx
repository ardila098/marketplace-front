import PropTypes from 'prop-types'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../../../constants/uploadRoutes'

import {
  GalleryThumbs,
  GalleryThumbButton,
  GalleryThumbImage,
} from '../../../styles/styles'

const ContainerReferencesSlider = ({
  references = [],
  selectedReference,
  onSelectReference,
}) => {
  if (!references.length) return null

  return (
    <GalleryThumbs>
      {references.map(reference => (
        <GalleryThumbButton
          key={reference._id}
          type="button"
          $active={reference._id === selectedReference?._id}
          onClick={() => onSelectReference(reference)}
        >
          <GalleryThumbImage
            src={getUploadUrl(
              UPLOAD_ROUTES.products.images,
              reference.images?.[0]
            )}
            alt={reference.name || 'Referencia'}
          />
        </GalleryThumbButton>
      ))}
    </GalleryThumbs>
  )
}

ContainerReferencesSlider.propTypes = {
  references: PropTypes.array,
  selectedReference: PropTypes.object,
  onSelectReference: PropTypes.func,
}

export default ContainerReferencesSlider