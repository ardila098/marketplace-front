import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useCatalog from '../../../hooks/useCatalog'
import useVerticals from '../../../hooks/useVerticals'
import { PageContainer } from '../../itemDetails/styles/styles'
import VerticalHeader from './VerticalHeader'
import ContainerItemsList from '../../items/components/ContainerItemsList'

const ContainerVertical = () => {
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

  return (
    <>
      <PageContainer>
        <VerticalHeader
          dataVertical={dataVertical}
          loadingProducts={loading}
          productsCount={data?.length}
        />

        <ContainerItemsList data={data} />
      </PageContainer>
    </>
  )
}

export default ContainerVertical
