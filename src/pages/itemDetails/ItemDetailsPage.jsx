import { useParams } from 'react-router-dom'
import useItemDetails from './hooks/useItemDetails'

const ItemDetailsPage = () => {
  const { id } = useParams()
  const { dataItem } = useItemDetails(id)

  console.log(dataItem)
  console.log(id)

  return <></>
}

export default ItemDetailsPage
