import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { landingPageService } from '../../../services/landingPageService'
import { useAuth } from '../../../hooks/useAuth'
import { ROLES } from '../../../constants/roles'

const useLanding = () => {
  const [landings, setLandings] = useState([])
  const [loading, setLoading] = useState([])
  const { role } = useAuth()
  const isAdmin = Number(role) === ROLES.ADMIN.value

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = isAdmin
        ? await landingPageService.adminList()
        : await landingPageService.listMy()

      setLandings(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las landings')
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    landings,
    loading,
    loadData
  }
}

export default useLanding
