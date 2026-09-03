import { Alert, Empty, Typography } from 'antd'
import { getSectionDefinition } from '../registry'
import { BuilderField, FieldWrap } from './FieldControls'
import { getByPath, setByPath } from './utils'

const SectionInspector = ({ section, onChange, onChangeEnabled }) => {
  const definition = getSectionDefinition(section?.type)

  if (!section || !definition) {
    return (
      <div style={{ padding: 24 }}>
        <Empty description="Selecciona una sección para configurarla" />
      </div>
    )
  }

  const updateField = (field, value) => {
    onChange(setByPath(section, field.path, value))
  }

  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ marginBottom: 12 }}>
        <Typography.Title level={5} style={{ margin: '10px 0 2px' }}>
          {definition.label}
        </Typography.Title>
        <Typography.Text type="secondary">{definition.description}</Typography.Text>
      </div>

      <FieldWrap label="Sección visible">
        <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={section.enabled !== false}
            onChange={event => onChangeEnabled(event.target.checked)}
          />
          <span>Mostrar en la landing</span>
        </label>
      </FieldWrap>

      {definition.fields.map(field => {
        const options =
          field.path === 'settings.variant' && !field.options?.length
            ? definition.variants || []
            : field.options
        const value = getByPath(section, field.path)

        return (
          <BuilderField
            key={field.path}
            field={{ ...field, options }}
            value={value}
            onChange={nextValue => updateField(field, nextValue)}
          />
        )
      })}

      <Alert
        type="info"
        showIcon
        message="¿Te falta otro estilo? El registro de secciones se puede ampliar sin tocar el resto de la landing."
        style={{ marginTop: 8 }}
      />
    </div>
  )
}

export default SectionInspector
