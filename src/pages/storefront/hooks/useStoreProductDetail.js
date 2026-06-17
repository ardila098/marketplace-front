import { useEffect, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

// Detalle real de un producto dentro de una tienda. La URL usa slug pero el backend
// identifica por id, así que resolvemos slug -> id con el catálogo y luego pedimos
// el detalle completo (GET /catalogs/products/:id), igual que el resto del marketplace.
const useStoreProductDetail = (storeSlug, productSlug) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!storeSlug || !productSlug) return undefined

    let active = true
    setLoading(true)

    const load = async () => {
      try {
        const list = await catalogService.getProductsCatalog()
        const match = (list?.data || []).find(
          item => item.store?.slug === storeSlug && item.slug === productSlug
        )

        if (!match) {
          if (active) setProduct(null)
          return
        }

        const detail = await catalogService.getCatalogItem(match._id)
        if (active) setProduct(detail?.data || null)
      } catch (error) {
        console.error(error)
        if (active) setProduct(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [storeSlug, productSlug])

  return { product, loading }
}

export default useStoreProductDetail
