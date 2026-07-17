import { useParams, useSearchParams } from 'react-router-dom'
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
      <PageContainer>
        <VerticalHeader
          dataVertical={dataVertical}
          loadingProducts={loading}
          productsCount={data?.length}
        />

        <CategorySlider
          categories={categories}
          title={translate('catalog.verticalCategorySliderTitle')}
          subtitle={translate('catalog.verticalCategorySliderSubtitle')}
          activeCategoryId={selectedCategory}
          getPath={category => `${buildRoute(ROUTES.VERTICAL, { id })}?category=${category._id}`}
        />

        <ContainerItemsList data={data} />
      </PageContainer>
    </>
  )
}

export default ContainerVertical
