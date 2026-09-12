import { Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../products/ProductCard'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { catalogService } from '../../services/catalogService'
import { categoryService } from '../../services/categoryService'
import {
  CategoryPill,
  CategoryRail,
  ResultsList,
  SearchDrawerPanel,
  SearchEmpty,
  SearchInput,
  SearchStack,
  SearchTrigger,
} from '../storefront/StorefrontSearchDrawer.styles'

const MarketplaceSearchDrawer = ({ verticalId }) => {
  const { translate } = useDictionaryTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebouncedValue(search)

  useEffect(() => {
    if (!open || !verticalId) {
      setCategories([])
      return
    }

    categoryService
      .list({ vertical: verticalId, isActive: true })
      .then(response => setCategories(response.data || []))
      .catch(() => setCategories([]))
  }, [open, verticalId])

  const loadProducts = useCallback(async () => {
    if (!open) return

    setLoading(true)

    try {
      const response = await catalogService.getCatalog({
        search: debouncedSearch || undefined,
        vertical: verticalId || undefined,
        category: selectedCategory || undefined,
        limit: 12,
      })

      setProducts(response.data || [])
    } catch (error) {
      console.error(error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, open, selectedCategory, verticalId])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const detailPath = useMemo(
    () => product => (
      verticalId
        ? buildRoute(ROUTES.VERTICAL_SCOPED_PRODUCT_DETAIL, {
            verticalId,
            id: product._id,
          })
        : buildRoute(ROUTES.VERTICAL_PRODUCT_DETAIL, { id: product._id })
    ),
    [verticalId]
  )

  return (
    <>
      <SearchTrigger
        type="text"
        icon={<Search size={18} />}
        aria-label={translate('search')}
        onClick={() => setOpen(true)}
      />

      <SearchDrawerPanel
        title={
          verticalId
            ? translate('catalog.searchInStore')
            : translate('catalog.searchStorePlaceholder')
        }
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
            onSearch={setSearch}
          />

          {!!categories.length && (
            <CategoryRail>
              <CategoryPill
                type="button"
                $active={!selectedCategory}
                onClick={() => setSelectedCategory('')}
              >
                {translate('all')}
              </CategoryPill>
              {categories.slice(0, 10).map(category => (
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

          {!products.length && !loading ? (
            <SearchEmpty description={translate('catalog.searchStoreEmpty')} />
          ) : (
            <ResultsList>
              {products.map(product => (
                <div
                  key={product._id}
                  onClick={() => {
                    setOpen(false)
                    navigate(detailPath(product))
                  }}
                >
                  <ProductCard product={product} detailPath={detailPath(product)} />
                </div>
              ))}
            </ResultsList>
          )}
        </SearchStack>
      </SearchDrawerPanel>
    </>
  )
}

export default MarketplaceSearchDrawer
