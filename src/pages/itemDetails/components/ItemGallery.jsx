import { useEffect, useState } from 'react'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'

import GalleryThumbsList from './GalleryThumbsList'

import { GalleryWrapper, MainImageBox, MainImage } from '../styles/styles'

const ItemGallery = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = item?.images || []

  useEffect(() => {
    setSelectedImage(images[0] || null)
  }, [item?._id])

  return (
    <GalleryWrapper>
      <MainImageBox>
        {selectedImage && (
          <MainImage
            src={getUploadUrl(UPLOAD_ROUTES.products.images, selectedImage)}
            alt={item?.name || 'item'}
          />
        )}
      </MainImageBox>

      <GalleryThumbsList
        images={images}
        selectedImage={selectedImage}
        itemName={item?.name}
        onSelect={setSelectedImage}
      />
    </GalleryWrapper>
  )
}

export default ItemGallery