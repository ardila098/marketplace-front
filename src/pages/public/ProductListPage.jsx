import { Col, Input, Row, Select, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import ProductCard from '../../components/products/ProductCard'
import { mockProducts } from '../../data/mockData'
import { PageShell } from '../../styles/layoutStyles'
import { normalizeText } from '../../utils/formatters'

const ProductListPage = () => {
  const [search, setSearch] = useState('')
  const [vertical, setVertical] = useState('all')

  const products = useMemo(() => mockProducts.filter(product => {
    const matchesSearch = normalizeText(product.name).includes(normalizeText(search)) || normalizeText(product.category).includes(normalizeText(search))
    const matchesVertical = vertical === 'all' || product.vertical === vertical
    return matchesSearch && matchesVertical
  }), [search, vertical])

  return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Typography.Text type="secondary">Marketplace</Typography.Text>
          <Typography.Title style={{ letterSpacing: '-.05em', marginTop: 8 }}>Productos aprobados</Typography.Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}><Input.Search placeholder="Buscar productos" allowClear onSearch={setSearch} onChange={event => setSearch(event.target.value)} /></Col>
          <Col xs={24} md={8}>
            <Select value={vertical} onChange={setVertical} style={{ width: '100%' }} options={[
              { label: 'Todas las verticales', value: 'all' },
              { label: 'Tech', value: 'tech' },
              { label: 'Mujer', value: 'woman' },
              { label: 'Hogar', value: 'home' },
              { label: 'Ropa', value: 'clothing' }
            ]} />
          </Col>
        </Row>
        <Row gutter={[22, 22]}>
          {products.map(product => (
            <Col xs={24} sm={12} lg={8} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Space>
    </PageShell>
  )
}

export default ProductListPage
