import { useEffect, useMemo, useState } from 'react'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { getItemImage } from '../../../helpers/catalogProduct'

import {
  GalleryWrapper,
  MainImageBox,
  MainImage,
  GalleryThumbs,
  GalleryThumbButton,
  GalleryThumbImage,
} from '../styles/styles'

const getGalleryImages = (product, selectedItem) => {
  const itemImages = selectedItem?.images || []
  const productImages = product?.images || []
  const mainImage = getItemImage(selectedItem)

  return [...new Set([mainImage, ...itemImages, ...productImages].filter(Boolean))]
}

const ItemGallery = ({ product, selectedItem }) => {
  const images = useMemo(() => {
    return getGalleryImages(product, selectedItem)
  }, [product, selectedItem])

  const [selectedImage, setSelectedImage] = useState(images[0])

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])

  if (!images.length) {
    return (
      <GalleryWrapper>
        <MainImageBox />
      </GalleryWrapper>
    )
  }

  return (
    <GalleryWrapper>
      <MainImageBox>
        <MainImage
          src={getUploadUrl(UPLOAD_ROUTES.products.images, selectedImage)}
          alt={product.name}
        />
      </MainImageBox>

      {images.length > 1 && (
        <GalleryThumbs>
          {images.map(image => (
            <GalleryThumbButton
              key={image}
              type="button"
              $active={image === selectedImage}
              onClick={() => setSelectedImage(image)}
            >
              <GalleryThumbImage
                src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                alt={product.name}
              />
            </GalleryThumbButton>
          ))}
        </GalleryThumbs>
      )}
    </GalleryWrapper>
  )
}

export default ItemGallery
