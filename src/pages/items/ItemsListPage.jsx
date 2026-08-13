import { Col, Empty, Input, Row, Spin } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import ProductCard from '../../components/products/ProductCard'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { catalogService } from '../../services/catalogService'
import { categoryService } from '../../services/categoryService'
import { verticalsServices } from '../../services/verticalsServices'
import { PageShell } from '../../styles/layoutStyles'

const parsePriceParam = value => {
  if (!value) return null

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

const ItemsListPage = () => {
  const { translate } = useDictionaryTranslation()
  const { id: verticalId } = useParams()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [vertical, setVertical] = useState(null)
  const [loading, setLoading] = useState(false)
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'newest'
  const isVerticalCatalog = Boolean(verticalId && location.pathname.startsWith('/vertical/'))
  const isOutletPath = location.pathname.endsWith('/outlet')
  const discounted = isOutletPath || searchParams.get('discounted') === 'true'
  const minPrice = parsePriceParam(searchParams.get('minPrice'))
  const maxPrice = parsePriceParam(searchParams.get('maxPrice'))
  const [searchDraft, setSearchDraft] = useState(search)
  const [minPriceDraft, setMinPriceDraft] = useState(minPrice)
  const [maxPriceDraft, setMaxPriceDraft] = useState(maxPrice)
  const debouncedSearchDraft = useDebouncedValue(searchDraft)

  const filters = useMemo(() => ({
    search,
    vertical: isVerticalCatalog ? verticalId : undefined,
    category: category === 'all' ? undefined : category,
    discounted: discounted ? 'true' : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sort,
  }), [category, discounted, isVerticalCatalog, maxPrice, minPrice, search, sort, verticalId])
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
    const response = await categoryService.list({
      isActive: true,
      vertical: isVerticalCatalog ? verticalId : undefined,
    })
    setCategories(response.data || [])
  }, [isVerticalCatalog, verticalId])

  const loadVertical = useCallback(async () => {
    if (!isVerticalCatalog) {
      setVertical(null)
      return
    }

    const response = await verticalsServices.getVertical(verticalId)
    setVertical(response.data || null)
  }, [isVerticalCatalog, verticalId])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadVertical()
  }, [loadVertical])

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

  const getProductPath = product => {
    if (!isVerticalCatalog) return undefined

    return buildRoute(ROUTES.VERTICAL_SCOPED_PRODUCT_DETAIL, {
      verticalId,
      id: product._id,
    })
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
          showDiscountedToggle={!isOutletPath}
          sort={sort}
        />

        <CatalogContent>
          <CatalogHeader>
            <div>
              <Eyebrow>
                {isVerticalCatalog
                  ? vertical?.name || translate('catalog.marketplaceEyebrow')
                  : translate('catalog.marketplaceEyebrow')}
              </Eyebrow>
              <CatalogTitle>{discounted ? translate('outlet') : translate('products')}</CatalogTitle>
            </div>
            <ResultCount>
              {loading ? translate('loading') : `${products.length} ${translate('catalog.productsCount')}`}
            </ResultCount>
          </CatalogHeader>

          <CatalogToolbar>
            <Input.Search
              allowClear
              placeholder={isVerticalCatalog
                ? translate('catalog.searchStorePlaceholder')
                : translate('catalog.searchPlaceholder')}
              value={searchDraft}
              onChange={event => setSearchDraft(event.target.value)}
              onSearch={setSearchDraft}
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
                  <ProductCard product={product} detailPath={getProductPath(product)} />
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
