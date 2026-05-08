import { useMemo, useState } from 'react'
import { normalizeText } from '../utils/formatters'

export const useTableState = (rows = [], searchableFields = []) => {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})

  const data = useMemo(() => {
    const normalizedSearch = normalizeText(search)

    return rows.filter(row => {
      const matchesSearch =
        !normalizedSearch ||
        searchableFields.some(field => normalizeText(row[field]).includes(normalizedSearch))
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => !value || row[key] === value
      )
      return matchesSearch && matchesFilters
    })
  }, [rows, search, filters, searchableFields])

  return { data, search, setSearch, filters, setFilters }
}
