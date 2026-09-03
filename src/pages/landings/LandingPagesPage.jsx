import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Radio, Space, Table, Tag, Typography } from 'antd'
import { ExternalLink, Pencil } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import LandingRenderer from '../../landings/render/LandingRenderer'
import { createLandingDraft } from '../../landings/defaults'
import { cloneValue } from '../../landings/registry'
import { getTemplatesByType, TEMPLATES } from '../../landings/templates'
import {
  getLandingStatusColor,
  getLandingStatusLabel,
  getLandingTypeLabel,
  LANDING_PAGE_TYPE_OPTIONS,
} from '../../constants/landingPages'
import { ROUTES, buildRoute } from '../../constants/routes'
import { ROLES } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { landingPageService } from '../../services/landingPageService'
import {
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  Toolbar,
} from '../../styles/dashboardStyles'
import { UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import useLanding from './hooks/useLanding'

const LandingPagesPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { role } = useAuth()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAdmin = Number(role) === ROLES.ADMIN.value
  const { landings, loading, loadData } = useLanding()
  const [wizardOpen, setWizardOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [selectedType, setSelectedType] = useState('product')
  const [selectedTemplate, setSelectedTemplate] = useState('product_essentials')

  const openEditor = useCallback(
    landing => {
      const route = isAdminRoute ? ROUTES.ADMIN_LANDING_EDITOR : ROUTES.LANDING_EDITOR
      navigate(buildRoute(route, { landingId: landing._id }))
    },
    [isAdminRoute, navigate]
  )

  const handleCreate = useCallback(async () => {
    try {
      const values = await form.validateFields()
      const template = TEMPLATES[selectedTemplate]

      if (!template) {
        message.error('Selecciona una plantilla')
        return
      }

      const draft = createLandingDraft({
        name: values.name,
        landingType: template.landingType || values.type,
        template: template.value,
        slug: values.slug,
      })

      const landing = {
        ...draft,
        theme: cloneValue(template.theme),
        sections: cloneValue(template.sections),
        conversion: cloneValue(template.conversion),
      }
      if (!values.slug) delete landing.slug

      setCreating(true)
      const response = await landingPageService.create(landing)
      const created = response.data

      setWizardOpen(false)
      loadData()
      const route = isAdminRoute ? ROUTES.ADMIN_LANDING_EDITOR : ROUTES.LANDING_EDITOR
      navigate(buildRoute(route, { landingId: created._id }), { replace: true })
    } catch (error) {
      if (error?.errorFields) return
      message.error(error?.message || 'No se pudo crear la landing')
    } finally {
      setCreating(false)
    }
  }, [form, isAdminRoute, loadData, navigate, selectedTemplate])

  const columns = useMemo(
    () => [
      {
        title: '',
        width: 84,
        render: (_, landing) => {
          const image = landing.coverImage || ''
          return image ? (
            <img
              src={getUploadUrl(UPLOAD_ROUTES.landings.images, image)}
              alt={landing.name}
              style={{ width: 62, height: 46, objectFit: 'cover', borderRadius: 8 }}
              onError={event => {
                event.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div
              style={{
                width: 62,
                height: 46,
                borderRadius: 8,
                display: 'grid',
                placeItems: 'center',
                background: '#eef2f7',
                color: '#94a3b8',
                fontSize: 22,
              }}
            >
              🚀
            </div>
          )
        },
      },
      {
        title: 'Landing',
        render: (_, landing) => (
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{landing.name}</Typography.Text>
            <Typography.Text type="secondary">
              {landing.headline || landing.landingType || 'Sin contenido aún'}
            </Typography.Text>
          </Space>
        ),
      },
      {
        title: 'Tipo',
        width: 160,
        render: (_, landing) => (
          <Tag>{getLandingTypeLabel(landing.landingType)}</Tag>
        ),
      },
      {
        title: 'Estado',
        width: 140,
        render: (_, landing) => (
          <Space>
            <Tag color={getLandingStatusColor(landing.status)}>
              {getLandingStatusLabel(landing.status)}
            </Tag>
            {!landing.isActive && <Tag>Inactiva</Tag>}
          </Space>
        ),
      },
      {
        title: 'URL',
        render: (_, landing) => (
          <Typography.Text copyable={{ text: `${window.location.origin}/l/${landing.slug}` }}>
            /l/{landing.slug}
          </Typography.Text>
        ),
      },
      {
        title: 'Acciones',
        align: 'right',
        render: (_, landing) => (
          <Space>
            {landing.slug ? (
              <a href={`/l/${landing.slug}`} target="_blank" rel="noreferrer">
                <Button size="small" icon={<ExternalLink size={14} />}>Ver</Button>
              </a>
            ) : null}
            <Button size="small" type="primary" ghost icon={<Pencil size={14} />} onClick={() => openEditor(landing)}>
              Editar
            </Button>
          </Space>
        ),
      },
    ],
    [openEditor]
  )

  const availableTemplates = getTemplatesByType(selectedType)

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>{isAdmin ? 'Landings' : 'Mis landings'}</PageTitle>
          <PageDescription>
            Crea landings profesionales por bloques para vender productos, promocionar agencias o captar leads.
          </PageDescription>
        </PageIntro>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields()
            setSelectedType('product')
            setSelectedTemplate('product_essentials')
            setWizardOpen(true)
          }}
        >
          Nueva landing
        </Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={landings}
        loading={loading}
        scroll={{ x: 920 }}
      />

      <Modal
        title="Nueva landing"
        open={wizardOpen}
        onCancel={() => setWizardOpen(false)}
        onOk={handleCreate}
        okText="Crear y editar"
        confirmLoading={creating}
        width={880}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'product',
            template: 'product_essentials',
          }}
        >
          <Form.Item label="Nombre interno" name="name" rules={[{ required: true, message: 'Dale un nombre a tu landing' }]}>
            <Input placeholder="Landing del producto X" />
          </Form.Item>

          <Form.Item label="Tipo de negocio" name="type">
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={LANDING_PAGE_TYPE_OPTIONS}
              onChange={event => {
                const nextType = event?.target?.value ?? event
                setSelectedType(nextType)
                const firstTemplate = getTemplatesByType(nextType)[0]
                if (firstTemplate) form.setFieldValue('template', firstTemplate.value)
                setSelectedTemplate(firstTemplate?.value || '')
              }}
            />
          </Form.Item>

          <Form.Item label="Plantilla" required>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
              {availableTemplates.map(template => (
                <button
                  key={template.value}
                  type="button"
                  onClick={() => {
                    form.setFieldValue('template', template.value)
                    setSelectedTemplate(template.value)
                  }}
                  style={{
                    textAlign: 'left',
                    border: selectedTemplate === template.value ? '2px solid #1677ff' : '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 14,
                    cursor: 'pointer',
                    background: selectedTemplate === template.value ? '#f0f7ff' : '#fafbfc',
                  }}
                >
                  <Space direction="vertical" size={4}>
                    <Typography.Text strong>
                      {selectedTemplate === template.value ? '✓ ' : ''}
                      {template.label}
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {template.description}
                    </Typography.Text>
                  </Space>
                </button>
              ))}
            </div>
          </Form.Item>

          <Form.Item name="slug" label="Slug (opcional)">
            <Input placeholder="Se genera automáticamente desde el nombre" />
          </Form.Item>
        </Form>

        {TEMPLATES[selectedTemplate] && (
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              overflow: 'hidden',
              transform: 'scale(0.72)',
              transformOrigin: 'top left',
              width: '138%',
              height: 320,
              pointerEvents: 'none',
              opacity: 0.7,
            }}
          >
            <LandingRenderer
              landing={{
                ...createLandingDraft({ name: 'Vista previa', landingType: selectedType }),
                theme: TEMPLATES[selectedTemplate].theme,
                sections: TEMPLATES[selectedTemplate].sections,
                conversion: TEMPLATES[selectedTemplate].conversion,
              }}
              isPreview
            />
          </div>
        )}
      </Modal>
    </PageStack>
  )
}

export default LandingPagesPage
