import { Button, Divider, Drawer, Grid, InputNumber, Select, Space, Switch, Typography } from 'antd'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const { useBreakpoint } = Grid

const Aside = styled.aside`
  width: 238px;
  flex: 0 0 238px;
`

const Panel = styled.div`
  position: sticky;
  top: 96px;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #ffffff;
  padding: 16px;
  box-shadow: 0 10px 26px rgba(17, 24, 39, 0.04);
`

const MobileTrigger = styled(Button)`
  margin-bottom: 14px;
  border-radius: 999px;
`

const FieldLabel = styled(Typography.Text)`
  display: block;
  font-size: 12px;
  font-weight: 650;
  color: #4b5563;
  margin-bottom: 8px;
`

const FilterFields = ({
  categories = [],
  category,
  discounted,
  maxPrice,
  minPrice,
  onApply,
  onCategoryChange,
  onClear,
  onDiscountedChange,
  onMaxPriceChange,
  onMinPriceChange,
  onSortChange,
  showDiscountedToggle,
  sort,
}) => {
  const { translate } = useDictionaryTranslation()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <FieldLabel>{translate('category')}</FieldLabel>
        <Select
          value={category}
          onChange={onCategoryChange}
          style={{ width: '100%' }}
          options={[
            { label: translate('all'), value: 'all' },
            ...categories,
          ]}
        />
      </div>

      <div>
        <FieldLabel>{translate('price')}</FieldLabel>
        <Space.Compact style={{ width: '100%' }}>
          <InputNumber
            min={0}
            placeholder={translate('min')}
            value={minPrice}
            onChange={onMinPriceChange}
            style={{ width: '50%' }}
          />
          <InputNumber
            min={0}
            placeholder={translate('max')}
            value={maxPrice}
            onChange={onMaxPriceChange}
            style={{ width: '50%' }}
          />
        </Space.Compact>
      </div>

      <div>
        <FieldLabel>{translate('sort')}</FieldLabel>
        <Select
          value={sort}
          onChange={onSortChange}
          style={{ width: '100%' }}
          options={[
            { label: translate('catalog.recent'), value: 'newest' },
            { label: translate('catalog.priceAsc'), value: 'price_asc' },
            { label: translate('catalog.priceDesc'), value: 'price_desc' },
            { label: translate('catalog.discountDesc'), value: 'discount' },
          ]}
        />
      </div>

      {showDiscountedToggle && (
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Typography.Text>{translate('outletOnly')}</Typography.Text>
          <Switch checked={discounted} onChange={onDiscountedChange} />
        </Space>
      )}

      <Divider style={{ margin: '2px 0' }} />

      <Space.Compact style={{ width: '100%' }}>
        <Button type="primary" onClick={onApply} style={{ width: '50%' }}>
          {translate('apply')}
        </Button>
        <Button onClick={onClear} style={{ width: '50%' }}>
          {translate('clear')}
        </Button>
      </Space.Compact>
    </Space>
  )
}

const ProductFiltersPanel = ({ title, ...props }) => {
  const screens = useBreakpoint()
  const { translate } = useDictionaryTranslation()
  const [open, setOpen] = useState(false)
  const panelTitle = title || translate('filters')
  const fields = (
    <FilterFields
      {...props}
      onApply={() => {
        props.onApply?.()
        setOpen(false)
      }}
      onClear={() => {
        props.onClear?.()
        setOpen(false)
      }}
    />
  )

  if (screens.lg) {
    return (
      <Aside>
        <Panel>
          <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 18 }}>
            {panelTitle}
          </Typography.Title>
          {fields}
        </Panel>
      </Aside>
    )
  }

  return (
    <>
      <MobileTrigger icon={<SlidersHorizontal size={16} />} onClick={() => setOpen(true)}>
        {panelTitle}
      </MobileTrigger>
      <Drawer
        title={panelTitle}
        placement="bottom"
        size="default"
        open={open}
        onClose={() => setOpen(false)}
      >
        {fields}
      </Drawer>
    </>
  )
}

export default ProductFiltersPanel
