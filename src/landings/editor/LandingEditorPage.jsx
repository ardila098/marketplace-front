import { Button, Empty, Input, message, Segmented, Spin, Tag, Tooltip, Typography } from 'antd'
import { ArrowLeft, Eye, Save } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { ROUTES, buildRoute } from '../../constants/routes'
import { getLandingStatusColor, getLandingStatusLabel, getLandingTypeLabel } from '../../constants/landingPages'
import { ROLES } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { landingPageService } from '../../services/landingPageService'
import LandingRenderer from '../render/LandingRenderer'
import { AddSectionModal, SectionNavigator } from './BuilderControls'
import ConversionPanel from './ConversionPanel'
import { DomainPanel, BrandPanel, GeneralPanel, ThemePanel } from './PagePanels'
import SectionInspector from './SectionInspector'
import useLandingDraft from './useLandingDraft'

const PAGE_NAV_ITEMS = [
  { key: 'general', label: 'Información' },
  { key: 'brand', label: 'Marca' },
  { key: 'theme', label: 'Tema y tipografía' },
  { key: 'conversion', label: 'Conversión / formulario' },
  { key: 'domain', label: 'Publicación y dominio' },
]

const LandingEditorPage = () => {
  const { landingId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { role } = useAuth()
  const isAdmin = useMemo(() => Number(role) === ROLES.ADMIN.value, [role])
  const isAdminRoute = location.pathname.startsWith('/admin')

  const [loading, setLoading] = useState(landingId !== 'new')
  const [loadedLanding, setLoadedLanding] = useState(null)
  const [leftMode, setLeftMode] = useState('sections')
  const [pagePanel, setPagePanel] = useState('general')
  const [addOpen, setAddOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const {
    landing,
    setLanding,
    selectedSectionId,
    setSelectedSectionId,
    selectedSection,
    updateRoot,
    updateSection,
    addSection,
    moveSection,
    deleteSection,
    toggleSection,
  } = useLandingDraft(loadedLanding)

  useEffect(() => {
    if (landingId === 'new' || loadedLanding) return
    if (!landingId) return

    let active = true

    const load = async () => {
      try {
        const response = await landingPageService.getById(landingId)
        const found = response.data

        if (!active) return
        setLoadedLanding(found)
        if (!found) message.error('Landing no encontrada')
      } catch (error) {
        if (active) message.error(error?.message || 'No se pudo cargar la landing')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [landingId, loadedLanding])

  const listRoute = isAdminRoute ? ROUTES.ADMIN_LANDINGS : ROUTES.LANDING_PAGES

  const handleSave = useCallback(async () => {
    if (!landing) return
    setSaving(true)

    try {
      const payload = {
        ...landing,
        name: landing.name || landing.brand?.name || 'Landing sin nombre',
        slug: landing.slug || undefined,
      }

      if (landingId === 'new') {
        const response = await landingPageService.create(payload)
        const created = response.data
        setLanding(created)
        const editorRoute = isAdminRoute ? ROUTES.ADMIN_LANDING_EDITOR : ROUTES.LANDING_EDITOR
        navigate(buildRoute(editorRoute, { landingId: created._id }), { replace: true })
        message.success('Landing creada')
        return
      }

      await landingPageService.update(landingId, payload)
      message.success('Landing guardada')
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar la landing')
    } finally {
      setSaving(false)
    }
  }, [isAdminRoute, landing, landingId, navigate, setLanding])

  if (loading) {
    return (
      <div style={{ minHeight: 420, display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!landing) {
    return (
      <div style={{ minHeight: 420, display: 'grid', placeItems: 'center' }}>
        <Empty description="Landing no encontrada">
          <Button type="primary" onClick={() => navigate(listRoute)}>Volver a mis landings</Button>
        </Empty>
      </div>
    )
  }

  const renderPageInspector = () => {
    if (pagePanel === 'general') {
      return <GeneralPanel landing={landing} update={updateRoot} />
    }
    if (pagePanel === 'brand') {
      return <BrandPanel landing={landing} update={updateRoot} />
    }
    if (pagePanel === 'theme') {
      return <ThemePanel theme={landing.theme || {}} update={updateRoot} />
    }
    if (pagePanel === 'conversion') {
      return (
        <ConversionPanel
          conversion={landing.conversion || {}}
          landingType={landing.landingType}
          onChange={conversion => updateRoot('conversion', conversion)}
        />
      )
    }
    if (pagePanel === 'domain') {
      return <DomainPanel landing={landing} update={updateRoot} isAdmin={isAdmin} />
    }
    return null
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 0 16px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <Tooltip title="Volver a landings">
          <button type="button" onClick={() => navigate(listRoute)} style={backButtonStyle} aria-label="Volver">
            <ArrowLeft size={18} />
          </button>
        </Tooltip>
        <div style={{ minWidth: 0, flex: 1 }}>
          <Input
            variant="borderless"
            value={landing.name || ''}
            onChange={event => updateRoot('name', event.target.value)}
            placeholder="Nombre de la landing"
            style={{ fontSize: 18, fontWeight: 800, padding: '6px 8px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8 }}>
            <Tag color={getLandingStatusColor(landing.status)}>{getLandingStatusLabel(landing.status)}</Tag>
            <Typography.Text type="secondary">{getLandingTypeLabel(landing.landingType)}</Typography.Text>
            <Typography.Text type="secondary">/l/{landing.slug || '…'}</Typography.Text>
          </div>
        </div>

        <Button
          icon={<Eye size={15} />}
          href={landing.slug ? `${window.location.origin}/l/${landing.slug}` : undefined}
          target="_blank"
          disabled={!landing.slug}
        >
          Ver
        </Button>
        <Button type="primary" icon={<Save size={15} />} loading={saving} onClick={handleSave}>
          Guardar
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px minmax(0, 1fr) 420px', gap: 0, minHeight: 'calc(100vh - 220px)' }}>
        <aside style={{ borderRight: '1px solid #e2e8f0', padding: '0 14px 24px', overflowY: 'auto' }}>
          <Segmented
            block
            value={leftMode}
            onChange={setLeftMode}
            options={[
              { label: 'Secciones', value: 'sections' },
              { label: 'Página', value: 'page' },
            ]}
            style={{ marginBottom: 16 }}
          />

          {leftMode === 'sections' ? (
            <SectionNavigator
              sections={landing.sections || []}
              selectedId={selectedSectionId}
              onSelect={setSelectedSectionId}
              onMove={moveSection}
              onDelete={deleteSection}
              onToggle={toggleSection}
              onAddClick={() => setAddOpen(true)}
            />
          ) : (
            <div style={{ display: 'grid', gap: 4 }}>
              {PAGE_NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setPagePanel(item.key)
                    setSelectedSectionId(null)
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '11px 12px',
                    border: 'none',
                    borderRadius: 10,
                    background: pagePanel === item.key && !selectedSectionId ? '#f0f7ff' : 'transparent',
                    color: pagePanel === item.key && !selectedSectionId ? '#1677ff' : 'inherit',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </aside>

        <main style={{ background: '#f1f5f9', minWidth: 0, overflow: 'auto' }}>
          <LandingRenderer
            landing={landing}
            isPreview
            style={{ maxWidth: 1200, margin: '0 auto', minHeight: '100%' }}
          />
        </main>

        <aside style={{ borderLeft: '1px solid #e2e8f0', overflowY: 'auto', background: '#fff' }}>
          {selectedSection ? (
            <SectionInspector
              section={selectedSection}
              onChange={nextSection => updateSection(selectedSection.id, nextSection)}
              onChangeEnabled={enabled => updateSection(selectedSection.id, { ...selectedSection, enabled })}
            />
          ) : leftMode === 'page' ? (
            <div style={{ padding: 20 }}>{renderPageInspector()}</div>
          ) : (
            <div style={{ padding: 24 }}>
              <Empty description="Selecciona una sección de la lista para editar sus textos, imágenes y estilos" />
            </div>
          )}
        </aside>
      </div>

      <AddSectionModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addSection} />
    </div>
  )
}

const backButtonStyle = {
  display: 'inline-grid',
  placeItems: 'center',
  width: 38,
  height: 38,
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  background: '#fff',
  cursor: 'pointer',
}

export default LandingEditorPage
