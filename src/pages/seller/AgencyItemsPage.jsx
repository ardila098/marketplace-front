import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, Select, Space, Switch, Table, Tag, Typography, message } from 'antd'
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
import {
  FieldGrid,
  FullWidthInputNumber,
  ImagePlaceholder,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  ThumbnailImage,
  Toolbar,
} from '../../styles/dashboardStyles'
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

  if (!image) {
    return <ImagePlaceholder $width={54} $height={42} $radius={8} />
  }

  return (
    <ThumbnailImage
      src={getUploadUrl(UPLOAD_ROUTES.agencyItems.images, image)}
      alt={item.title}
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
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Inventario de agencia</PageTitle>
          <PageDescription>
            Publica carros, motos o inmuebles sin mezclarlos con productos del marketplace.
          </PageDescription>
        </PageIntro>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!agencyEnabled}
          onClick={() => openDrawer(null)}
        >
          Nuevo item
        </Button>
      </Toolbar>

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

          <FieldGrid>
            <Form.Item label="Precio" name="price">
              <FullWidthInputNumber min={0} />
            </Form.Item>
            <Form.Item label="Ciudad" name="city">
              <Input />
            </Form.Item>
          </FieldGrid>

          <FieldGrid>
            <Form.Item label="Referencia interna" name="referenceCode">
              <Input placeholder="REF-001" />
            </Form.Item>
            <Form.Item label="Comision plataforma %" name="platformCommissionRate">
              <FullWidthInputNumber min={0} max={100} />
            </Form.Item>
            <Form.Item label="Comision fija" name="platformCommissionAmount">
              <FullWidthInputNumber min={0} />
            </Form.Item>
          </FieldGrid>

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
              <FieldGrid>
                <Form.Item label="Tipo de inmueble" name="propertyType">
                  <Input placeholder="Apartamento, casa, lote" />
                </Form.Item>
                <Form.Item label="Operacion" name="operationType">
                  <Select options={[{ label: 'Venta', value: 'Venta' }, { label: 'Arriendo', value: 'Arriendo' }]} />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Area m2" name="areaM2">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Area construida" name="builtAreaM2">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Alcobas" name="bedrooms">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Banos" name="bathrooms">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Parqueaderos" name="parkingSpaces">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Administracion" name="administrationFee">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Estrato" name="stratum">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Piso" name="floor">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Amoblado" name="furnished" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Zona" name="zone">
                  <Input />
                </Form.Item>
                <Form.Item label="Barrio" name="neighborhood">
                  <Input />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Direccion" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="Disponible desde" name="availableFrom">
                  <Input placeholder="2026-08-02" />
                </Form.Item>
              </FieldGrid>
            </>
          ) : (
            <>
              <FieldGrid>
                <Form.Item label="Marca" name="brand">
                  <Input />
                </Form.Item>
                <Form.Item label="Modelo" name="model">
                  <Input />
                </Form.Item>
                <Form.Item label="Version" name="version">
                  <Input />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Ano" name="year">
                  <FullWidthInputNumber min={1900} max={2100} />
                </Form.Item>
                <Form.Item label="Kilometraje" name="mileageKm">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
                <Form.Item label="Cilindraje" name="engineCc">
                  <FullWidthInputNumber min={0} />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Transmision" name="transmission">
                  <Input />
                </Form.Item>
                <Form.Item label="Combustible" name="fuelType">
                  <Input />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Tipo carroceria" name="bodyType">
                  <Input />
                </Form.Item>
                <Form.Item label="Color" name="color">
                  <Input />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Estado" name="condition">
                  <Input />
                </Form.Item>
                <Form.Item label="Terminacion placa" name="plateEnding">
                  <Input />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Propietario" name="ownerType">
                  <Select
                    allowClear
                    options={[
                      { label: 'Agencia', value: 'Agencia' },
                      { label: 'Tercero consignado', value: 'Tercero consignado' },
                      { label: 'Dueno directo', value: 'Dueno directo' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="SOAT vence" name="soatExpiresAt">
                  <Input placeholder="2026-08-02" />
                </Form.Item>
                <Form.Item label="Tecnomecanica vence" name="technicalReviewExpiresAt">
                  <Input placeholder="2026-08-02" />
                </Form.Item>
              </FieldGrid>

              <FieldGrid>
                <Form.Item label="Recibe permuta" name="acceptsTradeIn" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item label="Financiacion disponible" name="financingAvailable" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </FieldGrid>
            </>
          )}

          <FieldGrid>
            <Form.Item label="Estado publicacion" name="status">
              <Select options={AGENCY_ITEM_STATUS_OPTIONS} />
            </Form.Item>
            <Form.Item label="Activo" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>
          </FieldGrid>

          <FieldGrid>
            <Form.Item label="Contacto" name="contactName">
              <Input />
            </Form.Item>
            <Form.Item label="Telefono" name="contactPhone">
              <Input />
            </Form.Item>
          </FieldGrid>

          <Button type="primary" htmlType="submit" loading={saving} block>
            Guardar item
          </Button>
        </Form>
      </Drawer>
    </PageStack>
  )
}

export default AgencyItemsPage
