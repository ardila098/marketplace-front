import { Button, Input, InputNumber, Select, Typography } from 'antd'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ImageUploadInput } from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { LANDING_CONVERSION_MODES } from '../../constants/landingPages'
import { makeChoice, makeOption, makeProduct } from '../defaults'
import { FieldWrap } from './FieldControls'

const inputStyle = { width: '100%' }
const smallButtonStyle = {
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

const PanelCard = ({ title, onRemove, children }) => (
  <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, marginBottom: 12, background: '#fafbfc' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <Typography.Text strong>{title}</Typography.Text>
      {onRemove ? (
        <button type="button" onClick={onRemove} style={{ ...smallButtonStyle, color: '#dc2626' }} aria-label="Eliminar">
          <Trash2 size={15} />
        </button>
      ) : null}
    </div>
    {children}
  </div>
)

const TextFieldRow = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <FieldWrap label={label}>
    {type === 'textarea' ? (
      <Input.TextArea value={value || ''} rows={2} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
    ) : type === 'number' ? (
      <InputNumber value={value} min={0} style={inputStyle} onChange={onChange} />
    ) : (
      <Input value={value || ''} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
    )}
  </FieldWrap>
)

const TagsInput = ({ value = [], onChange, placeholder }) => {
  const [draft, setDraft] = useState('')
  const values = Array.isArray(value) ? value : []

  const addDraft = () => {
    const next = draft
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)

    if (!next.length) return
    onChange([...values, ...next.filter(item => !values.includes(item))])
    setDraft('')
  }

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 6, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', background: '#fff' }}>
      {values.map(item => (
        <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: '#eef2f7', color: '#334155', fontSize: 13, fontWeight: 700 }}>
          {item}
          <button
            type="button"
            onClick={() => onChange(values.filter(current => current !== item))}
            style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
            aria-label={`Quitar ${item}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        placeholder={placeholder}
        onChange={event => setDraft(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault()
            addDraft()
          }
        }}
        onBlur={addDraft}
        style={{ border: 'none', outline: 'none', flex: 1, minWidth: 150, padding: '4px 6px', fontSize: 13, background: 'transparent' }}
      />
    </div>
  )
}

const ProductOptionEditor = ({ option, onChange, onRemove }) => {
  const updateChoice = (index, patch) => {
    const next = (option.options || []).map((choice, choiceIndex) =>
      choiceIndex === index ? { ...choice, ...patch } : choice
    )
    onChange({ ...option, options: next })
  }

  const addChoice = () => {
    onChange({
      ...option,
      options: [...(option.options || []), makeChoice(`Opción ${(option.options?.length || 0) + 1}`, '')],
    })
  }

  return (
    <div style={{ border: '1px dashed #cbd5e1', borderRadius: 10, padding: 10, marginBottom: 10, background: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
        <Input
          value={option.label || ''}
          placeholder="Nombre (Color)"
          onChange={event => onChange({ ...option, label: event.target.value })}
        />
        <Input
          value={option.key || ''}
          placeholder="Clave (color)"
          onChange={event => onChange({ ...option, key: event.target.value })}
        />
        <Select
          value={option.control}
          options={[
            { value: 'select', label: 'Select' },
            { value: 'radio', label: 'Botones' },
            { value: 'color', label: 'Swatches de color' },
          ]}
          onChange={control => onChange({ ...option, control })}
        />
        <button type="button" onClick={onRemove} style={{ ...smallButtonStyle, color: '#dc2626' }} aria-label="Eliminar opción">
          <Trash2 size={14} />
        </button>
      </div>

      <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center', margin: '10px 0', fontSize: 13 }}>
        <input
          type="checkbox"
          checked={option.required !== false}
          onChange={event => onChange({ ...option, required: event.target.checked })}
        />
        Obligatoria
      </label>

      {(option.options || []).map((choice, index) => (
        <div key={`${choice.value}-${index}`} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <Input
            value={choice.label || ''}
            placeholder="Etiqueta"
            onChange={event => updateChoice(index, { label: event.target.value })}
          />
          <Input
            value={choice.value || ''}
            placeholder="Valor"
            onChange={event => updateChoice(index, { value: event.target.value })}
          />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, border: '1px solid #e2e8f0', borderRadius: 8, padding: '0 6px' }}>
            <input
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(choice.hex || '') ? choice.hex : '#000000'}
              onChange={event => updateChoice(index, { hex: event.target.value })}
              style={{ width: 26, height: 26, padding: 1, border: 'none', background: 'none', cursor: 'pointer' }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...option, options: (option.options || []).filter((_, choiceIndex) => choiceIndex !== index) })}
            style={{ ...smallButtonStyle, color: '#dc2626' }}
            aria-label="Eliminar opción"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}
      <Button size="small" type="dashed" icon={<Plus size={13} />} onClick={addChoice}>
        Agregar opción
      </Button>
    </div>
  )
}

const PackItemEditor = ({ item, index, onChange, onRemove }) => {
  const update = patch => onChange({ ...item, ...patch })

  const updateOption = (optionIndex, nextOption) => {
    const options = (item.options || []).map((current, currentIndex) =>
      currentIndex === optionIndex ? nextOption : current
    )
    update({ options })
  }

  const removeOption = optionIndex => {
    const options = (item.options || []).filter((_, currentIndex) => currentIndex !== optionIndex)
    update({ options })
  }

  return (
    <div style={{ border: '1px dashed #94a3b8', borderRadius: 12, padding: 12, marginBottom: 10, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Typography.Text strong style={{ fontSize: 13 }}>Ítem del pack {index + 1}</Typography.Text>
        <button type="button" onClick={onRemove} style={{ ...smallButtonStyle, color: '#dc2626' }} aria-label="Eliminar ítem">
          <Trash2 size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 10px' }}>
        <TextFieldRow label="Nombre" value={item.name} onChange={name => update({ name })} placeholder="Camisa 1" />
        <TextFieldRow label="Clave (key)" value={item.key} onChange={key => update({ key })} placeholder="camisa-1" />
      </div>
      <TextFieldRow label="Descripción" type="textarea" value={item.description} onChange={description => update({ description })} />

      <FieldWrap label="Imagen de este ítem">
        <ImageUploadInput
          value={item.image || ''}
          onChange={image => update({ image })}
          folder={UPLOAD_FOLDERS.landings.images}
          uploadRoute={UPLOAD_ROUTES.landings.images}
          maxCount={1}
          multiple={false}
        />
      </FieldWrap>

      <Typography.Text strong style={{ display: 'block', margin: '14px 0 8px', fontSize: 13 }}>
        Propiedades de este ítem (color, talla…)
      </Typography.Text>
      {(item.options || []).map((option, optionIndex) => (
        <ProductOptionEditor
          key={`${option.key}-${optionIndex}`}
          option={option}
          onChange={nextOption => updateOption(optionIndex, nextOption)}
          onRemove={() => removeOption(optionIndex)}
        />
      ))}
      <Button
        size="small"
        type="dashed"
        icon={<Plus size={13} />}
        onClick={() => update({ options: [...(item.options || []), makeOption({ label: 'Nueva propiedad' })] })}
      >
        Agregar propiedad
      </Button>
    </div>
  )
}

const ProductEditor = ({ product, index, onChange, onRemove }) => {
  const update = patch => onChange({ ...product, ...patch })

  const updatePackItem = (itemIndex, nextItem) => {
    const packItems = (product.packItems || []).map((current, currentIndex) =>
      currentIndex === itemIndex ? nextItem : current
    )
    update({ packItems })
  }

  const removePackItem = itemIndex => {
    const packItems = (product.packItems || []).filter((_, currentIndex) => currentIndex !== itemIndex)
    update({ packItems })
  }

  return (
    <PanelCard title={`Producto / ítem del pack ${index + 1}`} onRemove={onRemove}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '0 12px' }}>
        <TextFieldRow label="Nombre" value={product.name} onChange={name => update({ name })} placeholder="Camiseta premium / Pack x3" />
        <TextFieldRow label="Clave interna (key)" value={product.key} onChange={key => update({ key })} placeholder="producto-1" />
      </div>
      <TextFieldRow label="Descripción" type="textarea" value={product.description} onChange={description => update({ description })} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '0 12px' }}>
        <TextFieldRow label="Precio" type="number" value={product.price} onChange={price => update({ price })} />
        <TextFieldRow label="Precio anterior" type="number" value={product.compareAtPrice} onChange={compareAtPrice => update({ compareAtPrice })} />
        <TextFieldRow label="Badge" value={product.badge} onChange={badge => update({ badge })} placeholder="Envío gratis" />
      </div>

      <FieldWrap label="Imagen principal">
        <ImageUploadInput
          value={product.image || ''}
          onChange={image => update({ image })}
          folder={UPLOAD_FOLDERS.landings.images}
          uploadRoute={UPLOAD_ROUTES.landings.images}
          maxCount={1}
          multiple={false}
        />
      </FieldWrap>

      <FieldWrap label="Galería del producto">
        <ImageUploadInput
          value={product.images || []}
          onChange={images => update({ images })}
          folder={UPLOAD_FOLDERS.landings.images}
          uploadRoute={UPLOAD_ROUTES.landings.images}
          maxCount={8}
          multiple
        />
      </FieldWrap>

      <FieldWrap label="Incluye (items del pack / características)">
        <TagsInput
          value={product.includes || []}
          onChange={includes => update({ includes })}
          placeholder="Escribe y presiona enter: Camiseta 1, Camiseta 2…"
        />
      </FieldWrap>

      <Typography.Text strong style={{ display: 'block', margin: '16px 0 8px' }}>
        Propiedades (tallas, colores, etc.)
      </Typography.Text>
      {(product.options || []).map((option, optionIndex) => (
        <ProductOptionEditor
          key={`${option.key}-${optionIndex}`}
          option={option}
          onChange={nextOption => {
            const options = (product.options || []).map((current, currentIndex) =>
              currentIndex === optionIndex ? nextOption : current
            )
            update({ options })
          }}
          onRemove={() => {
            const options = (product.options || []).filter((_, currentIndex) => currentIndex !== optionIndex)
            update({ options })
          }}
        />
      ))}
      <Button
        size="small"
        type="dashed"
        icon={<Plus size={13} />}
        onClick={() => update({ options: [...(product.options || []), makeOption({ label: 'Nueva propiedad' })] })}
      >
        Agregar propiedad (talla, color…)
      </Button>

      <Typography.Text strong style={{ display: 'block', margin: '20px 0 6px' }}>
        Componentes internos del pack (opcional)
      </Typography.Text>
      <Typography.Paragraph type="secondary" style={{ fontSize: 13, marginTop: 0 }}>
        Úsalo cuando vendas un pack: agrega aquí “Camisa 1”, “Camisa 2”, etc., y cada componente tendrá
        sus propios atributos (color, talla). El precio configurado arriba se cobra una sola vez por el pack.
      </Typography.Paragraph>

      {(product.packItems || []).map((packItem, itemIndex) => (
        <PackItemEditor
          key={packItem.key || itemIndex}
          item={packItem}
          index={itemIndex}
          onChange={nextItem => updatePackItem(itemIndex, nextItem)}
          onRemove={() => removePackItem(itemIndex)}
        />
      ))}
      <Button
        size="small"
        type="dashed"
        icon={<Plus size={13} />}
        onClick={() =>
          update({
            packItems: [
              ...(product.packItems || []),
              {
                key: `item-${Date.now()}`,
                name: '',
                description: '',
                image: '',
                options: [],
              },
            ],
          })
        }
      >
        Agregar ítem al pack
      </Button>

    </PanelCard>
  )
}

const ConversionFieldRow = ({ field, onChange, onRemove }) => {
  const update = patch => onChange({ ...field, ...patch })
  const labelToKey = value =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto auto', gap: 6, alignItems: 'center', marginBottom: 6 }}>
      <Input
        value={field.label || ''}
        placeholder="Etiqueta"
        onChange={event => {
          const label = event.target.value
          update({ label, key: field.key || labelToKey(label) || `campo_${Date.now()}` })
        }}
      />
      <Input
        value={field.key || ''}
        placeholder="key"
        onChange={event => update({ key: event.target.value })}
      />
      <Select
        value={field.type}
        options={[
          { value: 'text', label: 'Texto' },
          { value: 'email', label: 'Email' },
          { value: 'tel', label: 'Teléfono' },
          { value: 'textarea', label: 'Área texto' },
          { value: 'date', label: 'Fecha' },
          { value: 'number', label: 'Número' },
        ]}
        onChange={type => update({ type })}
        style={{ minWidth: 110 }}
      />
      <label style={{ display: 'inline-flex', gap: 4, fontSize: 12 }}>
        <input type="checkbox" checked={field.required !== false} onChange={event => update({ required: event.target.checked })} />
        Oblig.
      </label>
      <button type="button" onClick={onRemove} style={{ ...smallButtonStyle, color: '#dc2626' }} aria-label="Eliminar campo">
        <Trash2 size={13} />
      </button>
    </div>
  )
}

const ConversionPanel = ({ conversion, landingType, onChange }) => {
  const update = patch => onChange({ ...conversion, ...patch })
  const mode = conversion?.mode || (landingType === 'product' ? LANDING_CONVERSION_MODES.ORDER : LANDING_CONVERSION_MODES.LEAD)
  const isOrder = mode === LANDING_CONVERSION_MODES.ORDER

  return (
    <div>
      <PanelCard title="Comportamiento">
        <FieldWrap label="Tipo de conversión" hint="Venta de producto requiere datos de envío; lead captura contactos para agencia o infoproducto.">
          <Select
            value={mode}
            style={{ width: '100%' }}
            onChange={nextMode => update({ mode: nextMode })}
            options={[
              { value: LANDING_CONVERSION_MODES.ORDER, label: 'Venta / pedido de producto' },
              { value: LANDING_CONVERSION_MODES.LEAD, label: 'Captura de lead / solicitud' },
            ]}
          />
        </FieldWrap>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
          <TextFieldRow label="Título del formulario" value={conversion?.title} onChange={title => update({ title })} />
          <TextFieldRow label="Texto del botón" value={conversion?.ctaLabel} onChange={ctaLabel => update({ ctaLabel })} />
        </div>
        <TextFieldRow label="Subtítulo" type="textarea" value={conversion?.subtitle} onChange={subtitle => update({ subtitle })} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
          <TextFieldRow label="Título de éxito" value={conversion?.successTitle} onChange={successTitle => update({ successTitle })} />
          <TextFieldRow label="Texto de éxito" value={conversion?.successMessage} onChange={successMessage => update({ successMessage })} />
        </div>
      </PanelCard>

      {isOrder && (
        <PanelCard title="Productos / packs">
          <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
            Cada tarjeta es un producto o un componente del pack. Para un pack de camisas, agrega
            “Camisa 1”, “Camisa 2” y “Camisa 3”; cada una tendrá sus propias propiedades (color, talla…)
            que el cliente podrá escoger antes de enviar el pedido.
          </Typography.Paragraph>
          {(conversion?.products || []).map((product, index) => (
            <ProductEditor
              key={product.key || index}
              product={product}
              index={index}
              onChange={nextProduct => {
                const products = (conversion.products || []).map((current, currentIndex) =>
                  currentIndex === index ? nextProduct : current
                )
                update({ products })
              }}
              onRemove={() => {
                const products = (conversion.products || []).filter((_, currentIndex) => currentIndex !== index)
                update({ products })
              }}
            />
          ))}
          <Button
            type="dashed"
            icon={<Plus size={14} />}
            onClick={() => update({ products: [...(conversion.products || []), makeProduct()] })}
            block
          >
            Agregar producto / ítem del pack
          </Button>
        </PanelCard>
      )}

      <PanelCard title="Campos del formulario">
        <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
          En venta de producto usa contacto + envío. En landings de agencia, infoproducto o lead puedes capturar exactamente lo que necesitas.
        </Typography.Paragraph>
        {(conversion?.fields || []).map((field, index) => (
          <ConversionFieldRow
            key={`${field.key}-${index}`}
            field={field}
            onChange={nextField => {
              const fields = (conversion.fields || []).map((current, currentIndex) =>
                currentIndex === index ? nextField : current
              )
              update({ fields })
            }}
            onRemove={() => {
              const fields = (conversion.fields || []).filter((_, currentIndex) => currentIndex !== index)
              update({ fields })
            }}
          />
        ))}
        <Button
          size="small"
          type="dashed"
          icon={<Plus size={13} />}
          onClick={() =>
            update({
              fields: [
                ...(conversion?.fields || []),
                { key: `campo_${Date.now()}`, label: 'Nuevo campo', type: 'text', group: 'contact', required: false, halfWidth: false },
              ],
            })
          }
        >
          Agregar campo
        </Button>
      </PanelCard>
    </div>
  )
}

export default ConversionPanel
