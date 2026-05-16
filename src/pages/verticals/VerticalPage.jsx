import { useParams } from "react-router-dom"
import useVerticals from "./hooks/useVerticals"
import { useEffect } from "react"

const VerticalPage = () => {
  const { id } = useParams()
  const { getVertical, dataVertical } = useVerticals(id)

  console.log(dataVertical)

  useEffect(() => {
    getVertical()
  }, [id])

  return (
    <div>

    </div>
  )
}

export default VerticalPage
