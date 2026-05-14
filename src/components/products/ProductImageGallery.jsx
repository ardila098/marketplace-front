import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { getAssetUrl } from '../../utils/assets'

const Gallery = styled.div`
  display: grid;
  gap: 14px;
`

const MainImage = styled.div`
  aspect-ratio: 1 / 1;
  background: #f5f5f5;
  border-radius: 26px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Thumbs = styled.div`
  display: flex;
  gap: 10px;
  overflow: auto;
`

const Thumb = styled.button`
  width: 74px;
  height: 74px;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => ($active ? '#111' : '#e5e7eb')};
  padding: 0;
  overflow: hidden;
  background: #fff;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProductImageGallery = ({ images }) => {
  const normalizedImages = useMemo(() => {
    return (images || []).map(getAssetUrl).filter(Boolean)
  }, [images])

  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!normalizedImages.length) return <MainImage />

  const safeSelectedIndex = normalizedImages[selectedIndex] ? selectedIndex : 0
  const selectedImage = normalizedImages[safeSelectedIndex]

  return (
    <Gallery>
      <MainImage>
        <img src={selectedImage} alt="Producto" />
      </MainImage>

      <Thumbs>
        {normalizedImages.map((image, index) => (
          <Thumb
            key={image}
            type="button"
            $active={index === safeSelectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image} alt="Vista previa" />
          </Thumb>
        ))}
      </Thumbs>
    </Gallery>
  )
}

export default ProductImageGallery