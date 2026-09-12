import { useMemo } from 'react'

import ProductShowcase from '../../../components/marketplace/ProductShowcase/ProductShowcase'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'

const VerticalFeaturedShowcase = ({ dataVertical, featured = [] }) => {
  const productImages = useMemo(
    () =>
      featured
        .map(product => {
          const image =
            product?.image ||
            product?.images?.[0] ||
            product?.selectedItem?.image

          return image
            ? getUploadUrl(UPLOAD_ROUTES.products.images, image)
            : ''
        })
        .filter(Boolean)
        .slice(0, 8),
    [featured]
  )

  if (!dataVertical?.showcaseEnabled) return null

  const bannerUrl = getUploadUrl(
    UPLOAD_ROUTES.verticals.banners,
    dataVertical.banner || dataVertical.image
  )
  const configuredBackground = getUploadUrl(
    UPLOAD_ROUTES.verticals.banners,
    dataVertical.showcaseBackgroundImage
  )
  const backgroundImage = configuredBackground || bannerUrl
  const backgroundType = dataVertical.showcaseBackgroundType || 'color'
  const frameStyle = dataVertical.showcaseFrameStyle || 'transparent'

  return (
    <ProductShowcase
      mode="brand"
      images={productImages}
      frameStyle={frameStyle}
      allowEmpty
      config={{
        enabled: true,
        background: backgroundType === 'image' && backgroundImage
          ? {
              type: 'image',
              image: backgroundImage,
              position: dataVertical.showcaseBackgroundPosition || 'center',
              overlayEnabled: dataVertical.showcaseOverlayEnabled === true,
              overlayOpacity: Number(dataVertical.showcaseOverlayOpacity) || 0.45,
            }
          : {
              type: 'color',
              color: dataVertical.showcaseBackgroundColor || '#f6f1ea',
            },
      }}
      brandCopy={{
        eyebrow: 'Vertical',
        title: dataVertical.name,
        subtitle: dataVertical.description || '',
        primaryLabel: '',
        secondaryLabel: '',
      }}
    />
  )
}

export default VerticalFeaturedShowcase
