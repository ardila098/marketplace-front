import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { getUploadUrl, UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { verticalsServices } from '../../services/verticalsServices'
import {
  FieldGrid,
  FullWidthInputNumber,
  ImagePlaceholder,
  ModalForm,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  SearchInput,
  TableImage,
  Toolbar,
} from '../../styles/dashboardStyles'

const getVerticalPayload = values => ({
  name: values.name,
  slug: values.slug,
  description: values.description || '',
  icon: values.icon || '',
  banner: values.banner || '',
  sortOrder: values.sortOrder || 0,
  isActive: values.isActive !== false,
})

const AdminVerticalsPage = () => {
  const [form] = Form.useForm()
  const [verticals, setVerticals] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingVertical, setEditingVertical] = useState(null)
  const [uploadingFields, setUploadingFields] = useState({})
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)
  const isUploading = Object.values(uploadingFields).some(Boolean)

  const setFieldUploading = useCallback((field, uploading) => {
    setUploadingFields(current => ({
      ...current,
      [field]: uploading,
    }))
  }, [])

  const loadVerticals = useCallback(async () => {
    setLoading(true)

    try {
      const response = await verticalsServices.list()
      const items = response.data || []
      const term = debouncedSearch.trim().toLowerCase()

      setVerticals(
        term
          ? items.filter(vertical => (
            vertical.name?.toLowerCase().includes(term) ||
            vertical.slug?.toLowerCase().includes(term)
          ))
          : items
      )
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las verticales')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch])

  useEffect(() => {
    loadVerticals()
  }, [loadVerticals])

  const openCreateModal = () => {
    setEditingVertical(null)
    form.setFieldsValue({
      name: '',
      slug: '',
      description: '',
      icon: '',
      banner: '',
      sortOrder: 0,
      isActive: true,
    })
    setUploadingFields({})
    setModalOpen(true)
  }

  const openEditModal = useCallback(vertical => {
    setEditingVertical(vertical)
    form.setFieldsValue({
      name: vertical.name,
      slug: vertical.slug,
      description: vertical.description || '',
      icon: vertical.icon || '',
      banner: vertical.banner || '',
      sortOrder: vertical.sortOrder || 0,
      isActive: vertical.isActive !== false,
    })
    setUploadingFields({})
    setModalOpen(true)
  }, [form])

  const closeModal = () => {
    setModalOpen(false)
    setEditingVertical(null)
    setUploadingFields({})
    form.resetFields()
  }

  const handleSubmit = async values => {
    if (isUploading) {
      message.warning('Espera a que terminen de subir las imagenes')
      return
    }

    setSaving(true)

    try {
      const payload = getVerticalPayload(values)

      if (editingVertical) {
        await verticalsServices.update(editingVertical._id, payload)
        message.success('Vertical actualizada')
      } else {
        await verticalsServices.create(payload)
        message.success('Vertical creada')
      }

      closeModal()
      loadVerticals()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la vertical')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = useCallback(async vertical => {
    try {
      await verticalsServices.toggleStatus(vertical._id)
      message.success(vertical.isActive ? 'Vertical deshabilitada' : 'Vertical activada')
      loadVerticals()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el estado')
    }
  }, [loadVerticals])

  const columns = useMemo(() => [
    {
      title: 'Visual',
      width: 160,
      render: (_, vertical) => (
        <Space>
          {vertical.icon ? (
            <TableImage
              src={getUploadUrl(UPLOAD_ROUTES.verticals.icons, vertical.icon)}
              width={44}
              height={44}
              $radius={12}
            />
          ) : (
            <ImagePlaceholder $radius={12} />
          )}
          {vertical.banner ? (
            <TableImage
              src={getUploadUrl(UPLOAD_ROUTES.verticals.banners, vertical.banner)}
              width={76}
              height={44}
            />
          ) : null}
        </Space>
      ),
    },
    {
      title: 'Vertical',
      render: (_, vertical) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{vertical.name}</Typography.Text>
          <Typography.Text type="secondary">/{vertical.slug}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      ellipsis: true,
      render: value => value || '-',
    },
    {
      title: 'Orden',
      dataIndex: 'sortOrder',
      width: 90,
    },
    {
      title: 'Estado',
      width: 110,
      render: (_, vertical) => (
        <Tag color={vertical.isActive ? 'green' : 'default'}>
          {vertical.isActive ? 'Activa' : 'Inactiva'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      width: 240,
      render: (_, vertical) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(vertical)}>
            Editar
          </Button>
          <Popconfirm
            title={vertical.isActive ? 'Deshabilitar vertical' : 'Activar vertical'}
            description={
              vertical.isActive
                ? 'La vertical dejara de mostrarse en el marketplace.'
                : 'La vertical volvera a mostrarse en el marketplace.'
            }
            okText={vertical.isActive ? 'Deshabilitar' : 'Activar'}
            cancelText="Cancelar"
            onConfirm={() => handleToggleStatus(vertical)}
          >
            <Button danger={vertical.isActive}>
              {vertical.isActive ? 'Deshabilitar' : 'Activar'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ], [handleToggleStatus, openEditModal])

  return (
    <PageStack>
      <PageIntro>
        <PageTitle>Verticales</PageTitle>
        <PageDescription>
          Administra las secciones principales del marketplace y sus imagenes.
        </PageDescription>
      </PageIntro>

      <Toolbar>
        <SearchInput
          allowClear
          placeholder="Buscar vertical"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onSearch={setSearch}
        />

        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
          Crear vertical
        </Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={verticals}
        loading={loading}
        scroll={{ x: 980 }}
      />

      <Modal
        title={editingVertical ? 'Editar vertical' : 'Crear vertical'}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden
        width={760}
      >
        <ModalForm
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            sortOrder: 0,
            isActive: true,
          }}
        >
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input placeholder="Ej: Tecnologia" />
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <Input placeholder="Se genera automaticamente si lo dejas vacio" />
          </Form.Item>

          <Form.Item label="Descripcion" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <FieldGrid>
            <ImageUploadField
              label="Icono"
              name="icon"
              folder={UPLOAD_FOLDERS.verticals.icons}
              uploadRoute={UPLOAD_ROUTES.verticals.icons}
              maxCount={1}
              multiple={false}
              disabled={saving}
              onUploadingChange={uploading => setFieldUploading('icon', uploading)}
            />

            <ImageUploadField
              label="Banner"
              name="banner"
              folder={UPLOAD_FOLDERS.verticals.banners}
              uploadRoute={UPLOAD_ROUTES.verticals.banners}
              maxCount={1}
              multiple={false}
              disabled={saving}
              onUploadingChange={uploading => setFieldUploading('banner', uploading)}
            />
          </FieldGrid>

          <Form.Item label="Orden" name="sortOrder">
            <FullWidthInputNumber min={0} />
          </Form.Item>

          <Form.Item label="Activa" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving || isUploading}>
            Guardar vertical
          </Button>
        </ModalForm>
      </Modal>
    </PageStack>
  )
}

export default AdminVerticalsPage
