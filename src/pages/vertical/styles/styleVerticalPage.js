import styled from 'styled-components';

export const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    min-height: 80vh;
`;

export const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
  background-image: ${props => `url(${props.$bgImage})`};
  background-size: cover;
  background-position: center;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

export const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%);
  display: flex;
  align-items: flex-end;
  padding: 32px;
`;

export const BannerContent = styled.div`
    display: flex;
    align-items: enter;
    gap: 20px;
    color: white;
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BannerTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
export const BannerSubtitle = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  font-weight: 400;
`;
// Cuadrícula de Productos (CSS Grid moderno y responsivo)
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;
// Tarjeta del Producto
export const ProductCard = styled.div`
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    border-color: #e0e0e0;
  }
`;
// Contenedor de la Imagen del Producto
export const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Relación de aspecto cuadrada 1:1 */
  overflow: hidden;
  background: #fcfcfc;
`;
export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${ProductCard}:hover & {
    transform: scale(1.06);
  }
`;
// Detalles de la Información del Producto
export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export const StoreTag = styled.span`
  align-self: flex-start;
  background: #f5f5f7;
  color: #555557;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.2px;
`;
export const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 12px 0;
  line-height: 1.4;
  /* Truncado de texto a 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em; 
`;
export const PriceSection = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const PriceText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;
`;
export const ViewButton = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #0066cc;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;
