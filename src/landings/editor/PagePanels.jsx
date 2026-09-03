import { Input, InputNumber, Select, Switch, Typography } from 'antd'
import { ImageUploadInput } from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import {
  LANDING_PAGE_STATUS_OPTIONS,
  LANDING_PAGE_TYPE_OPTIONS,
} from '../../constants/landingPages'
import { TEMPLATE_OPTIONS } from '../templates'
import { FONT_OPTIONS } from '../theme'
import { FieldWrap } from './FieldControls'

const Panel = ({ title, children }) => (
  <div>
    <Typography.Title level={5} style={{ margin: '0 0 16px' }}>{title}</Typography.Title>
    {children}
  </div>
)

const Row = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 12px' }}>{children}</div>
)

export const GeneralPanel = ({ landing, update }) => (
  <Panel title="Información general">
    <Row>
      <FieldWrap label="Nombre interno">
        <Input value={landing?.name || ''} onChange={event => update('name', event.target.value)} />
      </FieldWrap>
      <FieldWrap label="Slug público">
        <Input value={landing?.slug || ''} onChange={event => update('slug', event.target.value)} />
      </FieldWrap>
    </Row>

    <Row>
      <FieldWrap label="Tipo de landing">
        <Select
          value={landing?.landingType || 'product'}
          options={LANDING_PAGE_TYPE_OPTIONS}
          style={{ width: '100%' }}
          onChange={landingType => update('landingType', landingType)}
        />
      </FieldWrap>
      <FieldWrap label="Plantilla base">
        <Select
          value={landing?.template || ''}
          options={TEMPLATE_OPTIONS.map(template => ({ label: template.label, value: template.value }))}
          style={{ width: '100%' }}
          allowClear
          onChange={template => update('template', template || '')}
        />
      </FieldWrap>
    </Row>

    <Row>
      <FieldWrap label="Estado">
        <Select
          value={landing?.status || 'draft'}
          options={LANDING_PAGE_STATUS_OPTIONS}
          style={{ width: '100%' }}
          onChange={status => update('status', status)}
        />
      </FieldWrap>
      <FieldWrap label="Activa">
        <Switch checked={landing?.isActive !== false} onChange={isActive => update('isActive', isActive)} />
      </FieldWrap>
    </Row>

    <FieldWrap label="Título SEO (meta title)">
      <Input value={landing?.metaTitle || ''} onChange={event => update('metaTitle', event.target.value)} />
    </FieldWrap>
    <FieldWrap label="Descripción SEO">
      <Input.TextArea value={landing?.metaDescription || ''} rows={3} onChange={event => update('metaDescription', event.target.value)} />
    </FieldWrap>
  </Panel>
)

export const BrandPanel = ({ landing, update }) => {
  const updateBrand = (key, value) => {
    update('brand', { ...(landing?.brand || {}), [key]: value })
  }

  return (
    <Panel title="Marca">
      <Row>
        <FieldWrap label="Nombre visible">
          <Input value={landing?.brand?.name || ''} onChange={event => updateBrand('name', event.target.value)} />
        </FieldWrap>
        <FieldWrap label="Tagline">
          <Input value={landing?.brand?.tagline || ''} onChange={event => updateBrand('tagline', event.target.value)} />
        </FieldWrap>
      </Row>
      <FieldWrap label="Logo">
        <ImageUploadInput
          value={landing?.brand?.logo || ''}
          onChange={logo => updateBrand('logo', logo)}
          folder={UPLOAD_FOLDERS.landings.logos}
          uploadRoute={UPLOAD_ROUTES.landings.logos}
          maxCount={1}
          multiple={false}
        />
      </FieldWrap>
      <Row>
        <FieldWrap label="WhatsApp">
          <Input value={landing?.brand?.whatsapp || ''} onChange={event => updateBrand('whatsapp', event.target.value)} placeholder="3001234567" />
        </FieldWrap>
        <FieldWrap label="Email">
          <Input value={landing?.brand?.email || ''} onChange={event => updateBrand('email', event.target.value)} />
        </FieldWrap>
      </Row>
      <FieldWrap label="Instagram">
        <Input value={landing?.brand?.instagram || ''} onChange={event => updateBrand('instagram', event.target.value)} placeholder="tumarca o https://instagram.com/…" />
      </FieldWrap>
    </Panel>
  )
}

const themeField = (label, path, type = 'text') => ({ label, path, type })

