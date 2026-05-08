import { Col, Input, Row, Select, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { mockProducts, mockStores } from '../../data/mockData'
import { PageShell } from '../../styles/layoutStyles'
import { normalizeText } from '../../utils/formatters'

const StorefrontProductsPage = () => {
  const { storeSlug } = useParams()
  const store = mockStores.find(item => item.slug === storeSlug)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const categories = [...new Set(mockProducts.filter(product => product.store.slug === storeSlug).map(product => product.category))]

  const products = useMemo(() => mockProducts.filter(product => {
    const matchesStore = product.store.slug === storeSlug
    const matchesSearch = normalizeText(product.name).includes(normalizeText(search))
    const matchesCategory = category === 'all' || product.category === category
    return matchesStore && matchesSearch && matchesCategory
  }), [storeSlug, search, category])

  return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Typography.Text type="secondary">{store?.name}</Typography.Text>
          <Typography.Title style={{ letterSpacing: '-.05em', marginTop: 8 }}>Todos los productos</Typography.Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}><Input.Search placeholder="Buscar en esta tienda" allowClear onChange={event => setSearch(event.target.value)} onSearch={setSearch} /></Col>
          <Col xs={24} md={8}>
            <Select value={category} onChange={setCategory} style={{ width: '100%' }} options={[
              { label: 'Todas las categorías', value: 'all' },
              ...categories.map(item => ({ label: item, value: item }))
            ]} />
          </Col>
        </Row>
        <StorefrontProductGrid products={products} storeSlug={storeSlug} />
      </Space>
    </PageShell>
  )
}

export default StorefrontProductsPage
