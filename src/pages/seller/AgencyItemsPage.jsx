import { Button, Drawer, Form, Input, InputNumber, Select, Space, Switch, Table, Tag, Typography, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import {
  AGENCY_ITEM_KINDS,
  AGENCY_ITEM_KIND_OPTIONS,
  AGENCY_ITEM_STATUS,
  AGENCY_ITEM_STATUS_OPTIONS,
  getAgencyKindLabel,
  getAgencyStatusColor,
  getAgencyStatusLabel,
} from '../../constants/agencyItems'
import { isAgencyBusiness, STORE_BUSINESS_TYPES } from '../../constants/businessTypes'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { agencyItemService } from '../../services/agencyItemService'
import { storeService } from '../../services/storeService'
import { currency } from '../../utils/formatters'

const getDefaultKind = store => {
  if (store?.businessType === STORE_BUSINESS_TYPES.REAL_ESTATE_AGENCY.value) {
    return AGENCY_ITEM_KINDS.PROPERTY.value
  }

  return AGENCY_ITEM_KINDS.VEHICLE.value
}

const getAllowedKinds = store => {
  if (store?.businessType === STORE_BUSINESS_TYPES.REAL_ESTATE_AGENCY.value) {
    return AGENCY_ITEM_KIND_OPTIONS.filter(option => option.value === AGENCY_ITEM_KINDS.PROPERTY.value)
  }

  return AGENCY_ITEM_KIND_OPTIONS.filter(option => option.value !== AGENCY_ITEM_KINDS.PROPERTY.value)
}

const formatDateInput = value => value ? String(value).slice(0, 10) : null

const getFormValues = (item, store) => ({
  kind: item?.kind || getDefaultKind(store),
  title: item?.title,
  slug: item?.slug,
  description: item?.description,
  price: item?.price,
  city: item?.city,
  referenceCode: item?.referenceCode,
  platformCommissionRate: item?.platformCommissionRate,
  platformCommissionAmount: item?.platformCommissionAmount,
  availabilityNotes: item?.availabilityNotes,
  images: item?.images || [],
  status: item?.status || AGENCY_ITEM_STATUS.DRAFT.value,
  isActive: item?.isActive !== false,
  contactName: item?.contactName,
  contactPhone: item?.contactPhone,
  ...(item?.vehicle || {}),
  soatExpiresAt: formatDateInput(item?.vehicle?.soatExpiresAt),
  technicalReviewExpiresAt: formatDateInput(item?.vehicle?.technicalReviewExpiresAt),
  ...(item?.property || {}),
  availableFrom: formatDateInput(item?.property?.availableFrom),
})

const buildPayload = values => ({
  kind: values.kind,
  title: values.title,
  slug: values.slug,
  description: values.description,
  price: values.price,
  city: values.city,
  referenceCode: values.referenceCode,
  platformCommissionRate: values.platformCommissionRate,
  platformCommissionAmount: values.platformCommissionAmount,
  availabilityNotes: values.availabilityNotes,
  images: values.images || [],
  status: values.status,
  isActive: values.isActive,
  contactName: values.contactName,
  contactPhone: values.contactPhone,
  vehicle: {
    brand: values.brand,
    model: values.model,
    version: values.version,
    year: values.year,
    mileageKm: values.mileageKm,
    transmission: values.transmission,
    fuelType: values.fuelType,
    bodyType: values.bodyType,
    engineCc: values.engineCc,
    color: values.color,
    condition: values.condition,
    plateEnding: values.plateEnding,
    ownerType: values.ownerType,
    acceptsTradeIn: values.acceptsTradeIn,
    financingAvailable: values.financingAvailable,
    soatExpiresAt: values.soatExpiresAt,
    technicalReviewExpiresAt: values.technicalReviewExpiresAt,
  },
  property: {
    propertyType: values.propertyType,
    operationType: values.operationType,
    areaM2: values.areaM2,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    parkingSpaces: values.parkingSpaces,
    administrationFee: values.administrationFee,
    stratum: values.stratum,
    builtAreaM2: values.builtAreaM2,
    floor: values.floor,
    furnished: values.furnished,
    zone: values.zone,
    neighborhood: values.neighborhood,
    address: values.address,
    availableFrom: values.availableFrom,
  },
})

const renderImage = item => {
  const image = item.coverImage || item.images?.[0]

  if (!image) return <div style={{ width: 54, height: 42, borderRadius: 8, background: '#f3f4f6' }} />

  return (
    <img
      src={getUploadUrl(UPLOAD_ROUTES.agencyItems.images, image)}
      alt={item.title}
      style={{ width: 54, height: 42, borderRadius: 8, objectFit: 'cover' }}
    />
  )
}

const AgencyItemsPage = () => {
  const [form] = Form.useForm()
  const [items, setItems] = useState([])
  const [store, setStore] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const kind = Form.useWatch('kind', form)
  const agencyEnabled = isAgencyBusiness(store?.businessType)
  const allowedKinds = useMemo(() => getAllowedKinds(store), [store])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const storeResponse = await storeService.getMyStore()
      const currentStore = storeResponse.data

      setStore(currentStore)

      if (isAgencyBusiness(currentStore?.businessType)) {
        const response = await agencyItemService.listMyStore()
        setItems(response.data || [])
      } else {
        setItems([])
      }
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar el inventario')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openDrawer = item => {
    setSelectedItem(item || null)
    form.setFieldsValue(getFormValues(item, store))
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setSelectedItem(null)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const payload = buildPayload(values)

      if (selectedItem) {
        await agencyItemService.update(selectedItem._id, payload)
      } else {
        await agencyItemService.create(payload)
      }

      message.success('Inventario guardado')
      closeDrawer()
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar el item')
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    {
      title: '',
      width: 76,
      render: (_, item) => renderImage(item),
    },
    {
      title: 'Item',
      render: (_, item) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{item.title}</Typography.Text>
          <Typography.Text type="secondary">{item.city || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Tipo',
      render: (_, item) => getAgencyKindLabel(item.kind),
    },
    {
      title: 'Precio',
      render: (_, item) => currency(item.price),
    },
    {
      title: 'Estado',
      render: (_, item) => (
        <Space>
          <Tag color={getAgencyStatusColor(item.status)}>
            {getAgencyStatusLabel(item.status)}
          </Tag>
          {!item.isActive && <Tag>Inactivo</Tag>}
        </Space>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, item) => (
        <Button onClick={() => openDrawer(item)}>
          Editar
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
            Inventario de agencia
          </Typography.Title>
          <Typography.Text type="secondary">
            Publica carros, motos o inmuebles sin mezclarlos con productos del marketplace.
          </Typography.Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!agencyEnabled}
          onClick={() => openDrawer(null)}
        >
          Nuevo item
        </Button>
      </Space>

      {!agencyEnabled && (
        <Tag color="gold">
          Pide a un administrador marcar tu tienda como agencia para activar este modulo.
        </Tag>
      )}

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={items}
        loading={loading}
        scroll={{ x: 860 }}
      />

      <Drawer
        title={selectedItem ? 'Editar item' : 'Nuevo item'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={640}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            kind: getDefaultKind(store),
            status: AGENCY_ITEM_STATUS.DRAFT.value,
            isActive: true,
            condition: 'Usado',
            operationType: 'Venta',
            acceptsTradeIn: false,
            financingAvailable: false,
            furnished: false,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tipo" name="kind" rules={[{ required: true }]}>
            <Select options={allowedKinds} />
          </Form.Item>

          <Form.Item label="Titulo" name="title" rules={[{ required: true }]}>
            <Input placeholder="Toyota Corolla 2020" />
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <Input placeholder="se genera automaticamente si lo dejas vacio" />
          </Form.Item>

          <Form.Item label="Descripcion" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Space size="middle" style={{ width: '100%' }} align="start">
            <Form.Item label="Precio" name="price" style={{ flex: 1 }}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Ciudad" name="city" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%' }} align="start">
            <Form.Item label="Referencia interna" name="referenceCode" style={{ flex: 1 }}>
              <Input placeholder="REF-001" />
            </Form.Item>
            <Form.Item label="Comision plataforma %" name="platformCommissionRate" style={{ flex: 1 }}>
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Comision fija" name="platformCommissionAmount" style={{ flex: 1 }}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Space>

          <Form.Item label="Notas de disponibilidad" name="availabilityNotes">
            <Input.TextArea rows={2} placeholder="Disponible para visita, separado hasta tal fecha, etc." />
          </Form.Item>

          <ImageUploadField
            label="Imagenes"
            name="images"
            folder={UPLOAD_FOLDERS.agencyItems.images}
            uploadRoute={UPLOAD_ROUTES.agencyItems.images}
            maxCount={8}
          />

          {kind === AGENCY_ITEM_KINDS.PROPERTY.value ? (
            <>
              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Tipo de inmueble" name="propertyType" style={{ flex: 1 }}>
                  <Input placeholder="Apartamento, casa, lote" />
                </Form.Item>
                <Form.Item label="Operacion" name="operationType" style={{ flex: 1 }}>
                  <Select options={[{ label: 'Venta', value: 'Venta' }, { label: 'Arriendo', value: 'Arriendo' }]} />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Area m2" name="areaM2" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Area construida" name="builtAreaM2" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Alcobas" name="bedrooms" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Banos" name="bathrooms" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Parqueaderos" name="parkingSpaces" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Administracion" name="administrationFee" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Estrato" name="stratum" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Piso" name="floor" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Amoblado" name="furnished" valuePropName="checked" style={{ flex: 1 }}>
                  <Switch />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Zona" name="zone" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Barrio" name="neighborhood" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Direccion" name="address" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Disponible desde" name="availableFrom" style={{ flex: 1 }}>
                  <Input placeholder="2026-08-02" />
                </Form.Item>
              </Space>
            </>
          ) : (
            <>
              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Marca" name="brand" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Modelo" name="model" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Version" name="version" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Ano" name="year" style={{ flex: 1 }}>
                  <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Kilometraje" name="mileageKm" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Cilindraje" name="engineCc" style={{ flex: 1 }}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Transmision" name="transmission" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Combustible" name="fuelType" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Tipo carroceria" name="bodyType" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Color" name="color" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Estado" name="condition" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Terminacion placa" name="plateEnding" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Propietario" name="ownerType" style={{ flex: 1 }}>
                  <Select
                    allowClear
                    options={[
                      { label: 'Agencia', value: 'Agencia' },
                      { label: 'Tercero consignado', value: 'Tercero consignado' },
                      { label: 'Dueño directo', value: 'Dueno directo' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="SOAT vence" name="soatExpiresAt" style={{ flex: 1 }}>
                  <Input placeholder="2026-08-02" />
                </Form.Item>
                <Form.Item label="Tecnomecanica vence" name="technicalReviewExpiresAt" style={{ flex: 1 }}>
                  <Input placeholder="2026-08-02" />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }} align="start">
                <Form.Item label="Recibe permuta" name="acceptsTradeIn" valuePropName="checked" style={{ flex: 1 }}>
                  <Switch />
                </Form.Item>
                <Form.Item label="Financiacion disponible" name="financingAvailable" valuePropName="checked" style={{ flex: 1 }}>
                  <Switch />
                </Form.Item>
              </Space>
            </>
          )}

          <Space size="middle" style={{ width: '100%' }} align="start">
            <Form.Item label="Estado publicacion" name="status" style={{ flex: 1 }}>
              <Select options={AGENCY_ITEM_STATUS_OPTIONS} />
            </Form.Item>
            <Form.Item label="Activo" name="isActive" valuePropName="checked" style={{ flex: 1 }}>
              <Switch />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%' }} align="start">
            <Form.Item label="Contacto" name="contactName" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Telefono" name="contactPhone" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </Space>

          <Button type="primary" htmlType="submit" loading={saving} block>
            Guardar item
          </Button>
        </Form>
      </Drawer>
    </Space>
  )
}

export default AgencyItemsPage

