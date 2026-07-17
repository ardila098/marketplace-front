import { MetricBox, MetricGrid, MetricLabel, MetricValue } from '../style'

const OrderMetrics = ({ metrics = [] }) => {
  const visibleMetrics = metrics.filter(metric => metric && metric.value !== undefined)

  if (!visibleMetrics.length) return null

  return (
    <MetricGrid>
      {visibleMetrics.map(metric => (
        <MetricBox key={metric.label}>
          <MetricLabel>{metric.label}</MetricLabel>
          <MetricValue>{metric.value}</MetricValue>
        </MetricBox>
      ))}
    </MetricGrid>
  )
}

export default OrderMetrics
