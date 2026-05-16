import { useCallback, useEffect, useState } from 'react'
import { verticalsServices } from '../../../services/verticalsServices'

const useVerticals = (id) => {
    const [data, setData] = useState([])
    const [dataVertical, setDataVertical] = useState()
    const [loading, setLoading] = useState(false)

    const getVerticals = useCallback(async () => {
        try {
            setLoading(true)
            const response = await verticalsServices.list()
            setData(response?.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])


    const getVertical = useCallback(async () => {
        try {
            setLoading(true)
            const response = await verticalsServices.getVertical(id)
            setDataVertical(response?.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getVerticals()
    }, [getVerticals])

    return {
        data,
        loading,
        getVerticals,
        getVertical,
        dataVertical
    }
}

export default useVerticals
