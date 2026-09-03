import { Button, Modal, Tooltip, Typography } from 'antd'
import { ChevronDown, ChevronUp, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { SECTION_DEFINITIONS, SECTION_GROUPS } from '../registry'

export const AddSectionModal = ({ open, onClose, onAdd }) => (
  <Modal
    title="Agregar sección"
    open={open}
    onCancel={onClose}
    footer={null}
    width={760}
  >
    <div style={{ display: 'grid', gap: 20 }}>
      {SECTION_GROUPS.map(group => (
        <div key={group.key}>
          <Typography.Text strong style={{ display: 'block', marginBottom: 10 }}>
            {group.label}
          </Typography.Text>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {group.sections.map(type => {
              const definition = SECTION_DEFINITIONS[type]

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onAdd(type)
                    onClose()
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    background: '#fafbfc',
                    cursor: 'pointer',
                    transition: 'border-color .15s ease, background .15s ease',
                  }}
                  onMouseEnter={event => {
                    event.currentTarget.style.borderColor = '#1677ff'
                    event.currentTarget.style.background = '#f0f7ff'
                  }}
                  onMouseLeave={event => {
                    event.currentTarget.style.borderColor = '#e2e8f0'
                    event.currentTarget.style.background = '#fafbfc'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Plus size={15} color="#1677ff" />
                    <strong>{definition.label}</strong>
                  </div>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {definition.description}
                  </Typography.Text>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  </Modal>
)

const SectionRow = ({ section, selected, onSelect, onMove, onDelete, onToggle }) => {
  const definition = SECTION_DEFINITIONS[section.type]

  return (
    <div
      onClick={onSelect}
      style={{
        padding: '10px 10px 10px 12px',
        borderRadius: 10,
        cursor: 'pointer',
        border: selected ? '1px solid #1677ff' : '1px solid transparent',
        background: selected ? '#f0f7ff' : '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography.Text strong style={{ display: 'block' }}>{definition?.label || section.type}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 11 }}>{section.label || ''}</Typography.Text>
        </div>
        <Tooltip title={section.enabled === false ? 'Mostrar' : 'Ocultar'}>
          <button type="button" onClick={event => { event.stopPropagation(); onToggle() }} style={iconButtonStyle}>
            {section.enabled === false ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </Tooltip>
        <button type="button" onClick={event => { event.stopPropagation(); onMove(-1) }} style={iconButtonStyle} aria-label="Subir">
          <ChevronUp size={15} />
        </button>
        <button type="button" onClick={event => { event.stopPropagation(); onMove(1) }} style={iconButtonStyle} aria-label="Bajar">
          <ChevronDown size={15} />
        </button>
        <button type="button" onClick={event => { event.stopPropagation(); onDelete() }} style={{ ...iconButtonStyle, color: '#dc2626' }} aria-label="Eliminar">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

const iconButtonStyle = {
  display: 'inline-grid',
  placeItems: 'center',
  width: 28,
  height: 28,
  borderRadius: 8,
  border: '1px solid #e2e8f0',
  background: '#fff',
  color: '#475569',
  cursor: 'pointer',
}

export const SectionNavigator = ({
  sections,
  selectedId,
  onSelect,
  onMove,
  onDelete,
  onToggle,
  onAddClick,
}) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <Typography.Text strong>Secciones ({sections.length})</Typography.Text>
      <Button type="primary" ghost size="small" icon={<Plus size={14} />} onClick={onAddClick}>
        Agregar
      </Button>
    </div>

    {sections.length === 0 ? (
      <Button type="dashed" block onClick={onAddClick} style={{ height: 64 }}>
        Empieza agregando tu primera sección
      </Button>
    ) : (
      <div style={{ display: 'grid', gap: 4 }}>
        {sections.map((section, index) => (
          <SectionRow
            key={section.id || `${section.type}-${index}`}
            section={section}
            selected={selectedId === section.id}
            onSelect={() => onSelect(section.id)}
            onMove={direction => onMove(section.id, direction)}
            onDelete={() => onDelete(section.id)}
            onToggle={() => onToggle(section.id)}
          />
        ))}
      </div>
    )}
  </div>
)
