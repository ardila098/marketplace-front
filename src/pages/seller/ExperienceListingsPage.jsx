import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, Select, Space, Switch, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { isExperienceBusiness } from '../../constants/businessTypes'
import {
  EXPERIENCE_LISTING_STATUS,
  EXPERIENCE_LISTING_STATUS_OPTIONS,
  EXPERIENCE_PRICING_UNIT_OPTIONS,
  getExperienceStatusColor,
  getExperienceStatusLabel,
  getPricingUnitLabel,
} from '../../constants/experiences'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { experienceService } from '../../services/experienceService'
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
import { arrayToText, currency, datesToText, textToArray, textToDates } from '../../utils/formatters'



const getFormValues = listing => ({
  title: listing?.title,
  slug: listing?.slug,
  description: listing?.description,
  city: listing?.city,
  locationName: listing?.locationName,
  address: listing?.address,
  price: listing?.price,
  pricingUnit: listing?.pricingUnit || 'night',
  capacityGuests: listing?.capacityGuests,
  bedrooms: listing?.bedrooms,
  bathrooms: listing?.bathrooms,
  minNights: listing?.minNights || 1,
  amenities: arrayToText(listing?.amenities),
  rules: arrayToText(listing?.rules),
  blockedDates: datesToText(listing?.availability?.blockedDates),
  availabilityNotes: listing?.availability?.notes,
  images: listing?.images || [],
  status: listing?.status || EXPERIENCE_LISTING_STATUS.DRAFT.value,
  isActive: listing?.isActive !== false,
})

const buildPayload = values => ({
  title: values.title,
  slug: values.slug,
  description: values.description,
  city: values.city,
  locationName: values.locationName,
  address: values.address,
  price: values.price,
  pricingUnit: values.pricingUnit,
  capacityGuests: values.capacityGuests,
  bedrooms: values.bedrooms,
  bathrooms: values.bathrooms,
  minNights: values.minNights,
  amenities: textToArray(values.amenities),
  rules: textToArray(values.rules),
  availability: {
    blockedDates: textToDates(values.blockedDates),
    notes: values.availabilityNotes,
  },
  images: values.images || [],
  status: values.status,
  isActive: values.isActive,
})

const renderImage = listing => {
  const image = listing.coverImage || listing.images?.[0]

  if (!image) {
    return <ImagePlaceholder $width={54} $height={42} $radius={8} />
  }

  return (
    <ThumbnailImage
      src={getUploadUrl(UPLOAD_ROUTES.experiences.images, image)}
      alt={listing.title}
    />
  )
}

