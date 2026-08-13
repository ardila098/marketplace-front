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

const FieldStack = styled(Space).attrs({
  direction: 'vertical',
  size: 16,
})`
  width: 100%;
`

const FullWidthSelect = styled(Select)`
  width: 100%;
`

const FullWidthCompact = styled(Space.Compact)`
  width: 100%;
`

const HalfInputNumber = styled(InputNumber)`
  width: 50%;
`

const ToggleRow = styled(Space)`
  width: 100%;
  justify-content: space-between;
`

const FilterDivider = styled(Divider)`
  && {
    margin: 2px 0;
  }
`

const HalfActionButton = styled(Button)`
  width: 50%;
`

const PanelTitle = styled(Typography.Title).attrs({
  level: 5,
})`
  && {
    margin-top: 0;
    margin-bottom: 18px;
  }
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
    <FieldStack>
      <div>
        <FieldLabel>{translate('category')}</FieldLabel>
        <FullWidthSelect
          value={category}
          onChange={onCategoryChange}
          options={[
            { label: translate('all'), value: 'all' },
            ...categories,
          ]}
        />
      </div>

      <div>
        <FieldLabel>{translate('price')}</FieldLabel>
        <FullWidthCompact>
          <HalfInputNumber
            min={0}
            placeholder={translate('min')}
            value={minPrice}
            onChange={onMinPriceChange}
          />
          <HalfInputNumber
            min={0}
            placeholder={translate('max')}
            value={maxPrice}
            onChange={onMaxPriceChange}
          />
        </FullWidthCompact>
      </div>

      <div>
        <FieldLabel>{translate('sort')}</FieldLabel>
        <FullWidthSelect
          value={sort}
          onChange={onSortChange}
          options={[
            { label: translate('catalog.recent'), value: 'newest' },
            { label: translate('catalog.priceAsc'), value: 'price_asc' },
            { label: translate('catalog.priceDesc'), value: 'price_desc' },
            { label: translate('catalog.discountDesc'), value: 'discount' },
          ]}
        />
      </div>

      {showDiscountedToggle && (
        <ToggleRow>
          <Typography.Text>{translate('outletOnly')}</Typography.Text>
          <Switch checked={discounted} onChange={onDiscountedChange} />
        </ToggleRow>
      )}

      <FilterDivider />

      <FullWidthCompact>
        <HalfActionButton type="primary" onClick={onApply}>
          {translate('apply')}
        </HalfActionButton>
        <HalfActionButton onClick={onClear}>
          {translate('clear')}
        </HalfActionButton>
      </FullWidthCompact>
    </FieldStack>
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
          <PanelTitle>{panelTitle}</PanelTitle>
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
