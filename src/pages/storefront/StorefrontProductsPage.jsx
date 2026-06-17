import { Col, Input, Row, Select, Space, Spin, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StorefrontProductGrid from '../../components/storefront/StorefrontProductGrid'
import { PageShell } from '../../styles/layoutStyles'
import { normalizeText } from '../../utils/formatters'
import useStoreProducts from './hooks/useStoreProducts'

const categoryName = product => product.category?.name || product.category || ''

const StorefrontProductsPage = () => {
  const { storeSlug } = useParams()
  const store = useSelector(state => state.storefront.currentStore)
  const { products: allProducts, loading } = useStoreProducts(storeSlug)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => [...new Set(allProducts.map(categoryName).filter(Boolean))],
    [allProducts]
  )

  const products = useMemo(() => allProducts.filter(product => {
    const matchesSearch = normalizeText(product.name).includes(normalizeText(search))
    const matchesCategory = category === 'all' || categoryName(product) === category
    return matchesSearch && matchesCategory
  }), [allProducts, search, category])

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
        {loading
          ? <Spin />
          : <StorefrontProductGrid products={products} storeSlug={storeSlug} />}
      </Space>
    </PageShell>
  )
}

export default StorefrontProductsPage
