import styled from 'styled-components';
import { Row, Col } from 'antd';

export const FeaturedProductsRow = styled(Row)`
  width: 100%;
`;

export const FeaturedProductCol = styled(Col)`
  margin-bottom: 16px;
`;

export const FeaturedProductCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  height: 100%;
`;

export const FeaturedProductHeader = styled(Row)`
  margin-bottom: 12px;
`;

export const VerticalName = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #222;
`;

export const ViewMoreText = styled.span`
  font-size: 12px;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #1677ff;
  }
`;

export const ProductImagesRow = styled(Row)`
  margin-bottom: 16px;
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  display: block;
`;

export const FeaturedStoresLabel = styled.div`
  font-size: 11px;
  color: #999;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const FeaturedStoresText = styled.div`
  font-size: 12px;
  color: #444;
  cursor: pointer;
  line-height: 1.4;
`;