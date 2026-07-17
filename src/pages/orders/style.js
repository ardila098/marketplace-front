import styled from 'styled-components'
import { Image } from 'antd'

export const OrdersPageShell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const OrdersPageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export const OrdersHeaderText = styled.div`
  min-width: 0;
`

export const OrdersTitle = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 1.45rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0;
`

export const OrdersSubtitle = styled.p`
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 0.92rem;
  line-height: 1.5;
`

export const OrdersToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`

export const OrdersCount = styled.span`
  color: #6b7280;
  font-size: 0.84rem;
`

export const TablePanel = styled.div`
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  .ant-table-thead > tr > th {
    background: #f9fafb;
    color: #374151;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .ant-table-cell {
    vertical-align: top;
  }
`

export const CellStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`

export const CellTitle = styled.span`
  color: #111827;
  font-size: 0.9rem;
  font-weight: 700;
`

export const CellMeta = styled.span`
  color: #6b7280;
  font-size: 0.78rem;
  line-height: 1.35;
`

export const ActionGroup = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
`

export const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const HeaderMeta = styled.div`
  color: #6b7280;
  font-size: 0.86rem;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;

    .ant-btn {
      width: 100%;
    }
  }
`

export const OrderNumber = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 1.55rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0;
`

export const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

export const MetricBox = styled.div`
  min-width: 0;
  padding: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`

export const MetricLabel = styled.div`
  color: #6b7280;
  font-size: 0.76rem;
  font-weight: 600;
`

export const MetricValue = styled.div`
  margin-top: 6px;
  color: #111827;
  font-size: 1.05rem;
  font-weight: 800;
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

export const DetailSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`

export const PanelTitle = styled.h2`
  margin: 0 0 14px;
  color: #111827;
  font-size: 0.98rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: 0;
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 12px;
  padding: 12px;
  border: 1px solid #eef0f3;
  border-radius: 8px;

  @media (max-width: 520px) {
    grid-template-columns: 56px minmax(0, 1fr);
  }
`

export const ProductImage = styled(Image)`
  width: 72px !important;
  height: 72px !important;
  object-fit: cover;
  border-radius: 8px;
  background: #f3f4f6;

  @media (max-width: 520px) {
    width: 56px !important;
    height: 56px !important;
  }
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

export const ProductName = styled.div`
  color: #111827;
  font-size: 0.92rem;
  font-weight: 700;
`

export const ProductMeta = styled.div`
  color: #6b7280;
  font-size: 0.78rem;
  line-height: 1.35;
`

export const ProductPrice = styled.div`
  margin-top: 2px;
  color: #111827;
  font-size: 0.88rem;
  font-weight: 700;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 2px;
  }
`

export const InfoLabel = styled.span`
  color: #6b7280;
  font-size: 0.76rem;
  font-weight: 600;
`

export const InfoValue = styled.span`
  color: #111827;
  font-size: 0.88rem;
  line-height: 1.4;
  word-break: break-word;
`

export const EmptyText = styled.div`
  color: #6b7280;
  font-size: 0.88rem;
`
