import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'

import { GalleryThumbs, GalleryThumbButton, GalleryThumbImage } from '../styles/styles'

const GalleryThumbsList = ({ images = [], selectedImage, productName = 'Producto', onSelect }) => {
  if (images.length <= 1) return null

  return (
    <GalleryThumbs>
      {images.map(image => (
        <GalleryThumbButton
          key={image}
          type="button"
          $active={image === selectedImage}
          onClick={() => onSelect(image)}
        >
          <GalleryThumbImage
            src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
            alt={productName}
          />
        </GalleryThumbButton>
      ))}
    </GalleryThumbs>
  )
}

export default GalleryThumbsList
