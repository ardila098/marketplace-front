import PropTypes from 'prop-types'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import {
  getItemId,
  getItemImage,
  getItemLabel,
} from '../../../helpers/catalogProduct'

import {
  ThumbnailListWrapper,
  ThumbnailButton,
  ThumbnailImage,
} from './styles'

const ThumbnailList = ({
  items = [],
  selectedItem,
  onChangeItem,
}) => {
  const selectedItemId = getItemId(selectedItem)

  return (
    <ThumbnailListWrapper onClick={event => event.stopPropagation()}>
      {items.slice(0, 7).map(item => {
        const itemId = getItemId(item)
        const itemImage = getItemImage(item)
        const itemLabel = getItemLabel(item)

        return (
          <ThumbnailButton
            key={itemId}
            type="button"
            $active={itemId === selectedItemId}
            title={itemLabel}
            onClick={() => onChangeItem(item)}
          >
            <ThumbnailImage
              src={getUploadUrl(UPLOAD_ROUTES.products.images, itemImage)}
              alt={itemLabel}
            />
          </ThumbnailButton>
        )
      })}
    </ThumbnailListWrapper>
  )
}

ThumbnailList.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.object,
  onChangeItem: PropTypes.func,
}

export default ThumbnailList