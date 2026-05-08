import { Card, Statistic } from 'antd'

const MetricCard = ({ title, value, prefix, suffix }) => (
  <Card>
    <Statistic title={title} value={value} prefix={prefix} suffix={suffix} />
  </Card>
)

export default MetricCard
