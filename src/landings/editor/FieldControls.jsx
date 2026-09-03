import { Input, InputNumber, Select, Switch, Typography } from 'antd'
import { Plus, Trash2 } from 'lucide-react'
import { ImageUploadInput } from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'

export const FieldLabel = ({ children, hint }) => (
  <div style={{ marginBottom: 6 }}>
    <Typography.Text strong style={{ fontSize: 13 }}>{children}</Typography.Text>
    {hint ? (
      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>{hint}</Typography.Text>
      </div>
    ) : null}
  </div>
)

export const FieldWrap = ({ label, hint, children, style }) => (
  <div style={{ marginBottom: 14, ...style }}>
    {label ? <FieldLabel hint={hint}>{label}</FieldLabel> : null}
    {children}
  </div>
)

const asNumber = value => {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

export const BuilderField = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'textarea':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <Input.TextArea
            value={value || ''}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            onChange={event => onChange(event.target.value)}
          />
        </FieldWrap>
      )

    case 'number':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <InputNumber
            value={asNumber(value)}
            min={field.min}
            max={field.max}
            style={{ width: '100%' }}
            onChange={next => onChange(next)}
          />
        </FieldWrap>
      )

    case 'select':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <Select
            value={value === undefined || value === '' ? field.options?.[0]?.value ?? undefined : value}
            options={field.options}
            style={{ width: '100%' }}
            onChange={onChange}
          />
        </FieldWrap>
      )

    case 'switch':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <Switch checked={value === true} onChange={onChange} />
        </FieldWrap>
      )

    case 'color':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <input
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(value || '') ? value : '#000000'}
              onChange={event => onChange(event.target.value)}
              style={{ width: 46, height: 34, padding: 2, border: '1px solid #d9d9d9', borderRadius: 6, cursor: 'pointer' }}
            />
            <Input value={value || ''} onChange={event => onChange(event.target.value)} style={{ width: 130 }} />
          </div>
        </FieldWrap>
      )

    case 'image':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <ImageUploadInput
            value={value || ''}
            onChange={onChange}
            folder={UPLOAD_FOLDERS.landings.images}
            uploadRoute={UPLOAD_ROUTES.landings.images}
            maxCount={1}
            multiple={false}
          />
        </FieldWrap>
      )

    case 'imageList':
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <ImageUploadInput
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            folder={UPLOAD_FOLDERS.landings.images}
            uploadRoute={UPLOAD_ROUTES.landings.images}
            maxCount={field.maxCount || 8}
            multiple
          />
        </FieldWrap>
      )

    case 'objectList':
      return (
        <ObjectListEditor
          label={field.label}
          value={value}
          onChange={onChange}
          addLabel={field.addLabel}
          itemLabel={field.itemLabel}
          itemFields={field.itemFields || []}
        />
      )

    default:
      return (
        <FieldWrap label={field.label} hint={field.hint}>
          <Input
            value={value || ''}
            placeholder={field.placeholder}
            onChange={event => onChange(event.target.value)}
          />
        </FieldWrap>
      )
  }
}

const ItemValueControl = ({ itemField, value, onChange }) => {
  if (itemField.type === 'image') {
    return (
      <div>
        <ImageUploadInput
          value={value || ''}
          onChange={onChange}
          folder={UPLOAD_FOLDERS.landings.images}
          uploadRoute={UPLOAD_ROUTES.landings.images}
          maxCount={1}
          multiple={false}
        />
      </div>
    )
  }

  if (itemField.type === 'textarea') {
    return (
      <Input.TextArea
        value={value || ''}
        rows={2}
        placeholder={itemField.placeholder}
        onChange={event => onChange(event.target.value)}
      />
    )
  }

  if (itemField.type === 'number') {
    return (
      <InputNumber
        value={value}
        min={itemField.min}
        max={itemField.max}
        style={{ width: '100%' }}
        onChange={onChange}
      />
    )
  }

  if (itemField.type === 'select') {
    return (
      <Select
        value={value}
        options={itemField.options}
        style={{ width: '100%' }}
        onChange={onChange}
      />
    )
  }

  return (
    <Input
      value={value || ''}
      placeholder={itemField.placeholder}
      onChange={event => onChange(event.target.value)}
    />
  )
}

const ItemEditor = ({ item, index, itemLabel, itemFields, onChange, onRemove }) => (
  <div
    style={{
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      padding: '12px 12px 2px',
      background: '#fafbfc',
      marginBottom: 12,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <Typography.Text strong style={{ fontSize: 13 }}>
        {itemLabel} {index + 1}
      </Typography.Text>
      <button
        type="button"
        onClick={onRemove}
        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', display: 'inline-flex' }}
        aria-label="Eliminar elemento"
      >
        <Trash2 size={16} />
      </button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 10px' }}>
      {itemFields.map(itemField => (
        <div
          key={itemField.path}
          style={{
            gridColumn: itemField.type === 'textarea' || itemField.type === 'image' ? '1 / -1' : 'auto',
            marginBottom: 10,
          }}
        >
          <FieldLabel>{itemField.label}</FieldLabel>
          <ItemValueControl
            itemField={itemField}
            value={item[itemField.path]}
            onChange={next => onChange(itemField.path, next)}
          />
        </div>
      ))}
    </div>
  </div>
)

export const ObjectListEditor = ({ label, value = [], onChange, addLabel = 'Agregar', itemLabel = 'Elemento', itemFields = [] }) => {
  const items = Array.isArray(value) ? value : []

  const addItem = () => {
    const empty = {}
    itemFields.forEach(itemField => {
      empty[itemField.path] = itemField.type === 'number' ? (itemField.min || 0) : ''
    })
    onChange([...items, empty])
  }

  const updateItem = (index, path, next) => {
    const nextItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [path]: next } : item
    )
    onChange(nextItems)
  }

  const removeItem = index => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel>{label}</FieldLabel>
      {items.map((item, index) => (
        <ItemEditor
          key={item?.id || index}
          item={item}
          index={index}
          itemLabel={itemLabel}
          itemFields={itemFields}
          onChange={(path, next) => updateItem(index, path, next)}
          onRemove={() => removeItem(index)}
        />
      ))}
      <button
        type="button"
        onClick={addItem}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 12px',
          border: '1px dashed #94a3b8',
          borderRadius: 10,
          background: 'transparent',
          color: '#475569',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  )
}
