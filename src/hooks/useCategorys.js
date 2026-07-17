import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { categoryService } from '../services/categoryService'

const useCategorys = (params) => {
  const [categorys, setCategorys] = useState([])
  const [loading, setLoading] = useState(false)

  const getCategorys = useCallback(async () => {
    if (params?.enabled === false) {
      setCategorys([])
      return
    }

    setLoading(true)

    try {
      const queryParams = { ...(params || {}) }
      delete queryParams.enabled
      const response = await categoryService.list(queryParams)

      setCategorys(response.data || [])
    } catch (error) {
      message.error(error.message || 'No se pudieron cargar las categorías')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    getCategorys()
  }, [getCategorys])

  return {
    categorys,
    loading,
    getCategorys,
  }
}

export default useCategorys
