import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Input, Layout, Select, Space, Switch, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import useLanding from './hooks/useLanding'
import {
  getVariantOptions,
  LANDING_SECTION_TYPE_OPTIONS,
  SECTIONS_WITH_ITEMS,
} from '../../constants/landingSections'
import useLandingBuilder from './hooks/useLandingBuilder'
import { SECTION_COMPONENT_REGISTRY } from './components/landing-sections/registry'

const { Sider, Content } = Layout

const createItem = () => ({ key: crypto.randomUUID(), title: '', description: '', image: '' })

const LandingBuilderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { landing, load, save, saving } = useLanding()
  const builder = useLandingBuilder([])

  useEffect(() => {
    if (!id) return

    load(id).then(data => {
      if (data?.sections) builder.setSections(data.sections)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSave = () => save({ ...landing, sections: builder.sections })

  const addItem = section => {
    const items = section.data?.items || []
    builder.updateSectionData(section.key, { items: [...items, createItem()] })
  }

  const updateItem = (section, itemKey, patch) => {
    const items = (section.data?.items || []).map(item =>
      item.key === itemKey ? { ...item, ...patch } : item
    )
    builder.updateSectionData(section.key, { items })
  }

  const removeItem = (section, itemKey) => {
    const items = (section.data?.items || []).filter(item => item.key !== itemKey)
    builder.updateSectionData(section.key, { items })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={380} theme="light" style={{ padding: 16, overflowY: 'auto' }}>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/landings')}>
            Volver
          </Button>
          <Button type="primary" loading={saving} onClick={handleSave}>
            Guardar
          </Button>
        </Space>

        <Typography.Title level={5}>Secciones</Typography.Title>

        <Collapse accordion>
          {builder.sections.map((section, index) => (
            <Collapse.Panel
              key={section.key}
              header={
                <Space onClick={event => event.stopPropagation()}>
                  <Switch
                    size="small"
                    checked={section.enabled}
                    onChange={enabled => builder.updateSection(section.key, { enabled })}
                  />
                  <span>
                    {
                      LANDING_SECTION_TYPE_OPTIONS.find(option => option.value === section.type)
                        ?.label
                    }
                  </span>
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  value={section.type}
                  options={LANDING_SECTION_TYPE_OPTIONS}
                  onChange={type =>
                    builder.updateSection(section.key, {
                      type,
                      variant: getVariantOptions(type)[0]?.value,
                      data: {},
                    })
                  }
                />

                <Select
                  value={section.variant}
                  options={getVariantOptions(section.type)}
                  onChange={variant => builder.updateSection(section.key, { variant })}
                />

                <Input
                  placeholder="Título"
                  value={section.data?.title}
                  onChange={event =>
                    builder.updateSectionData(section.key, { title: event.target.value })
                  }
                />

                <Input.TextArea
                  placeholder="Subtítulo / descripción"
                  rows={2}
                  value={section.data?.subtitle}
                  onChange={event =>
                    builder.updateSectionData(section.key, { subtitle: event.target.value })
                  }
                />

                {SECTIONS_WITH_ITEMS.includes(section.type) && (
                  <>
                    <Divider style={{ margin: '8px 0' }} />
                    <Typography.Text strong>Elementos</Typography.Text>

                    {(section.data?.items || []).map(item => (
                      <Space
                        key={item.key}
                        direction="vertical"
                        style={{
                          width: '100%',
                          border: '1px solid #eee',
                          padding: 8,
                          borderRadius: 8,
                        }}
                      >
                        <Input
                          placeholder="Título del elemento"
                          value={item.title}
                          onChange={event =>
                            updateItem(section, item.key, { title: event.target.value })
                          }
                        />
                        <Input.TextArea
                          placeholder="Descripción"
                          rows={2}
                          value={item.description}
                          onChange={event =>
                            updateItem(section, item.key, { description: event.target.value })
                          }
                        />
                        <Input
                          placeholder="URL de imagen"
                          value={item.image}
                          onChange={event =>
                            updateItem(section, item.key, { image: event.target.value })
                          }
                        />
                        <Button size="small" danger onClick={() => removeItem(section, item.key)}>
                          Eliminar elemento
                        </Button>
                      </Space>
                    ))}

                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => addItem(section)}
                      block
                    >
                      Agregar elemento
                    </Button>

                    <Divider style={{ margin: '8px 0' }} />
                  </>
                )}

                <Space>
                  <Button
                    size="small"
                    disabled={index === 0}
                    onClick={() => builder.moveSection(index, -1)}
                  >
                    ↑ Subir
                  </Button>
                  <Button
                    size="small"
                    disabled={index === builder.sections.length - 1}
                    onClick={() => builder.moveSection(index, 1)}
                  >
                    ↓ Bajar
                  </Button>
                  <Button size="small" danger onClick={() => builder.removeSection(section.key)}>
                    Eliminar sección
                  </Button>
                </Space>
              </Space>
            </Collapse.Panel>
          ))}
        </Collapse>

        <Select
          placeholder="+ Agregar sección"
          value={undefined}
          options={LANDING_SECTION_TYPE_OPTIONS}
          onChange={builder.addSection}
          style={{ width: '100%', marginTop: 16 }}
        />
      </Sider>

      <Content style={{ background: '#f5f5f5', overflowY: 'auto', padding: 24 }}>
        {builder.sections
          .filter(section => section.enabled)
          .map(section => {
            const SectionComponent = SECTION_COMPONENT_REGISTRY[section.type]
            if (!SectionComponent) return null
            return <SectionComponent key={section.key} section={section} />
          })}
      </Content>
    </Layout>
  )
}

export default LandingBuilderPage
