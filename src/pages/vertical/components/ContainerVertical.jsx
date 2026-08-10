import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Button, Space } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import CategorySlider from '../../../components/catalog/CategorySlider'
import { buildRoute, ROUTES } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import useCatalog from '../../../hooks/useCatalog'
import useVerticals from '../../../hooks/useVerticals'
import { categoryService } from '../../../services/categoryService'
import { PageContainer } from '../../itemDetails/styles/styles'
import VerticalHeader from './VerticalHeader'
import ContainerItemsList from '../../items/components/ContainerItemsList'

const ContainerVertical = () => {
  const { translate } = useDictionaryTranslation()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''
  const [categories, setCategories] = useState([])
  const { data, getVerticalCatalog, loading } = useCatalog()
  const { dataVertical, getVertical } = useVerticals()
  const productsPath = buildRoute(ROUTES.VERTICAL_PRODUCTS, { id })
  const outletPath = buildRoute(ROUTES.VERTICAL_OUTLET, { id })

  const loadCategories = useCallback(async () => {
    if (!id) return

    try {
      const response = await categoryService.list({ vertical: id, isActive: true })
      setCategories(response.data || [])
    } catch (error) {
      console.error(error)
      setCategories([])
    }
  }, [id])

  useEffect(() => {
    const filters = {
      vertical: id,
      category: selectedCategory || undefined,
    }
    getVerticalCatalog(filters)
  }, [getVerticalCatalog, id, selectedCategory])

  useEffect(() => {
    getVertical(id)
    loadCategories()
  }, [getVertical, id, loadCategories])

  return (
    <>
      <VerticalHeader
        dataVertical={dataVertical}
        loadingProducts={loading}
        productsCount={data?.length}
      />

      <PageContainer>
        <Space size={12} wrap style={{ marginBottom: 28 }}>
          <Link to={productsPath}>
            <Button type="primary">{translate('products')}</Button>
          </Link>
          <Link to={outletPath}>
            <Button>{translate('outlet')}</Button>
          </Link>
        </Space>

        <div id="categories">
          <CategorySlider
            categories={categories}
            title={translate('catalog.verticalCategorySliderTitle')}
            subtitle={translate('catalog.verticalCategorySliderSubtitle')}
            activeCategoryId={selectedCategory}
            getPath={category => `${buildRoute(ROUTES.VERTICAL, { id })}?category=${category._id}`}
          />
        </div>

        <ContainerItemsList
          data={data}
          getProductPath={product => buildRoute(ROUTES.VERTICAL_SCOPED_PRODUCT_DETAIL, {
            verticalId: id,
            id: product._id,
          })}
        />
      </PageContainer>
    </>
  )
}

export default ContainerVertical