export const ThemePanel = ({ theme, update }) => {
  const updateTheme = (key, value) => {
    update('theme', { ...(theme || {}), [key]: value })
  }

  const fields = [
    themeField('Color principal', 'primaryColor', 'color'),
    themeField('Color de acento', 'accentColor', 'color'),
    themeField('Fondo', 'backgroundColor', 'color'),
    themeField('Superficies / tarjetas', 'surfaceColor', 'color'),
    themeField('Texto', 'textColor', 'color'),
    themeField('Texto secundario', 'mutedColor', 'color'),
  ]

  return (
    <Panel title="Tema visual">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 12px' }}>
        {fields.map(field => (
          <FieldWrap key={field.path} label={field.label}>
            <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={/^#[0-9a-f]{6}$/i.test(theme?.[field.path] || '') ? theme[field.path] : '#000000'}
                onChange={event => updateTheme(field.path, event.target.value)}
                style={{ width: 42, height: 34, border: '1px solid #d9d9d9', borderRadius: 6, padding: 2, cursor: 'pointer' }}
              />
              <Input value={theme?.[field.path] || ''} onChange={event => updateTheme(field.path, event.target.value)} style={{ width: 120 }} />
            </div>
          </FieldWrap>
        ))}
      </div>

      <FieldWrap label="Tipografía" hint="Puedes agregar más familias en front/src/landings/theme.js">
        <Select
          value={theme?.fontFamily || 'modern'}
          options={FONT_OPTIONS}
          style={{ width: '100%' }}
          onChange={fontFamily => updateTheme('fontFamily', fontFamily)}
        />
      </FieldWrap>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 12px' }}>
        <FieldWrap label="Tamaño de fuente base">
          <InputNumber min={12} max={22} value={theme?.baseFontSize ?? 16} style={{ width: '100%' }} onChange={baseFontSize => updateTheme('baseFontSize', baseFontSize)} />
        </FieldWrap>
        <FieldWrap label="Separación entre secciones">
          <InputNumber min={24} max={160} value={theme?.sectionSpacing ?? 72} style={{ width: '100%' }} onChange={sectionSpacing => updateTheme('sectionSpacing', sectionSpacing)} />
        </FieldWrap>
        <FieldWrap label="Ancho máximo del contenido">
          <InputNumber min={900} max={1440} step={20} value={theme?.containerWidth ?? 1140} style={{ width: '100%' }} onChange={containerWidth => updateTheme('containerWidth', containerWidth)} />
        </FieldWrap>
        <FieldWrap label="Radio de tarjetas">
          <InputNumber min={0} max={40} value={theme?.radius ?? 16} style={{ width: '100%' }} onChange={radius => updateTheme('radius', radius)} />
        </FieldWrap>
        <FieldWrap label="Radio de botones">
          <InputNumber min={0} max={40} value={theme?.buttonRadius ?? 10} style={{ width: '100%' }} onChange={buttonRadius => updateTheme('buttonRadius', buttonRadius)} />
        </FieldWrap>
      </div>
    </Panel>
  )
}

export const DomainPanel = ({ landing, update, isAdmin }) => {
  const updateDomain = (key, value) => {
    update('domain', { ...(landing?.domain || {}), [key]: value })
  }

  const updateStatus = status => {
    update('domain', {
      ...(landing?.domain || {}),
      status,
      ...(status === 'not_configured' ? { hostname: '' } : {}),
    })
  }

  return (
    <Panel title="Publicación y dominio">
      <FieldWrap label="Dominio personalizado" hint="Si lo dejas vacío, la landing se publica en /l/{slug}">
        <Input
          value={landing?.domain?.hostname || ''}
          placeholder="promo.tumarca.com"
          onChange={event => updateDomain('hostname', event.target.value)}
        />
      </FieldWrap>

      {isAdmin ? (
        <Row>
          <FieldWrap label="Estado del dominio">
            <Select
              value={landing?.domain?.status || 'not_configured'}
              options={[
                { value: 'not_configured', label: 'Sin configurar' },
                { value: 'pending_verification', label: 'Pendiente de verificación' },
                { value: 'verified', label: 'Verificado' },
                { value: 'rejected', label: 'Rechazado' },
              ]}
              style={{ width: '100%' }}
              onChange={updateStatus}
            />
          </FieldWrap>
          <FieldWrap label="Motivo de rechazo">
            <Input value={landing?.domain?.rejectionReason || ''} onChange={event => updateDomain('rejectionReason', event.target.value)} />
          </FieldWrap>
        </Row>
      ) : null}
    </Panel>
  )
}