const ExperienceListingsPage = () => {
  const [form] = Form.useForm()
  const [store, setStore] = useState(null)
  const [listings, setListings] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const experienceEnabled = isExperienceBusiness(store?.businessType)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const storeResponse = await storeService.getMyStore()
      const currentStore = storeResponse.data
      setStore(currentStore)

      if (isExperienceBusiness(currentStore?.businessType)) {
        const response = await experienceService.listMyStore()
        setListings(response.data || [])
      } else {
        setListings([])
      }
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las experiencias')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openDrawer = useCallback(listing => {
    setSelectedListing(listing || null)
    form.setFieldsValue(getFormValues(listing))
    setDrawerOpen(true)
  }, [form])

  const closeDrawer = () => {
    setDrawerOpen(false)
    setSelectedListing(null)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const payload = buildPayload(values)

      if (selectedListing) {
        await experienceService.update(selectedListing._id, payload)
      } else {
        await experienceService.create(payload)
      }

      message.success('Experiencia guardada')
      closeDrawer()
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la experiencia')
    } finally {
      setSaving(false)
    }
  }

  const columns = useMemo(() => [
    {
      title: '',
      width: 76,
      render: (_, listing) => renderImage(listing),
    },
    {
      title: 'Experiencia',
      render: (_, listing) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{listing.title}</Typography.Text>
          <Typography.Text type="secondary">{listing.city || listing.locationName || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Precio',
      render: (_, listing) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{currency(listing.price)}</Typography.Text>
          <Typography.Text type="secondary">{getPricingUnitLabel(listing.pricingUnit)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Capacidad',
      render: (_, listing) => listing.capacityGuests ? `${listing.capacityGuests} personas` : '-',
    },
    {
      title: 'Estado',
      render: (_, listing) => (
        <Space>
          <Tag color={getExperienceStatusColor(listing.status)}>
            {getExperienceStatusLabel(listing.status)}
          </Tag>
          {!listing.isActive && <Tag>Inactiva</Tag>}
        </Space>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, listing) => (
        <Button onClick={() => openDrawer(listing)}>
          Editar
        </Button>
      ),
    },
  ], [openDrawer])

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Experiencias</PageTitle>
          <PageDescription>
            Publica glampings, fincas, estadias o experiencias con solicitud de reserva.
          </PageDescription>
        </PageIntro>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!experienceEnabled}
          onClick={() => openDrawer(null)}
        >
          Nueva experiencia
        </Button>
      </Toolbar>

      {!experienceEnabled && (
        <Tag color="gold">
          Pide a un administrador marcar tu negocio como experiencias para activar este modulo.
        </Tag>
      )}

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={listings}
        loading={loading}
        scroll={{ x: 900 }}
      />

      <Drawer
        title={selectedListing ? 'Editar experiencia' : 'Nueva experiencia'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={680}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            pricingUnit: 'night',
            minNights: 1,
            status: EXPERIENCE_LISTING_STATUS.DRAFT.value,
            isActive: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Titulo" name="title" rules={[{ required: true }]}>
            <Input placeholder="Glamping privado en Guatape" />
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <Input placeholder="se genera automaticamente si lo dejas vacio" />
          </Form.Item>

          <Form.Item label="Descripcion" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <FieldGrid>
            <Form.Item label="Ciudad" name="city">
              <Input />
            </Form.Item>
            <Form.Item label="Lugar" name="locationName">
              <Input />
            </Form.Item>
          </FieldGrid>

          <Form.Item label="Direccion o referencia" name="address">
            <Input />
          </Form.Item>

          <FieldGrid>
            <Form.Item label="Precio" name="price">
              <FullWidthInputNumber min={0} />
            </Form.Item>
            <Form.Item label="Unidad" name="pricingUnit">
              <Select options={EXPERIENCE_PRICING_UNIT_OPTIONS} />
            </Form.Item>
            <Form.Item label="Noches minimas" name="minNights">
              <FullWidthInputNumber min={1} />
            </Form.Item>
          </FieldGrid>

          <FieldGrid>
            <Form.Item label="Capacidad" name="capacityGuests">
              <FullWidthInputNumber min={0} />
            </Form.Item>
            <Form.Item label="Alcobas" name="bedrooms">
              <FullWidthInputNumber min={0} />
            </Form.Item>
            <Form.Item label="Banos" name="bathrooms">
              <FullWidthInputNumber min={0} />
            </Form.Item>
          </FieldGrid>

          <Form.Item label="Amenidades" name="amenities">
            <Input.TextArea rows={2} placeholder="Jacuzzi, chimenea, vista al lago" />
          </Form.Item>

          <Form.Item label="Reglas" name="rules">
            <Input.TextArea rows={2} placeholder="No mascotas, check-in desde 3pm" />
          </Form.Item>

          <Form.Item label="Fechas bloqueadas" name="blockedDates">
            <Input.TextArea rows={2} placeholder="2026-08-10, 2026-08-11, 2026-08-12" />
          </Form.Item>

          <Form.Item label="Notas de disponibilidad" name="availabilityNotes">
            <Input.TextArea rows={2} />
          </Form.Item>

          <ImageUploadField
            label="Imagenes"
            name="images"
            folder={UPLOAD_FOLDERS.experiences.images}
            uploadRoute={UPLOAD_ROUTES.experiences.images}
            maxCount={8}
          />

          <FieldGrid>
            <Form.Item label="Estado publicacion" name="status">
              <Select options={EXPERIENCE_LISTING_STATUS_OPTIONS} />
            </Form.Item>
            <Form.Item label="Activa" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>
          </FieldGrid>

          <Button type="primary" htmlType="submit" loading={saving} block>
            Guardar experiencia
          </Button>
        </Form>
      </Drawer>
    </PageStack>
  )
}

export default ExperienceListingsPage
