import { Input, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import ProductFiltersPanel from '../../components/catalog/ProductFiltersPanel'
import {
  CatalogContent,
  CatalogHeader,
  CatalogLayout,
  CatalogToolbar,
  CatalogTitle,
  Eyebrow,
  ResultCount,
} from '../../components/catalog/catalogStyles'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { PageShell } from '../../styles/layoutStyles'
import useStoreCategories from './hooks/useStoreCategories'
import useStoreProducts from './hooks/useStoreProducts'

const parsePriceParam = value => {
  if (!value) return null

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

const StorefrontProductsPage = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const store = useSelector(state => state.storefront.currentStore)
  const activeStoreSlug = storeSlug || store?.slug
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'newest'
  const minPrice = parsePriceParam(searchParams.get('minPrice'))
  const maxPrice = parsePriceParam(searchParams.get('maxPrice'))
  const isOutlet = location.pathname.endsWith('/outlet') || searchParams.get('discounted') === 'true'
  const [searchDraft, setSearchDraft] = useState(search)
  const [minPriceDraft, setMinPriceDraft] = useState(minPrice)
  const [maxPriceDraft, setMaxPriceDraft] = useState(maxPrice)
  const debouncedSearchDraft = useDebouncedValue(searchDraft)

  const filters = useMemo(() => ({
    search,
    category: category === 'all' ? undefined : category,
    discounted: isOutlet ? 'true' : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sort,
    pageSize: 48,
  }), [category, isOutlet, maxPrice, minPrice, search, sort])

  const { products, loading } = useStoreProducts(activeStoreSlug, filters)
  const { categories } = useStoreCategories(activeStoreSlug)
  const categoryOptions = useMemo(() => {
    return categories.map(item => ({
      label: `${item.name} (${item.productCount})`,
      value: item._id,
    }))
  }, [categories])

  useEffect(() => {
    setSearchDraft(search)
    setMinPriceDraft(minPrice)
    setMaxPriceDraft(maxPrice)
  }, [maxPrice, minPrice, search])

  useEffect(() => {
    const nextSearch = debouncedSearchDraft.trim()
    if (nextSearch === search) return

    const next = new URLSearchParams(searchParams)

    if (nextSearch) {
      next.set('search', nextSearch)
    } else {
      next.delete('search')
    }

    setSearchParams(next)
  }, [debouncedSearchDraft, search, searchParams, setSearchParams])

  const updateParams = updates => {
    const next = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || value === 'all') {
        next.delete(key)
        return
      }

      next.set(key, String(value))
    })

    setSearchParams(next)
  }

  const handleApplyFilters = () => {
    updateParams({
      search: searchDraft.trim(),
      minPrice: minPriceDraft,
      maxPrice: maxPriceDraft,
    })
  }

  const handleClearFilters = () => {
    setSearchDraft('')
    setMinPriceDraft(null)
    setMaxPriceDraft(null)
    setSearchParams(new URLSearchParams())
  }

  return (
    <PageShell>
      <CatalogLayout>
        <ProductFiltersPanel
          categories={categoryOptions}
          category={category}
          maxPrice={maxPriceDraft}
          minPrice={minPriceDraft}
          onApply={handleApplyFilters}
          onCategoryChange={value => updateParams({ category: value })}
          onClear={handleClearFilters}
          onMaxPriceChange={setMaxPriceDraft}
          onMinPriceChange={setMinPriceDraft}
          onSortChange={value => updateParams({ sort: value })}
          sort={sort}
        />

        <CatalogContent>
          <CatalogHeader>
            <div>
              <Eyebrow>{store?.name || translate('stores')}</Eyebrow>
              <CatalogTitle>{isOutlet ? translate('outlet') : translate('products')}</CatalogTitle>
            </div>
            <ResultCount>
              {loading ? translate('loading') : `${products.length} ${translate('catalog.productsCount')}`}
            </ResultCount>
          </CatalogHeader>

          <CatalogToolbar>
            <Input.Search
              allowClear
              placeholder={translate('catalog.searchStorePlaceholder')}
              value={searchDraft}
              onChange={event => setSearchDraft(event.target.value)}
              onSearch={setSearchDraft}
            />
          </CatalogToolbar>

          {loading
            ? <Spin />
            : <StorefrontProductGrid products={products} storeSlug={activeStoreSlug} />}
        </CatalogContent>
      </CatalogLayout>
    </PageShell>
  )
}

export default StorefrontProductsPage
