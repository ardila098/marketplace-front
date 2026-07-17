import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Typography,
  message,
} from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { getUploadUrl, UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { categoryService } from '../../services/categoryService'
import { verticalsServices } from '../../services/verticalsServices'

const getCategoryPayload = values => ({
  name: values.name,
  slug: values.slug,
  vertical: values.vertical,
  parent: values.parent || null,
  image: values.image || '',
  description: values.description,
  sortOrder: values.sortOrder || 0,
  isActive: values.isActive !== false,
})

const AdminCategoriesPage = () => {
  const [form] = Form.useForm()
  const selectedVertical = Form.useWatch('vertical', form)
  const [categories, setCategories] = useState([])
  const [verticals, setVerticals] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [verticalFilter, setVerticalFilter] = useState('')

  const loadCategories = useCallback(async () => {
    setLoading(true)

    try {
      const response = await categoryService.adminList({
        search: search || undefined,
        vertical: verticalFilter || undefined,
      })

      setCategories(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las categorias')
    } finally {
      setLoading(false)
    }
  }, [search, verticalFilter])

  const loadVerticals = useCallback(async () => {
    try {
      const response = await verticalsServices.list()
      setVerticals(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las verticales')
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadVerticals()
  }, [loadVerticals])

  const verticalOptions = useMemo(() => (
    verticals.map(vertical => ({
      label: vertical.name,
      value: vertical._id,
    }))
  ), [verticals])

  const parentOptions = useMemo(() => {
    return categories
      .filter(category => {
        const sameVertical = String(category.vertical?._id || category.vertical) === String(selectedVertical)
        const differentCategory = String(category._id) !== String(editingCategory?._id)

        return category.isActive !== false && sameVertical && differentCategory
      })
      .map(category => ({
        label: category.name,
        value: category._id,
      }))
  }, [categories, editingCategory, selectedVertical])

  const openCreateModal = () => {
    setEditingCategory(null)
    form.setFieldsValue({
      name: '',
      slug: '',
      vertical: undefined,
      parent: undefined,
      image: '',
      description: '',
      sortOrder: 0,
      isActive: true,
    })
    setModalOpen(true)
  }

  const openEditModal = useCallback(category => {
    setEditingCategory(category)
    form.setFieldsValue({
      name: category.name,
      slug: category.slug,
      vertical: category.vertical?._id || category.vertical,
      parent: category.parent?._id || category.parent || undefined,
      image: category.image || '',
      description: category.description || '',
      sortOrder: category.sortOrder || 0,
      isActive: category.isActive !== false,
    })
    setModalOpen(true)
  }, [form])

  const closeModal = () => {
    setModalOpen(false)
    setEditingCategory(null)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      const payload = getCategoryPayload(values)

      if (editingCategory) {
        await categoryService.update(editingCategory._id, payload)
        message.success('Categoria actualizada')
      } else {
        await categoryService.create(payload)
        message.success('Categoria creada')
      }

      closeModal()
      loadCategories()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la categoria')
    } finally {
      setSaving(false)
    }
  }

  const handleDeactivate = useCallback(async category => {
    try {
      await categoryService.remove(category._id)
      message.success('Categoria desactivada')
      loadCategories()
    } catch (error) {
      message.error(error?.message || 'No se pudo desactivar la categoria')
    }
  }, [loadCategories])

  const columns = useMemo(() => [
    {
      title: 'Imagen',
      width: 82,
      render: (_, category) => category.image ? (
        <Image
          src={getUploadUrl(UPLOAD_ROUTES.categories.icons, category.image)}
          width={48}
          height={48}
          style={{ borderRadius: 8, objectFit: 'cover' }}
        />
      ) : '-',
    },
    {
      title: 'Categoria',
      render: (_, category) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{category.name}</Typography.Text>
          <Typography.Text type="secondary">/{category.slug}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Vertical',
      render: (_, category) => category.vertical?.name || '-',
    },
    {
      title: 'Padre',
      render: (_, category) => category.parent?.name || '-',
    },
    {
      title: 'Orden',
      dataIndex: 'sortOrder',
      width: 90,
    },
    {
      title: 'Estado',
      render: (_, category) => category.isActive ? 'Activa' : 'Inactiva',
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, category) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(category)}>
            Editar
          </Button>
          <Popconfirm
            title="Desactivar categoria"
            description="Los productos existentes conservaran esta categoria."
            okText="Desactivar"
            cancelText="Cancelar"
            onConfirm={() => handleDeactivate(category)}
          >
            <Button danger disabled={category.isActive === false}>
              Desactivar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ], [handleDeactivate, openEditModal])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Categorias
        </Typography.Title>
        <Typography.Text type="secondary">
          Define las categorias globales por vertical que usaran las tiendas.
        </Typography.Text>
      </div>

      <Space wrap style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space wrap>
          <Input.Search
            allowClear
            placeholder="Buscar categoria"
            value={search}
            onChange={event => setSearch(event.target.value)}
            onSearch={loadCategories}
            style={{ width: 280 }}
          />
          <Select
            allowClear
            placeholder="Vertical"
            options={verticalOptions}
            value={verticalFilter || undefined}
            onChange={value => setVerticalFilter(value || '')}
            style={{ width: 220 }}
          />
        </Space>

        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
          Crear categoria
        </Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
        loading={loading}
        scroll={{ x: 920 }}
      />

      <Modal
        title={editingCategory ? 'Editar categoria' : 'Crear categoria'}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden
        width={720}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            sortOrder: 0,
            isActive: true,
          }}
        >
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input placeholder="Ej: Relojes" />
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <Input placeholder="Se genera automaticamente si lo dejas vacio" />
          </Form.Item>

          <Form.Item label="Vertical" name="vertical" rules={[{ required: true }]}>
            <Select options={verticalOptions} placeholder="Selecciona una vertical" />
          </Form.Item>

          <Form.Item label="Categoria padre" name="parent">
            <Select
              allowClear
              disabled={!selectedVertical}
              options={parentOptions}
              placeholder="Opcional"
            />
          </Form.Item>

          <ImageUploadField
            label="Imagen"
            name="image"
            folder={UPLOAD_FOLDERS.categories.icons}
            uploadRoute={UPLOAD_ROUTES.categories.icons}
            maxCount={1}
            multiple={false}
            disabled={saving}
          />

          <Form.Item label="Descripcion" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Orden" name="sortOrder">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Activa" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving}>
            Guardar categoria
          </Button>
        </Form>
      </Modal>
    </Space>
  )
}

export default AdminCategoriesPage
