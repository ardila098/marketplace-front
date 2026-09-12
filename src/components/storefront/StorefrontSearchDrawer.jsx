import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import ProductCard from '../products/ProductCard'
import { buildRoute, ROUTES } from '../../constants/routes'
import useStoreCategories from '../../pages/storefront/hooks/useStoreCategories'
import useStoreProducts from '../../pages/storefront/hooks/useStoreProducts'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import {
  CategoryPill,
  CategoryRail,
  ResultsList,
  SearchDrawerPanel,
  SearchEmpty,
  SearchInput,
  SearchStack,
  SearchTrigger,
} from './StorefrontSearchDrawer.styles'

const StorefrontSearchDrawer = ({ storeSlug, resolutionMode }) => {
  const { translate } = useDictionaryTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const debouncedSearch = useDebouncedValue(search)
  const activeStoreSlug = open ? storeSlug : null
  const productFilters = useMemo(() => ({
    search: debouncedSearch,
    storeCategory: selectedCategory || undefined,
    pageSize: 12,
  }), [debouncedSearch, selectedCategory])
  const { categories } = useStoreCategories(activeStoreSlug)
  const { products } = useStoreProducts(activeStoreSlug, productFilters)

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
      <SearchTrigger
        type="text"
        icon={<Search size={18} />}
        onClick={() => setOpen(true)}
      />

      <SearchDrawerPanel
        title={translate('catalog.searchInStore')}
        placement="bottom"
        height="88vh"
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
              <CategoryPill
                type="button"
                $active={!selectedCategory}
                onClick={() => setSelectedCategory('')}
              >
                Todas
              </CategoryPill>
              {categories.slice(0, 8).map(category => (
                <CategoryPill
                  key={category._id}
                  type="button"
                  $active={selectedCategory === String(category._id)}
                  onClick={() => setSelectedCategory(String(category._id))}
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
              {products.map(product => (
                <div key={product._id || product.slug} onClick={() => setOpen(false)}>
                  <ProductCard
                    product={product}
                    detailPath={productPath(product)}
                  />
                </div>
              ))}
            </ResultsList>
          )}
        </SearchStack>
      </SearchDrawerPanel>
    </>
  )
}

export default StorefrontSearchDrawer
