import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { catalogService } from '../../../services/catalogService'
import ProductCatalogCard from '../../../components/catalog/ProductCatalogCard/ProductCatalogCard'

const SectionContainer = styled.div`
  margin-top: 56px;
  border-top: 1px solid #e5e7eb;
  padding-top: 40px;
`

const Title = styled.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #111827;
  margin-bottom: 24px;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const LoadingPlaceholder = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SkeletonCard = styled.div`
  height: 320px;
  background: #f3f4f6;
  border-radius: 16px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`

const NoRelatedMessage = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`

const RelatedProduct = ({ product }) => {
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return
      setLoading(true)
      try {
        // Obtenemos la categoría
        const categoryId = product.category?._id || product.category
        if (categoryId) {
          const response = await catalogService.getProductsCatalog({
            category: categoryId,
            limit: 5, // Traemos 5 por si uno es el actual
          })
          
          // Filtramos el producto actual para que no aparezca en relacionados
          const filtered = (response.data || []).filter(
            item => item._id !== product._id
          ).slice(0, 4) // Nos quedamos con máximo 4

          setRelated(filtered)
        }
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [product])

  if (loading) {
    return (
      <SectionContainer>
        <Title>Productos relacionados</Title>
        <LoadingPlaceholder>
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </LoadingPlaceholder>
      </SectionContainer>
    )
  }

  if (related.length === 0) {
    return null // Si no hay relacionados, simplemente no renderizamos la sección
  }

  return (
    <SectionContainer>
      <Title>Productos relacionados</Title>
      <ProductsGrid>
        {related.map(item => (
          <ProductCatalogCard key={item._id} product={item} />
        ))}
      </ProductsGrid>
    </SectionContainer>
  )
}

export default RelatedProduct
