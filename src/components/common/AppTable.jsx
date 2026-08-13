import { Button, Col, Input, Row, Space, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

const TableShell = styled(Space)`
  width: 100%;
`

const TableToolbar = styled(Row)`
  width: 100%;
`

const SearchColumn = styled(Col)`
  min-width: 0;

  .ant-input-search {
    width: 100%;
    max-width: 320px;
  }

  @media (max-width: 768px) {
    .ant-input-search {
      max-width: none;
    }
  }
`

const ActionColumn = styled(Col)`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: stretch;

    .ant-btn {
      width: 100%;
    }
  }
`

const StyledTable = styled(Table)`
  width: 100%;
`

const AppTable = ({
  columns = [],
  tableData,
  rowKey = '_id',
  searchPlaceholder = 'Buscar...',
  createPlaceholder = 'Crear Item',
  handleCreate,
  onChange,
}) => {
  const tableSearch = tableData?.search || ''
  const handleTableSearch = tableData?.handleSearch
  const [searchDraft, setSearchDraft] = useState(tableSearch)
  const debouncedSearch = useDebouncedValue(searchDraft)

  useEffect(() => {
    setSearchDraft(tableSearch)
  }, [tableSearch])

  useEffect(() => {
    if (!handleTableSearch) return
    if (tableSearch === debouncedSearch) return

    handleTableSearch(debouncedSearch)
  }, [debouncedSearch, handleTableSearch, tableSearch])

  return (
    <TableShell direction="vertical" size="middle">
      <TableToolbar gutter={[12, 12]}>
        <SearchColumn xs={24} md={12}>
          <Input.Search
            placeholder={searchPlaceholder}
            value={searchDraft}
            onChange={event => setSearchDraft(event.target.value)}
            onSearch={setSearchDraft}
            allowClear
          />
        </SearchColumn>

        <ActionColumn xs={24} md={12}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            {createPlaceholder}
          </Button>
        </ActionColumn>
      </TableToolbar>

      <StyledTable
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData?.rows || tableData?.data}
        loading={tableData?.loading}
        scroll={{ x: 'max-content' }}
        pagination={{
          current: tableData?.page,
          pageSize: tableData?.pageSize,
          total: tableData?.total,
          showSizeChanger: true,
        }}
        onChange={onChange}
      />
    </TableShell>
  )
}

export default AppTable
