import { Button, Card, Space, Typography } from 'antd'
import styled from 'styled-components'
import {
  STOREFRONT_SECTION_OPTIONS,
  getStorefrontTemplateMeta,
} from '../../constants/storefrontTemplates'

const Preview = styled(Card)`
  background: ${({ $theme }) => $theme?.backgroundColor || '#ffffff'};
  color: ${({ $theme }) => $theme?.textColor || '#111827'};
  border-radius: ${({ $theme }) => ($theme?.borderRadius || 8) + 8}px;
`

const HeroMock = styled.div`
  border-radius: ${({ $theme }) => $theme?.borderRadius || 8}px;
  background: ${({ $theme }) => $theme?.primaryColor || '#111111'};
  color: #fff;
  padding: 28px;
`

const PreviewStack = styled(Space).attrs({
  direction: 'vertical',
  size: 'middle',
})`
  width: 100%;
`

const PreviewTitle = styled(Typography.Title).attrs({
  level: 3,
})`
  && {
    margin: 0;
    color: #ffffff;
    letter-spacing: 0;
  }
`

const PreviewText = styled(Typography.Text)`
  && {
    color: #ffffff;
  }
`

const TemplateLabel = styled(Typography.Text)`
  && {
    display: block;
    color: ${({ $theme }) => $theme?.mutedTextColor || '#6b7280'};
    font-size: 12px;
  }
`

const SectionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SectionChip = styled.span`
  padding: 6px 10px;
  border: 1px solid ${({ $active }) => ($active ? '#d1d5db' : '#eceef2')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#ffffff' : '#f7f7f8')};
  color: ${({ $active, $theme }) => ($active ? $theme?.textColor || '#111827' : '#9ca3af')};
  font-size: 12px;
  font-weight: 650;
`

const StoreThemePreview = ({ sections = {}, template, theme }) => {
  const templateMeta = getStorefrontTemplateMeta(template)

  return (
    <Preview $theme={theme}>
      <PreviewStack>
        <HeroMock $theme={theme}>
          <PreviewTitle>Tu tienda</PreviewTitle>
          <PreviewText>Una experiencia limpia para vender mejor.</PreviewText>
        </HeroMock>
        <TemplateLabel $theme={theme}>
          Plantilla: {templateMeta.label}
        </TemplateLabel>
        <SectionChips>
          {STOREFRONT_SECTION_OPTIONS.map(section => (
            <SectionChip
              key={section.key}
              $active={sections[section.key] !== false}
              $theme={theme}
            >
              {section.label}
            </SectionChip>
          ))}
        </SectionChips>
        <Button type="primary">Boton principal</Button>
      </PreviewStack>
    </Preview>
  )
}

export default StoreThemePreview
