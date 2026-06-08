import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { PageContainer } from './styles/styleVerticalPage'
import VerticalHeader from './components/VerticalHeader'
import VerticalProductsGrid from './components/VerticalProductsGrid'
import useCatalog from '../../hooks/useCatalog'
import useVerticals from '../../hooks/useVerticals'

const VerticalPage = () => {
  const { id } = useParams()
  const { data, getVerticalCatalog, loading } = useCatalog()
  const { dataVertical, getVertical } = useVerticals()

  useEffect(() => {
    const filters = {
      vertical: id,
    }
    getVertical(id)
    getVerticalCatalog(filters)
  }, [id])

  console.log(dataVertical)
  console.log(data)

  return (
    <>
      <PageContainer>
        <VerticalHeader
          dataVertical={dataVertical}
          loadingProducts={loading}
          productsCount={data?.length}
        />
        <VerticalProductsGrid products={data} loadingProducts={loading} />
      </PageContainer>
    </>
  )
}

export default VerticalPage
