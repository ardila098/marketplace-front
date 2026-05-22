import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { useTableData } from '../../../../../hooks/useTableData'
import { productService } from '../../../../../services/productService'

export const useSellerProducts = () => {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const { tableData, setTableData } = useTableData({
        data: [],
        page: 1,
        pageSize: 10,
        search: '',
    })

    const getProducts = useCallback(async () => {
        setLoading(true)

        try {
            const response = await productService.getMyStoreProducts()

            setTableData({
                data: response.data,
                page: response.page || 1,
                total: response.total || response.data.length,
            })
        } catch (error) {
            message.error(error.message || 'No se pudieron cargar los productos')
        } finally {
            setLoading(false)
        }
    }, [setTableData])


    const getProduct = useCallback(async (id) => {
        setLoading(true)

        try {
            const response = await productService.getSellerProductByid(id)
            return response.data
        } catch (error) {
            message.error(error.message || 'No se pudieron cargar El producto')
        } finally {
            setLoading(false)
        }
    }, [])


    const saveProduct = async ({ id, payload }) => {
        setSaving(true)

        try {
            if (id) {
                await productService.update(id, payload)
            } else {
                await productService.create(payload)
            }

            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo guardar el producto')
            return false
        } finally {
            setSaving(false)
        }
    }

    const removeProduct = async product => {
        const id = product._id || product.id

        if (!id) return false

        setSaving(true)

        try {
            await productService.remove(id)
            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo eliminar el producto')
            return false
        } finally {
            setSaving(false)
        }
    }


    const addVariant = async ({ productId, payload }) => {
        setSaving(true)

        try {
            await productService.addVariant(productId, payload)
            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo crear la variante')
            return false
        } finally {
            setSaving(false)
        }
    }

    const addPiece = async ({ productId, payload }) => {
        setSaving(true)

        try {
            await productService.addPiece(productId, payload)
            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo crear la pieza')
            return false
        } finally {
            setSaving(false)
        }
    }


    const addReference = async ({ productId, payload }) => {
        setSaving(true)

        try {
            await productService.addReference(productId, payload)
            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo crear la referencia')
            return false
        } finally {
            setSaving(false)
        }
    }

    const addInventoryItem = async ({ productId, payload }) => {
        setSaving(true)

        try {
            await productService.addInventoryItem(productId, payload)
            await getProducts()

            return true
        } catch (error) {
            message.error(error.message || 'No se pudo crear la opción')
            return false
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])




    return {
        getProducts,
        saveProduct,
        removeProduct,
        saving,
        getProduct,
        addVariant,
        addPiece,
        addInventoryItem,
        addReference,
        tableData: {
            ...tableData,
            loading,
        },
    }
}