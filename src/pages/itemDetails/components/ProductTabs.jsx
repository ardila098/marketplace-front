import { useState } from 'react'
import styled from 'styled-components'
import { Star } from 'lucide-react'

const TabsContainer = styled.div`
  margin-top: 48px;
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
`

const TabHeaders = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 12px 4px;
  font-size: 16px;
  font-weight: 560;
  color: ${({ $active }) => ($active ? '#111827' : '#9ca3af')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#111827' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #111827;
  }
`

const TabContent = styled.div`
  padding: 8px 0;
  line-height: 1.6;
  color: #4b5563;
`

const SpecsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  tr {
    border-bottom: 1px solid #f3f4f6;
  }

  td {
    padding: 12px 16px;
    font-size: 14px;
  }

  td.label {
    font-weight: 560;
    color: #111827;
    width: 250px;
    background: #f9fafb;
  }

  td.value {
    color: #4b5563;
  }
`

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ReviewCard = styled.div`
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 20px;

  &:last-child {
    border-bottom: none;
  }
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const ReviewUser = styled.span`
  font-weight: 560;
  color: #111827;
  font-size: 14px;
`

const ReviewDate = styled.span`
  color: #9ca3af;
  font-size: 12px;
`

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
  color: #fbbf24;
  margin-bottom: 6px;
`

const ReviewComment = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4b5563;
`

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description')

  // Normalizar specs
  const specs = product?.specs ? Object.entries(product.specs) : []

  // Mock de specs si no vienen en la base de datos
  const finalSpecs = specs.length > 0 ? specs : [
    ['Marca', product?.store?.name || 'Genérica'],
    ['Categoría', product?.category?.name || 'General'],
    ['Estado del producto', 'Nuevo'],
    ['Disponibilidad', 'En stock'],
    ['Garantía', '12 Meses de Garantía del Fabricante'],
  ]

  // Mock de reviews
  const mockReviews = [
    {
      id: 1,
      user: 'Alejandra Gómez',
      date: 'Hace 2 días',
      stars: 5,
      comment: 'Superó mis expectativas. El material es excelente, muy firme y el color es tal cual la foto. El envío llegó súper rápido.',
    },
    {
      id: 2,
      user: 'Juan Carlos M.',
      date: 'Hace 1 semana',
      stars: 4,
      comment: 'Muy cómodo y espacioso. La relación calidad-precio es insuperable. El único detalle es que el armado tomó un poquito más de tiempo de lo esperado.',
    },
    {
      id: 3,
      user: 'Marta Lucía R.',
      date: 'Hace 2 semanas',
      stars: 5,
      comment: 'Espectacular! Se nota la calidad en los acabados. Combina perfectamente con el diseño de mi sala. 10/10 recomendado.',
    },
  ]

  return (
    <TabsContainer>
      <TabHeaders>
        <TabButton $active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
          Descripción
        </TabButton>
        <TabButton $active={activeTab === 'specs'} onClick={() => setActiveTab('specs')}>
          Especificaciones
        </TabButton>
        <TabButton $active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
          Reseñas ({mockReviews.length})
        </TabButton>
      </TabHeaders>

      <TabContent>
        {activeTab === 'description' && (
          <div>
            <p style={{ margin: 0, fontSize: '15px', whiteSpace: 'pre-line' }}>
              {product?.description || 'No hay descripción disponible para este producto.'}
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <SpecsTable>
            <tbody>
              {finalSpecs.map(([key, val]) => (
                <tr key={key}>
                  <td className="label">{key}</td>
                  <td className="value">{val}</td>
                </tr>
              ))}
            </tbody>
          </SpecsTable>
        )}

        {activeTab === 'reviews' && (
          <ReviewList>
            {mockReviews.map(review => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewUser>{review.user}</ReviewUser>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <StarsContainer>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.stars ? '#fbbf24' : 'none'}
                      stroke={i < review.stars ? '#fbbf24' : '#d1d5db'}
                    />
                  ))}
                </StarsContainer>
                <ReviewComment>{review.comment}</ReviewComment>
              </ReviewCard>
            ))}
          </ReviewList>
        )}
      </TabContent>
    </TabsContainer>
  )
}

export default ProductTabs
