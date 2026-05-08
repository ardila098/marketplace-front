import { Button, Space, Typography } from 'antd'
import styled from 'styled-components'
import { currency } from '../../utils/formatters'

const VariantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`

const VariantButton = styled.button`
  min-height: 70px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid ${({ $active }) => $active ? '#111' : '#e5e7eb'};
  background: ${({ $active }) => $active ? '#111' : '#fff'};
  color: ${({ $active }) => $active ? '#fff' : '#111'};
  cursor: pointer;
  text-align: left;
`

const VariantSelector = ({ variants = [], selectedVariant, onChange }) => (
  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    <Typography.Title level={5}>Variantes</Typography.Title>
    <VariantGrid>
      {variants.map(variant => (
        <VariantButton
          key={variant._id || variant.sku}
          type="button"
          $active={(selectedVariant?._id || selectedVariant?.sku) === (variant._id || variant.sku)}
          onClick={() => onChange(variant)}
          disabled={!variant.stock}
        >
          <strong>{Object.values(variant.attributes || {}).filter(Boolean).join(' / ') || variant.sku}</strong>
          <div>{currency(variant.price)}</div>
          <small>{variant.stock > 0 ? `${variant.stock} disponibles` : 'Agotado'}</small>
        </VariantButton>
      ))}
    </VariantGrid>
  </Space>
)

export default VariantSelector
