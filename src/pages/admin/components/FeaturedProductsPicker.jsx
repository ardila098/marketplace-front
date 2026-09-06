import {
  Button,
  Empty,
  Image,
  Input,
  List,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd'
import {
  ArrowDown,
  ArrowUp,
  ImageOff,
  Search,
  Trash2,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import useVerticals from '../../../hooks/useVerticals'
import { productService } from '../../../services/productService'

const getThumbnail = product => {
  return (
    product?.images?.[0] ||
    product?.variants?.find(variant => variant.images?.length)?.images?.[0] ||
    product?.references?.find(reference => reference.images?.length)?.images?.[0] ||
    ''
  )
}

const FeaturedProductsPicker = ({
  value = [],
  onChange,
  maxCount = 12,
}) => {
  const [products, setProducts] = useState([])
  const [catalogById, setCatalogById] = useState({})
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [verticalId, setVerticalId] = useState('')
  const debouncedSearch = useDebouncedValue(search, 350)
  const { data: verticals, loading: verticalsLoading } = useVerticals()
  const selectedIds = useMemo(
    () => [...new Set((value || []).map(String).filter(Boolean))],
    [value]
  )
  const productById = catalogById

  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      const response = await productService.list({
        status: 'approved',
        vertical: verticalId || undefined,
        search: debouncedSearch || undefined,
      })

      const items = response.data || []

      setProducts(items)
      setCatalogById(previous => {
        const next = { ...previous }

        items.forEach(product => {
          next[String(product._id)] = product
        })

        return next
      })
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los productos')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, verticalId])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const availableOptions = useMemo(() => {
    const selectedSet = new Set(selectedIds)

    return products
      .filter(product => {
        if (selectedSet.has(String(product._id))) return false

        return product.store?.marketplaceEnabled !== false
      })
      .map(product => ({
        label: product.store?.name
          ? `${product.name} - ${product.store.name}`
          : product.name,
        value: String(product._id),
        searchLabel: String(
          `${product.name} ${product.store?.name || ''} ${
            product.vertical?.name || ''
          } ${product.category?.name || ''}`
        ).toLowerCase(),
      }))
  }, [products, selectedIds])

  const handleAdd = id => {
    if (selectedIds.length >= maxCount) {
      message.warning(`El showcase admite hasta ${maxCount} productos`)
      return
    }

    if (!selectedIds.includes(id)) {
      onChange([...selectedIds, id])
    }
  }

  const handleMove = (index, direction) => {
    const target = index + direction

    if (target < 0 || target >= selectedIds.length) return

    const next = [...selectedIds]
    const [item] = next.splice(index, 1)

    next.splice(target, 0, item)
    onChange(next)
  }

  const handleRemove = id => {
    onChange(selectedIds.filter(item => item !== id))
  }

  return (
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Select
          loading={verticalsLoading}
          placeholder="Todas las verticales"
          value={verticalId || undefined}
          options={[
            { label: 'Todas las verticales', value: '' },
            ...(verticals || []).map(vertical => ({
              label: vertical.name,
              value: String(vertical._id),
            })),
          ]}
          onChange={setVerticalId}
          style={{ width: 220 }}
        />
        <Input
          allowClear
          prefix={<Search size={15} />}
          placeholder="Buscar producto del catalogo..."
          value={search}
          onChange={event => setSearch(event.target.value)}
          style={{ flex: '1 1 230px', minWidth: 230 }}
        />
      </div>

      <Select
        showSearch
        loading={loading}
        placeholder="Elige un producto para el slider de la portada"
        optionFilterProp="searchLabel"
        options={availableOptions}
        onSelect={handleAdd}
        value={undefined}
        style={{ width: '100%' }}
        notFoundContent={loading ? <Spin size="small" /> : null}
      />

      {selectedIds.length ? (
        <List
          size="small"
          bordered
          dataSource={selectedIds}
          locale={{ emptyText: <Empty description="Sin productos" /> }}
          renderItem={(id, index) => {
            const product = productById[id]
            const thumbnail = getThumbnail(product)

            return (
              <List.Item
                actions={[
                  <Button
                    key="up"
                    type="text"
                    size="small"
                    icon={<ArrowUp size={15} />}
                    disabled={index === 0}
                    onClick={() => handleMove(index, -1)}
                  />,
                  <Button
                    key="down"
                    type="text"
                    size="small"
                    icon={<ArrowDown size={15} />}
                    disabled={index === selectedIds.length - 1}
                    onClick={() => handleMove(index, 1)}
                  />,
                  <Button
                    key="remove"
                    type="text"
                    danger
                    size="small"
                    icon={<Trash2 size={15} />}
                    onClick={() => handleRemove(id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    thumbnail ? (
                      <Image
                        src={getUploadUrl(UPLOAD_ROUTES.products.images, thumbnail)}
                        width={42}
                        height={42}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                        preview={false}
                      />
                    ) : (
                      <ImageOff size={30} color="#9ca3af" />
                    )
                  }
                  title={
                    <Space size={6}>
                      <Typography.Text strong>
                        {index + 1}. {product?.name || 'Producto no disponible'}
                      </Typography.Text>
                      {product?.store?.name && (
                        <Typography.Text type="secondary">
                          {product.store.name}
                        </Typography.Text>
                      )}
                    </Space>
                  }
                  description={
                    product ? (
                      <Space size={6} wrap>
                        {product.vertical?.name && (
                          <Tag style={{ marginInlineEnd: 0 }}>
                            {product.vertical.name}
                          </Tag>
                        )}
                        {product.store?.marketplaceEnabled === false && (
                          <Tag color="orange">No esta en el marketplace</Tag>
                        )}
                      </Space>
                    ) : (
                      <Typography.Text type="secondary">
                        Ya no esta disponible en el catalogo
                      </Typography.Text>
                    )
                  }
                />
              </List.Item>
            )
          }}
        />
      ) : (
        <Typography.Text type="secondary">
          Elige los productos que apareceran en el slider de la portada.
        </Typography.Text>
      )}
    </Space>
  )
}

export default FeaturedProductsPicker
