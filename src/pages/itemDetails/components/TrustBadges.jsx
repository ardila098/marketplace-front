import styled from 'styled-components'
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react'

const BadgesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #fff;
  border-radius: 50%;
  color: #111827;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease;

  ${BadgeItem}:hover & {
    transform: translateY(-3px);
  }
`

const BadgeTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

const BadgeText = styled.p`
  font-size: 11px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`

const TrustBadges = () => {
  return (
    <BadgesContainer>
      <BadgeItem>
        <IconWrapper>
          <Truck size={20} />
        </IconWrapper>
        <div>
          <BadgeTitle>Envío Gratis</BadgeTitle>
          <BadgeText>En compras seleccionadas</BadgeText>
        </div>
      </BadgeItem>

      <BadgeItem>
        <IconWrapper>
          <RefreshCw size={20} />
        </IconWrapper>
        <div>
          <BadgeTitle>Devolución de 30 días</BadgeTitle>
          <BadgeText>Garantía de satisfacción</BadgeText>
        </div>
      </BadgeItem>

      <BadgeItem>
        <IconWrapper>
          <ShieldCheck size={20} />
        </IconWrapper>
        <div>
          <BadgeTitle>Pago 100% Seguro</BadgeTitle>
          <BadgeText>Encriptación de datos SSL</BadgeText>
        </div>
      </BadgeItem>
    </BadgesContainer>
  )
}

export default TrustBadges
