import { useCallback, useEffect, useState } from 'react'
import { verticalsServices } from '../services/verticalsServices'

const useVerticals = () => {
  const [data, setData] = useState()
  const [dataVertical, setDataVertical] = useState()
  const [loading, setLoading] = useState()

  const getVerticals = useCallback(async () => {
    setLoading(true)
    try {
      const newData = await verticalsServices.list()
      setData(newData.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getVertical = useCallback(async id => {
    setLoading(true)
    try {
      const data = await verticalsServices.getVertical(id)
      setDataVertical(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getVerticals()
  }, [])

  return {
    getVerticals,
    data,
    loading,
    getVertical,
    dataVertical,
  }
}

export default useVerticals
