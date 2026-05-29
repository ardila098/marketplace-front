import { useParams } from 'react-router-dom'
import useVertical from './hooks/useVertical'
import { useEffect } from 'react'

const VerticalPage = () => {
  const { id } = useParams()
  const { data, getVerticalCatalog } = useVertical()

  useEffect(() => {
    getVerticalCatalog()
  }, [id])

  console.log(data)

  return <></>
}

export default VerticalPage
