import { Button, Drawer, Empty, Input, List, Space, Tag, Typography } from 'antd'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { currency } from '../../utils/formatters'
import useStoreCategories from '../../pages/storefront/hooks/useStoreCategories'
import useStoreProducts from '../../pages/storefront/hooks/useStoreProducts'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const getImage = product => {
  return product?.image ||
    product?.images?.[0] ||
    product?.selectedItem?.image ||
    product?.selectedItem?.images?.[0] ||
    product?.itemsPreview?.[0]?.image ||
    product?.variants?.[0]?.image ||
    product?.variants?.[0]?.images?.[0]
}

const StorefrontSearchDrawer = ({ storeSlug, resolutionMode }) => {
  const { translate } = useDictionaryTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const activeStoreSlug = open ? storeSlug : null
  const productFilters = useMemo(() => ({
    search,
    pageSize: 6,
  }), [search])
  const { categories } = useStoreCategories(activeStoreSlug)
  const { products } = useStoreProducts(activeStoreSlug, productFilters)

  const productsPath = resolutionMode === 'host'
    ? '/products'
    : storeSlug
      ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug })
      : '/products'

  const productPath = product => {
    return resolutionMode === 'host'
      ? `/products/${product.slug}`
      : buildRoute(ROUTES.STOREFRONT_PRODUCT_DETAIL, {
          storeSlug,
          productSlug: product.slug,
        })
  }

  return (
    <>
      <Button
        type="text"
        icon={<Search size={18} />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        title={translate('catalog.searchInStore')}
        placement="top"
        size="default"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input.Search
            autoFocus
            allowClear
            placeholder={translate('catalog.searchStorePlaceholder')}
            value={search}
            onChange={event => setSearch(event.target.value)}
            onSearch={value => setSearch(value)}
          />

          {!!categories.length && (
            <Space wrap>
              {categories.slice(0, 8).map(category => (
                <Link
                  key={category._id}
                  to={`${productsPath}?category=${category._id}`}
                  onClick={() => setOpen(false)}
                >
                  <Tag style={{ padding: '7px 10px', borderRadius: 8 }}>
                    {category.name}
                  </Tag>
                </Link>
              ))}
            </Space>
          )}

          {!products.length ? (
            <Empty description={translate('catalog.searchStoreEmpty')} />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={products}
              renderItem={product => {
                const image = getImage(product)

                return (
                  <List.Item>
                    <Link
                      to={productPath(product)}
                      onClick={() => setOpen(false)}
                      style={{ width: '100%', color: 'inherit' }}
                    >
                      <List.Item.Meta
                        avatar={
                          image
                            ? (
                                <img
                                  src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                                  alt={product.name}
                                  style={{ width: 54, height: 54, objectFit: 'cover', borderRadius: 8 }}
                                />
                              )
                            : null
                        }
                        title={product.name}
                        description={
                          <Typography.Text type="secondary">
                            {currency(product.minPrice || 0)}
                          </Typography.Text>
                        }
                      />
                    </Link>
                  </List.Item>
                )
              }}
            />
          )}
        </Space>
      </Drawer>
    </>
  )
}

export default StorefrontSearchDrawer
