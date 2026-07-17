import { Button, Image, Input, Select, Space, Table, Typography, message } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { productService } from '../../services/productService'

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Borrador', value: 'draft' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Aprobado', value: 'approved' },
  { label: 'Rechazado', value: 'rejected' },
]

const getPreviewImage = product => {
  return (
    product?.images?.[0] ||
    product?.variants?.find(variant => variant.images?.length)?.images?.[0] ||
    product?.references?.find(reference => reference.images?.length)?.images?.[0] ||
    ''
  )
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      const response = await productService.list({
        search: search || undefined,
        status: status || undefined,
      })

      setProducts(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los productos')
    } finally {
      setLoading(false)
    }
  }, [search, status])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const updateStatus = useCallback(async (product, action) => {
    setSavingId(product._id)

    try {
      if (action === 'approve') {
        await productService.approve(product._id)
        message.success('Producto aprobado')
      } else {
        await productService.reject(product._id)
        message.success('Producto rechazado')
      }

      loadProducts()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el producto')
    } finally {
      setSavingId('')
    }
  }, [loadProducts])

  const columns = useMemo(() => [
    {
      title: 'Imagen',
      width: 82,
      render: (_, product) => {
        const image = getPreviewImage(product)

        if (!image) return '-'

        return (
          <Image
            src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
            width={48}
            height={48}
            style={{ borderRadius: 6, objectFit: 'cover' }}
          />
        )
      },
    },
    {
      title: 'Producto',
      render: (_, product) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{product.name}</Typography.Text>
          <Typography.Text type="secondary">{product.category?.name || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Tienda',
      render: (_, product) => product.store?.name || '-',
    },
    {
      title: 'Vertical',
      render: (_, product) => product.vertical?.name || '-',
    },
    {
      title: 'Estado',
      render: (_, product) => <StatusTag status={product.status} />,
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, product) => (
        <Space>
          <Button
            icon={<CheckOutlined />}
            loading={savingId === product._id}
            disabled={product.status === 'approved'}
            onClick={() => updateStatus(product, 'approve')}
          >
            Aprobar
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            loading={savingId === product._id}
            disabled={product.status === 'rejected'}
            onClick={() => updateStatus(product, 'reject')}
          >
            Rechazar
          </Button>
        </Space>
      ),
    },
  ], [savingId, updateStatus])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Productos
        </Typography.Title>
        <Typography.Text type="secondary">
          Revisa y aprueba los productos publicados por las tiendas.
        </Typography.Text>
      </div>

      <Space wrap>
        <Input.Search
          allowClear
          placeholder="Buscar producto"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onSearch={loadProducts}
          style={{ width: 320 }}
        />
        <Select
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
          style={{ width: 180 }}
        />
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        loading={loading}
        scroll={{ x: 920 }}
      />
    </Space>
  )
}

export default AdminProductsPage
