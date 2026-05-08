import { Card, Image, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buildRoute, ROUTES } from '../../constants/routes'
import { getAssetUrl } from '../../utils/assets'
import { currency } from '../../utils/formatters'

const ImageWrap = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: #f4f4f5;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform .25s ease; }
  &:hover img { transform: scale(1.03); }
`

const VariantPreview = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`

const PreviewImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  background: #fff;
`

const Dot = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: ${({ $color }) => $color || '#fff'};
`

const ProductCard = ({ product, storeSlug }) => {
  const image = getAssetUrl(product.images?.[0] || product.variants?.[0]?.image)
  const price = product.variants?.[0]?.price || product.price
  const to = storeSlug
    ? buildRoute(ROUTES.STOREFRONT_PRODUCT_DETAIL, { storeSlug, productSlug: product.slug })
    : buildRoute(ROUTES.PRODUCT_DETAIL, { productSlug: product.slug })

  return (
    <Link to={to}>
      <Card hoverable bordered={false} styles={{ body: { padding: 14 } }} style={{ borderRadius: 22, height: '100%' }}>
        <ImageWrap>{image && <Image src={image} alt={product.name} preview={false} />}</ImageWrap>
        <Space direction="vertical" size={2} style={{ marginTop: 12, width: '100%' }}>
          <Typography.Text strong>{product.name}</Typography.Text>
          <Typography.Text type="secondary">{product.store?.name || product.category}</Typography.Text>
          <Typography.Text strong>{currency(price)}</Typography.Text>
          <VariantPreview>
            {(product.variants || []).slice(0, 5).map(variant => (
              variant.image
                ? <PreviewImage key={variant._id || variant.sku} src={variant.image} title={Object.values(variant.attributes || {}).join(' / ')} />
                : <Dot key={variant._id || variant.sku} title={variant.attributes?.color} $color={variant.attributes?.hex || variant.hex} />
            ))}
          </VariantPreview>
        </Space>
      </Card>
    </Link>
  )
}

export default ProductCard
