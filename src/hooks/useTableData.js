import { useCallback, useMemo, useState } from 'react'

export const useTableData = ({
  data = [],
  page = 1,
  pageSize = 10,
  search = '',
  total = 0,
} = {}) => {
  const [tableState, setTableState] = useState({
    data,
    page,
    pageSize,
    search,
    total,
  })

  const rows = useMemo(() => {
    return tableState.data
  }, [tableState.data])

  const setTableData = useCallback(payload => {
    setTableState(prevState => ({
      ...prevState,
      ...payload,
    }))
  }, [])

  const handleSearch = useCallback(value => {
    setTableState(prevState => ({
      ...prevState,
      search: value,
      page: 1,
    }))
  }, [])

  const handleTableChange = useCallback(pagination => {
    setTableState(prevState => ({
      ...prevState,
      page: pagination.current,
      pageSize: pagination.pageSize,
    }))
  }, [])

  const tableData = {
    rows,
    page: tableState.page,
    pageSize: tableState.pageSize,
    search: tableState.search,
    total: tableState.total || tableState.data.length,
    handleSearch,
    handleTableChange,
  }

  return {
    tableData,
    setTableData,
  }
}