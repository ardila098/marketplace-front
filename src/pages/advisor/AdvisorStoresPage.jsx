import { Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { STORE_BUSINESS_TYPE_OPTIONS, STORE_BUSINESS_TYPES } from '../../constants/businessTypes'
import { advisorService } from '../../services/advisorService'
import { currency } from '../../utils/formatters'

const getBusinessTypeLabel = value => {
  return STORE_BUSINESS_TYPE_OPTIONS.find(type => type.value === value)?.label ||
    STORE_BUSINESS_TYPES.RETAIL.label
}

const AdvisorStoresPage = () => {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(false)

  const loadStores = useCallback(async () => {
    setLoading(true)

    try {
      const response = await advisorService.getStores()
      setStores(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los negocios')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStores()
  }, [loadStores])

  const columns = [
    {
      title: 'Negocio',
      render: (_, store) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{store.name}</Typography.Text>
          <Typography.Text type="secondary">/stores/{store.slug}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Seller',
      render: (_, store) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{store.owner?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{store.owner?.email || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Tipo',
      render: (_, store) => getBusinessTypeLabel(store.businessType),
    },
    {
      title: 'Vertical',
      render: (_, store) => store.vertical?.name || '-',
    },
    {
      title: 'Marketplace',
      render: (_, store) => (
        <Tag color={store.marketplaceEnabled === false ? 'default' : 'green'}>
          {store.marketplaceEnabled === false ? 'No visible' : 'Visible'}
        </Tag>
      ),
    },
    {
      title: 'Estado',
      render: (_, store) => <StatusTag status={store.status} />,
    },
    {
      title: 'Pendiente',
      render: (_, store) => currency(store.metrics?.pendingAmount),
    },
    {
      title: 'Pagado',
      render: (_, store) => currency(store.metrics?.paidAmount),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Negocios asociados
        </Typography.Title>
        <Typography.Text type="secondary">
          Consulta las tiendas que conseguiste y su estado comercial dentro de la plataforma.
        </Typography.Text>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={stores}
        loading={loading}
        scroll={{ x: 980 }}
      />
    </Space>
  )
}

export default AdvisorStoresPage
