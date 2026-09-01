import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { landingService } from '../../../services/landingService'

const useLanding = () => {
  const [landing, setLanding] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [landings, setLandings] = useState([])

  const load = useCallback(async id => {
    setLoading(true)

    try {
      const response = await landingService.list(id)
      setLanding(response.data)
      return response.data
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar la landing')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const save = useCallback(
    async payload => {
      setSaving(true)

      try {
        const response = landing?._id
          ? await landingService.update(landing._id, payload)
          : await landingService.create(payload)

        setLanding(response.data)
        message.success('Landing guardada correctamente')
        return response.data
      } catch (error) {
        message.error(error?.message || 'No se pudo guardar la landing')
        throw error
      } finally {
        setSaving(false)
      }
    },
    [landing]
  )

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await landingService.list()
      console.log(response)
      setLandings(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las landings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { landing, setLanding, loading, saving, load, save, landings }
}

export default useLanding
