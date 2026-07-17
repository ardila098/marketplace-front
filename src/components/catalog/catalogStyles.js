import styled from 'styled-components'

export const CatalogLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;

  @media (max-width: 991px) {
    display: block;
  }
`

export const CatalogContent = styled.section`
  flex: 1;
  min-width: 0;
`

export const CatalogHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export const CatalogToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;

  .ant-input-search {
    max-width: 460px;
  }

  .ant-input,
  .ant-btn {
    border-radius: 999px;
  }

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;

    .ant-input-search {
      max-width: 100%;
    }
  }
`

export const Eyebrow = styled.div`
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
`

export const CatalogTitle = styled.h1`
  color: #111827;
  font-size: 30px;
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

export const ResultCount = styled.div`
  color: #6b7280;
  font-size: 13px;
  white-space: nowrap;
`
