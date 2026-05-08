import { Button, Card, Input, Select, Space, Table } from 'antd'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useTableState } from '../../hooks/useTableState'

const AppTable = ({
  title,
  rows = [],
  columns = [],
  searchableFields = [],
  filters = [],
  rowKey = '_id',
  primaryAction,
  loading = false
}) => {
  const { data, search, setSearch, filters: activeFilters, setFilters } = useTableState(rows, searchableFields)

  const handleFilterChange = (key, value) => {
    setFilters({ ...activeFilters, [key]: value })
  }

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }} align="center">
          <h2 style={{ margin: 0 }}>{title}</h2>
          {primaryAction && <Button type="primary" onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
        </Space>
        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            allowClear
            prefix={<Search size={16} />}
            placeholder="Buscar"
            value={search}
            onChange={event => setSearch(event.target.value)}
            style={{ width: 280 }}
          />
          <Space wrap>
            {filters.map(filter => (
              <Select
                key={filter.key}
                allowClear
                placeholder={filter.label}
                options={filter.options}
                value={activeFilters[filter.key]}
                onChange={value => handleFilterChange(filter.key, value)}
                style={{ minWidth: 180 }}
                suffixIcon={<SlidersHorizontal size={16} />}
              />
            ))}
          </Space>
        </Space>
        <Table
          loading={loading}
          rowKey={rowKey}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 'max-content' }}
        />
      </Space>
    </Card>
  )
}

export default AppTable
