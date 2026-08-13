import { Col, Empty, Input, Row, Spin, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import {
  CatalogHeader,
  CatalogTitle,
  Eyebrow,
  ResultCount,
} from '../../components/catalog/catalogStyles'
import StoreCard from '../../components/storefront/StoreCard'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { storeService } from '../../services/storeService'
import { PageShell } from '../../styles/layoutStyles'

const StoresPage = () => {
  const { translate } = useDictionaryTranslation()
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  const loadStores = useCallback(async (params = {}) => {
    setLoading(true)

    try {
      const response = await storeService.list(params)
      setStores(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las tiendas')
      setStores([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStores({ search: debouncedSearch || undefined })
  }, [debouncedSearch, loadStores])

  return (
    <PageShell>
      <CatalogHeader>
        <div>
          <Eyebrow>{translate('catalog.marketplaceEyebrow')}</Eyebrow>
          <CatalogTitle>{translate('stores.list.title')}</CatalogTitle>
        </div>
        <ResultCount>
          {loading ? translate('loading') : `${stores.length} ${translate('stores')}`}
        </ResultCount>
      </CatalogHeader>

      <Input.Search
        allowClear
        placeholder={translate('stores.list.searchPlaceholder')}
        value={search}
        onChange={event => setSearch(event.target.value)}
        onSearch={setSearch}
        style={{ maxWidth: 360, marginBottom: 22 }}
      />

      {loading ? (
        <Spin />
      ) : !stores.length ? (
        <Empty description={translate('stores.list.empty')} />
      ) : (
        <Row gutter={[18, 18]}>
          {stores.map(store => (
            <Col xs={24} sm={12} lg={8} key={store._id}>
              <StoreCard store={store} />
            </Col>
          ))}
        </Row>
      )}
    </PageShell>
  )
}

export default StoresPage
