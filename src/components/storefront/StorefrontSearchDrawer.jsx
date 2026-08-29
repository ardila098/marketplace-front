import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { buildRoute, ROUTES } from '../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { currency } from '../../utils/formatters'
import useStoreCategories from '../../pages/storefront/hooks/useStoreCategories'
import useStoreProducts from '../../pages/storefront/hooks/useStoreProducts'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import {
  CategoryPill,
  CategoryRail,
  ResultBody,
  ResultFallback,
  ResultImage,
  ResultLink,
  ResultPrice,
  ResultsList,
  ResultTitle,
  SearchDrawerPanel,
  SearchEmpty,
  SearchInput,
  SearchStack,
  SearchTrigger,
} from './StorefrontSearchDrawer.styles'

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
  const debouncedSearch = useDebouncedValue(search)
  const activeStoreSlug = open ? storeSlug : null
  const productFilters = useMemo(() => ({
    search: debouncedSearch,
    pageSize: 6,
  }), [debouncedSearch])
  const { categories } = useStoreCategories(activeStoreSlug)
  const { products } = useStoreProducts(activeStoreSlug, productFilters)

  const categoriesPath = resolutionMode === 'host'
    ? '/categories'
    : storeSlug
      ? buildRoute(ROUTES.STOREFRONT_CATEGORIES, { storeSlug })
      : '/categories'

  const productPath = product => {
    return resolutionMode === 'host'
      ? `/products/${product.slug}`
      : buildRoute(ROUTES.STOREFRONT_PRODUCT_DETAIL, {
          storeSlug,
          productSlug: product.slug,
        })
  }

  const categoryPath = category => `${categoriesPath}/${category.slug || category._id}`

  return (
    <>
      <SearchTrigger
        type="text"
        icon={<Search size={18} />}
        onClick={() => setOpen(true)}
      />

      <SearchDrawerPanel
        title={translate('catalog.searchInStore')}
        placement="top"
        size="default"
        open={open}
        onClose={() => setOpen(false)}
      >
        <SearchStack>
          <SearchInput
            autoFocus
            allowClear
            placeholder={translate('catalog.searchStorePlaceholder')}
            value={search}
            onChange={event => setSearch(event.target.value)}
            onSearch={value => setSearch(value)}
          />

          {!!categories.length && (
            <CategoryRail>
              {categories.slice(0, 8).map(category => (
                <CategoryPill
                  key={category._id}
                  to={categoryPath(category)}
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </CategoryPill>
              ))}
            </CategoryRail>
          )}

          {!products.length ? (
            <SearchEmpty description={translate('catalog.searchStoreEmpty')} />
          ) : (
            <ResultsList>
              {products.map(product => {
                const image = getImage(product)

                return (
                  <ResultLink
                    key={product._id || product.slug}
                    to={productPath(product)}
                    onClick={() => setOpen(false)}
                  >
                    {image ? (
                      <ResultImage
                        src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                        alt={product.name}
                      />
                    ) : (
                      <ResultFallback>{product.name?.charAt(0) || 'P'}</ResultFallback>
                    )}
                    <ResultBody>
                      <ResultTitle>{product.name}</ResultTitle>
                      <ResultPrice>{currency(product.minPrice || 0)}</ResultPrice>
                    </ResultBody>
                  </ResultLink>
                )
              })}
            </ResultsList>
          )}
        </SearchStack>
      </SearchDrawerPanel>
    </>
  )
}

export default StorefrontSearchDrawer
