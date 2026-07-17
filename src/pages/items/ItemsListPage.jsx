import { Col, Empty, Input, Row, Spin } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
import ProductCard from '../../components/products/ProductCard'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { catalogService } from '../../services/catalogService'
import { categoryService } from '../../services/categoryService'
import { PageShell } from '../../styles/layoutStyles'

const parsePriceParam = value => {
  if (!value) return null

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

const ItemsListPage = () => {
  const { translate } = useDictionaryTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'newest'
  const discounted = searchParams.get('discounted') === 'true'
  const minPrice = parsePriceParam(searchParams.get('minPrice'))
  const maxPrice = parsePriceParam(searchParams.get('maxPrice'))
  const [searchDraft, setSearchDraft] = useState(search)
  const [minPriceDraft, setMinPriceDraft] = useState(minPrice)
  const [maxPriceDraft, setMaxPriceDraft] = useState(maxPrice)

  const filters = useMemo(() => ({
    search,
    category: category === 'all' ? undefined : category,
    discounted: discounted ? 'true' : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sort,
  }), [category, discounted, maxPrice, minPrice, search, sort])
  const categoryOptions = useMemo(() => {
    return categories.map(item => ({
      label: item.name,
      value: item._id,
    }))
  }, [categories])

  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      const response = await catalogService.getCatalog(filters)
      setProducts(response.data || [])
    } finally {
      setLoading(false)
    }
  }, [filters])

  const loadCategories = useCallback(async () => {
    const response = await categoryService.list({ isActive: true })
    setCategories(response.data || [])
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    setSearchDraft(search)
    setMinPriceDraft(minPrice)
    setMaxPriceDraft(maxPrice)
  }, [maxPrice, minPrice, search])

  const updateParams = updates => {
    const next = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || value === 'all' || value === false) {
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
          discounted={discounted}
          maxPrice={maxPriceDraft}
          minPrice={minPriceDraft}
          onApply={handleApplyFilters}
          onCategoryChange={value => updateParams({ category: value })}
          onClear={handleClearFilters}
          onDiscountedChange={value => updateParams({ discounted: value ? 'true' : '' })}
          onMaxPriceChange={setMaxPriceDraft}
          onMinPriceChange={setMinPriceDraft}
          onSortChange={value => updateParams({ sort: value })}
          showDiscountedToggle
          sort={sort}
        />

        <CatalogContent>
          <CatalogHeader>
            <div>
              <Eyebrow>{translate('catalog.marketplaceEyebrow')}</Eyebrow>
              <CatalogTitle>{discounted ? translate('outlet') : translate('products')}</CatalogTitle>
            </div>
            <ResultCount>
              {loading ? translate('loading') : `${products.length} ${translate('catalog.productsCount')}`}
            </ResultCount>
          </CatalogHeader>

          <CatalogToolbar>
            <Input.Search
              allowClear
              placeholder={translate('catalog.searchPlaceholder')}
              value={searchDraft}
              onChange={event => setSearchDraft(event.target.value)}
              onSearch={value => updateParams({ search: value.trim() })}
            />
          </CatalogToolbar>

          {loading ? (
            <Spin />
          ) : !products.length ? (
            <Empty description={translate('noResults')} />
          ) : (
            <Row gutter={[22, 22]}>
              {products.map(product => (
                <Col xs={24} sm={12} lg={8} key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </CatalogContent>
      </CatalogLayout>
    </PageShell>
  )
}

export default ItemsListPage
