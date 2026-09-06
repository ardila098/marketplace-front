import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { storeCategoryService } from '../../services/storeCategoryService'
import {
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  Toolbar,
} from '../../styles/dashboardStyles'

const StoreCategoriesPage = () => {
  const [form] = Form.useForm()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await storeCategoryService.listMine({ includeInactive: true })
      setCategories(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las categorias')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ sortOrder: 0, isActive: true })
    setModalOpen(true)
  }

  const openEdit = category => {
    setEditing(category)
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      image: category.image,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    setSaving(true)

    try {
      if (editing) {
        await storeCategoryService.update(editing._id, values)
      } else {
        await storeCategoryService.create(values)
      }

      message.success('Categoria guardada')
      setModalOpen(false)
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la categoria')
    } finally {
      setSaving(false)
    }
  }

  const setActive = async (category, isActive) => {
    try {
      await storeCategoryService.update(category._id, { isActive })
      message.success(isActive ? 'Categoria activada' : 'Categoria desactivada')
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la categoria')
    }
  }

  const remove = async category => {
    try {
      await storeCategoryService.remove(category._id)
      message.success('Categoria desactivada')
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo desactivar la categoria')
    }
  }

  const columns = [
    {
      title: 'Imagen',
      width: 90,
      render: (_, category) => category.image ? (
        <Image
          src={getUploadUrl(UPLOAD_ROUTES.stores.categories.images, category.image)}
          width={56}
          height={56}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          preview={false}
        />
      ) : '-',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (_, category) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{category.name}</Typography.Text>
          <Typography.Text type="secondary">/{category.slug}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      render: value => value || '-',
    },
    {
      title: 'Orden',
      dataIndex: 'sortOrder',
      width: 80,
    },
    {
      title: 'Estado',
      width: 120,
      render: (_, category) => (
        <Tag color={category.isActive ? 'green' : 'default'}>
          {category.isActive ? 'Activa' : 'Inactiva'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, category) => (
        <Space>
          <Button size="small" onClick={() => openEdit(category)}>Editar</Button>
          {category.isActive ? (
            <Popconfirm
              title="Desactivar categoria"
              description="Los productos la conservaran, pero no se mostrara en la tienda."
              onConfirm={() => remove(category)}
            >
              <Button size="small" danger>Desactivar</Button>
            </Popconfirm>
          ) : (
            <Button size="small" type="primary" ghost onClick={() => setActive(category, true)}>
              Activar
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Categorias de mi tienda</PageTitle>
          <PageDescription>
            Crea tus propias categorias. Se mostraran en tu tienda publica y puedes asignarlas a cada producto.
          </PageDescription>
        </PageIntro>
        <Button type="primary" onClick={openCreate}>Nueva categoria</Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={false}
        scroll={{ x: 820 }}
      />

      <Modal
        title={editing ? 'Editar categoria' : 'Nueva categoria'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        confirmLoading={saving}
        okText="Guardar"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 14 }}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Ingresa el nombre' }]}
          >
            <Input placeholder="Ej: Camisas, Accesorios" />
          </Form.Item>

          <Form.Item label="Descripcion" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <ImageUploadField
            label="Imagen"
            name="image"
            folder={UPLOAD_FOLDERS.stores.categories.images}
            uploadRoute={UPLOAD_ROUTES.stores.categories.images}
            maxCount={1}
            multiple={false}
          />

          <Form.Item label="Orden" name="sortOrder">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageStack>
  )
}

export default StoreCategoriesPage
