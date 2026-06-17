import styled from 'styled-components'

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  `

export const BreadcrumbNav = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  a{
  color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #111827;
    }
  }
  span.separator {
    color: #9ca3af;
  }
  span.current {
    color: #9ca3af;
    font-weight: 500;
  }
  `

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr; /* La galería ocupa un poco más de espacio */
    align-items: start;
  }
`

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 24px; /* Para que la info se quede fija al hacer scroll si la pantalla es alta */
`