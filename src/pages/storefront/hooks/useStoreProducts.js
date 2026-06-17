import { useEffect, useState } from 'react'
import { catalogService } from '../../../services/catalogService'

// Productos reales de una tienda. El backend no expone /stores/:slug/products,
// así que usamos el catálogo (GET /catalogs?view=products) y filtramos por store.slug.
const useStoreProducts = storeSlug => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!storeSlug) return undefined

    let active = true
    setLoading(true)

    catalogService
      .getProductsCatalog()
      .then(response => {
        if (!active) return
        const items = response?.data || []
        setProducts(items.filter(product => product.store?.slug === storeSlug))
      })
      .catch(error => console.error(error))
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [storeSlug])

  return { products, loading }
}

export default useStoreProducts
