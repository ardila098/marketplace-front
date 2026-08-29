import { Button } from 'antd'
import styled from 'styled-components'

export const CategoryHero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 340px);
  gap: 24px;
  align-items: center;
  margin-bottom: 28px;
  padding: 24px;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #ffffff;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    padding: 18px;
  }
`

export const CategoryCopy = styled.div`
  min-width: 0;
`

export const CategoryDescription = styled.p`
  max-width: 680px;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 15px;
  line-height: 1.6;
`

export const CategoryImage = styled.div`
  min-height: 190px;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(17, 24, 39, 0.04), rgba(17, 24, 39, 0.26)),
    ${({ $image }) => $image
      ? `url(${$image}) center/cover`
      : 'linear-gradient(135deg, #f4f5f7, #e5e7eb)'};

  @media (max-width: 720px) {
    min-height: 160px;
  }
`

export const CategoryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`

export const CategoryButton = styled(Button)`
  && {
    min-height: 40px;
    border-radius: 8px;
    font-weight: 700;
  }
`

export const CategoryProductsHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`
