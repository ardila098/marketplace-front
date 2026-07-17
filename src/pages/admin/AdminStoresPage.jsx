import { Button, Drawer, Form, Input, InputNumber, Select, Space, Switch, Table, Typography, message } from 'antd'
import { CheckOutlined, SettingOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import StatusTag from '../../components/common/StatusTag'
import { storeService } from '../../services/storeService'

const STORE_STATUS_OPTIONS = [
  { label: 'Pendiente', value: 'pending' },
  { label: 'Aprobada', value: 'approved' },
  { label: 'Rechazada', value: 'rejected' },
]

const DOMAIN_STATUS_OPTIONS = [
  { label: 'Pendiente de verificación', value: 'pending_verification' },
  { label: 'Verificado', value: 'verified' },
  { label: 'Rechazado', value: 'rejected' },
  { label: 'Sin configurar', value: 'not_configured' },
]

const getFormValues = store => ({
  status: store?.status,
  isActive: store?.isActive,
  commissionRate: store?.commissionRate,
  isPublished: store?.storefront?.isPublished !== false,
  seoTitle: store?.storefront?.seoTitle,
  seoDescription: store?.storefront?.seoDescription,
  domainStatus: store?.storefront?.customDomain?.status || 'not_configured',
  rejectionReason: store?.storefront?.customDomain?.rejectionReason,
})

const AdminStoresPage = () => {
  const [form] = Form.useForm()
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [search, setSearch] = useState('')

  const loadStores = useCallback(async (params = {}) => {
    setLoading(true)

    try {
      const response = await storeService.adminList(params)
      setStores(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las tiendas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStores()
  }, [loadStores])

  const openSettings = store => {
    setSelectedStore(store)
    form.setFieldsValue(getFormValues(store))
  }

  const closeSettings = () => {
    setSelectedStore(null)
    form.resetFields()
  }

  const handleApprove = async store => {
    try {
      await storeService.approve(store._id)
      message.success('Tienda aprobada')
      loadStores({ search })
    } catch (error) {
      message.error(error?.message || 'No se pudo aprobar la tienda')
    }
  }

  const handleSaveSettings = async values => {
    if (!selectedStore) return

    setSaving(true)

    try {
      await storeService.update(selectedStore._id, {
        status: values.status,
        isActive: values.isActive,
        commissionRate: values.commissionRate,
      })

      await storeService.updateStorefront(selectedStore._id, {
        isPublished: values.isPublished,
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
      })

      if (selectedStore.storefront?.customDomain?.hostname) {
        await storeService.updateDomainStatus(selectedStore._id, {
          status: values.domainStatus,
          rejectionReason: values.rejectionReason,
        })
      }

      message.success('Tienda actualizada')
      closeSettings()
      loadStores({ search })
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la tienda')
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    {
      title: 'Tienda',
      render: (_, store) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{store.name}</Typography.Text>
          <Typography.Text type="secondary">/stores/{store.slug}</Typography.Text>
          {store.storefront?.customDomain?.hostname && (
            <Typography.Text type="secondary">{store.storefront.customDomain.hostname}</Typography.Text>
          )}
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
      title: 'Vertical',
      render: (_, store) => store.vertical?.name || '-',
    },
    {
      title: 'Comisión',
      render: (_, store) => `${store.commissionRate || 0}%`,
    },
    {
      title: 'Estado',
      render: (_, store) => <StatusTag status={store.status} />,
    },
    {
      title: 'Dominio',
      render: (_, store) => <StatusTag status={store.storefront?.customDomain?.status || 'not_configured'} />,
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, store) => (
        <Space>
          {store.status !== 'approved' && (
            <Button icon={<CheckOutlined />} onClick={() => handleApprove(store)}>
              Aprobar
            </Button>
          )}
          <Button icon={<SettingOutlined />} onClick={() => openSettings(store)}>
            Configurar
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Tiendas
        </Typography.Title>
        <Typography.Text type="secondary">
          Administra publicación, comisiones y dominios personalizados.
        </Typography.Text>
      </div>

      <Input.Search
        allowClear
        placeholder="Buscar tienda, seller o dominio"
        value={search}
        onChange={event => setSearch(event.target.value)}
        onSearch={value => loadStores({ search: value })}
        style={{ maxWidth: 380 }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={stores}
        loading={loading}
        scroll={{ x: 980 }}
      />

      <Drawer
        title={selectedStore?.name || 'Configurar tienda'}
        open={Boolean(selectedStore)}
        onClose={closeSettings}
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveSettings}>
          <Form.Item label="Estado" name="status" rules={[{ required: true }]}>
            <Select options={STORE_STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item label="Activa" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Publicada" name="isPublished" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Comisión plataforma (%)" name="commissionRate">
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Título SEO" name="seoTitle">
            <Input />
          </Form.Item>

          <Form.Item label="Descripción SEO" name="seoDescription">
            <Input.TextArea rows={3} />
          </Form.Item>

          {selectedStore?.storefront?.customDomain?.hostname && (
            <>
              <Form.Item label="Estado del dominio" name="domainStatus">
                <Select options={DOMAIN_STATUS_OPTIONS} />
              </Form.Item>

              <Form.Item label="Motivo de rechazo" name="rejectionReason">
                <Input.TextArea rows={3} />
              </Form.Item>
            </>
          )}

          <Button type="primary" htmlType="submit" loading={saving} block>
            Guardar configuración
          </Button>
        </Form>
      </Drawer>
    </Space>
  )
}

export default AdminStoresPage
