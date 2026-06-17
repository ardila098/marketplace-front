import { Col, Input, Row, Select, Space, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../../components/products/ProductCard'
import { PageShell } from '../../styles/layoutStyles'
import { normalizeText } from '../../utils/formatters'
import useCatalog from '../../hooks/useCatalog'
import useVerticals from '../../hooks/useVerticals'

const ProductListPage = () => {
  const [search, setSearch] = useState('')
  const [vertical, setVertical] = useState('all')

  const { data: products, loading, getVerticalCatalog } = useCatalog()
  const { data: verticals } = useVerticals()

  useEffect(() => {
    const filters = { view: 'products' }
    if (vertical !== 'all') {
      filters.vertical = vertical
    }
    getVerticalCatalog(filters)
  }, [vertical, getVerticalCatalog])

  // Filtrado de búsqueda de texto del lado del cliente
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        normalizeText(product.name).includes(normalizeText(search)) ||
        normalizeText(product.description || '').includes(normalizeText(search))
      return matchesSearch
    })
  }, [products, search])

  const verticalOptions = useMemo(() => {
    const baseOptions = [{ label: 'Todas las verticales', value: 'all' }]
    const dbOptions = (verticals || []).map(v => ({
      label: v.name,
      value: v._id,
    }))
    return [...baseOptions, ...dbOptions]
  }, [verticals])

    return (
    <PageShell>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Typography.Text type="secondary">Marketplace</Typography.Text>
          <Typography.Title style={{ letterSpacing: '-.05em', marginTop: 8 }}>
            Productos aprobados
          </Typography.Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input.Search
              placeholder="Buscar productos"
              allowClear
              onSearch={setSearch}
              onChange={event => setSearch(event.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              value={vertical}
              onChange={setVertical}
              style={{ width: '100%' }}
              options={verticalOptions} 
            />
          </Col>
        </Row>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[22, 22]}>
            {filteredProducts.map(product => (
              <Col xs={24} sm={12} lg={8} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageShell>
  )
}

export default ProductListPage


