import { Tag } from 'antd'

const statusMap = {
  pending: { color: 'gold', label: 'Pendiente' },
  approved: { color: 'green', label: 'Aprobado' },
  rejected: { color: 'red', label: 'Rechazado' },
  draft: { color: 'default', label: 'Borrador' },
  paid: { color: 'green', label: 'Pagado' },
  cancelled: { color: 'red', label: 'Cancelado' }
}

const StatusTag = ({ status }) => {
  const current = statusMap[status] || { color: 'default', label: status || 'Sin estado' }
  return <Tag color={current.color}>{current.label}</Tag>
}

export default StatusTag
