import {
  EmptyText,
  InfoBlock,
  InfoLabel,
  InfoRow,
  InfoValue,
  Panel,
  PanelTitle,
} from '../style'

const OrderInfoPanel = ({ title, rows = [], emptyText }) => {
  const visibleRows = rows.filter(row => {
    return row && row.value !== undefined && row.value !== null && row.value !== ''
  })

  return (
    <Panel>
      <PanelTitle>{title}</PanelTitle>

      {visibleRows.length ? (
        <InfoBlock>
          {visibleRows.map(row => (
            <InfoRow key={row.label}>
              <InfoLabel>{row.label}</InfoLabel>
              <InfoValue>{row.value}</InfoValue>
            </InfoRow>
          ))}
        </InfoBlock>
      ) : (
        <EmptyText>{emptyText}</EmptyText>
      )}
    </Panel>
  )
}

export default OrderInfoPanel
