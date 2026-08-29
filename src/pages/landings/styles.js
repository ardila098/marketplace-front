import { Button, Card, Drawer, Form, Input, Select, Space, Typography } from 'antd'
import styled, { css } from 'styled-components'

const templateSurface = {
  bundle_drop: css`
    background: linear-gradient(135deg, #111 0%, #272727 100%);
    color: #fff;
  `,
  premium_minimal: css`
    background: #f8f7f4;
  `,
  clay_offer: css`
    border: 1px solid rgba(255, 255, 255, 0.72);
    background: rgba(255, 255, 255, 0.44);
    box-shadow:
      18px 18px 44px rgba(89, 99, 117, 0.13),
      -14px -14px 34px rgba(255, 255, 255, 0.82);
  `,
}

export const LandingCanvas = styled.main`
  --landing-primary: ${({ $theme }) => $theme?.primaryColor || '#111111'};
  --landing-accent: ${({ $theme }) => $theme?.accentColor || '#f5c542'};
  --landing-bg: ${({ $theme }) => $theme?.backgroundColor || '#ffffff'};
  --landing-text: ${({ $theme }) => $theme?.textColor || '#111111'};
  --landing-muted: #4b5563;
  --landing-button-bg: var(--landing-primary);
  --landing-button-text: #ffffff;
  --landing-card-bg: #ffffff;
  --landing-card-border: #ededed;
  --landing-card-shadow: none;

  min-height: 100vh;
  background: var(--landing-bg);
  color: var(--landing-text);

  ${({ $template }) => $template === 'clay_offer' && css`
    --landing-bg: #f7f2eb;
    --landing-muted: #536170;
    --landing-card-bg: rgba(255, 255, 255, 0.58);
    --landing-card-border: rgba(255, 255, 255, 0.74);
    --landing-card-shadow:
      12px 12px 28px rgba(89, 99, 117, 0.1),
      -10px -10px 22px rgba(255, 255, 255, 0.78);

    background: linear-gradient(135deg, #f8f3ec 0%, #edf4f1 52%, #f6f1ea 100%);
  `}
`

export const LandingHeader = styled.header`
  width: min(1120px, calc(100% - 32px));
  min-height: 70px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const LandingBrand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-weight: 800;
  letter-spacing: 0;
`

export const LandingLogo = styled.img`
  max-width: 150px;
  max-height: 42px;
  object-fit: contain;
`

export const HeaderContact = styled.a`
  color: var(--landing-primary);
  font-weight: 700;

  &:hover {
    color: var(--landing-primary);
    opacity: 0.75;
  }
`

export const HeroSection = styled.section`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 40px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.85fr);
  align-items: center;
  gap: 44px;

  ${({ $template }) => templateSurface[$template] || ''}

  ${({ $template }) => $template === 'bundle_drop' && css`
    --landing-primary: #ffffff;
    --landing-text: #ffffff;
    --landing-muted: rgba(255, 255, 255, 0.78);
    --landing-button-bg: #ffffff;
    --landing-button-text: #111111;

    width: min(1180px, calc(100% - 24px));
    margin-top: 18px;
    padding: 54px;
    border-radius: 18px;
  `}

  ${({ $template }) => $template === 'premium_minimal' && css`
    width: min(1180px, calc(100% - 24px));
    margin-top: 18px;
    padding: 54px;
    border-radius: 18px;
  `}

  ${({ $template }) => $template === 'clay_offer' && css`
    width: min(1180px, calc(100% - 24px));
    margin-top: 18px;
    padding: 54px;
    border-radius: 18px;
  `}

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 34px 0 28px;
    gap: 28px;

    ${({ $template }) => ['bundle_drop', 'premium_minimal', 'clay_offer'].includes($template) && css`
      padding: 28px;
      border-radius: 14px;
    `}
  }
`

export const HeroText = styled.div`
  min-width: 0;
`

export const Eyebrow = styled(Typography.Text)`
  && {
    display: inline-flex;
    margin-bottom: 14px;
    color: var(--landing-primary);
    font-weight: 800;
    letter-spacing: 0;
  }
`

export const HeroTitle = styled(Typography.Title)`
  && {
    margin: 0;
    color: var(--landing-text);
    font-size: clamp(38px, 7vw, 76px);
    line-height: 0.95;
    letter-spacing: 0;
    font-weight: 850;
  }
`

export const HeroDescription = styled(Typography.Paragraph)`
  && {
    max-width: 620px;
    margin: 22px 0 0;
    color: var(--landing-muted);
    font-size: 18px;
    line-height: 1.65;
  }
`

export const OfferRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`

export const OfferPrice = styled.span`
  color: var(--landing-text);
  font-size: 30px;
  font-weight: 850;
`

export const OfferCompare = styled.span`
  color: #9ca3af;
  font-size: 17px;
  text-decoration: line-through;
`

export const OfferBadge = styled.span`
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--landing-accent);
  color: #111;
  font-weight: 800;
`

export const LandingButton = styled(Button)`
  && {
    min-height: 48px;
    padding: 0 22px;
    border-radius: 8px;
    border-color: var(--landing-button-bg);
    background: var(--landing-button-bg);
    color: var(--landing-button-text);
    font-weight: 800;
    box-shadow: none;
  }

  &&:hover,
  &&:focus {
    border-color: var(--landing-button-bg);
    background: var(--landing-button-bg);
    color: var(--landing-button-text);
    opacity: 0.88;
  }
`

export const HeroImageWrap = styled.div`
  min-width: 0;
`

export const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.16);

  @media (max-width: 860px) {
    aspect-ratio: 1 / 1;
    border-radius: 14px;
  }
`

export const Section = styled.section`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 52px 0;
`

export const SectionHeader = styled.div`
  max-width: 720px;
  margin-bottom: 24px;
`

export const SectionTitle = styled(Typography.Title)`
  && {
    margin: 0;
    font-size: clamp(26px, 4vw, 42px);
    letter-spacing: 0;
    font-weight: 820;
  }
`

export const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
`

export const BenefitPanel = styled(Card)`
  && {
    border-radius: 8px;
    border-color: var(--landing-card-border);
    background: var(--landing-card-bg);
    box-shadow: var(--landing-card-shadow);
  }
`

export const BenefitTitle = styled(Typography.Text)`
  display: block;
  margin-bottom: 14px;
  color: #111;
  font-size: 15px;
  font-weight: 800;
`

export const BenefitCard = styled.div`
  position: relative;
  min-height: 72px;
  padding: 16px 16px 16px 42px;
  border: 1px solid var(--landing-card-border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.64);
  color: #111;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 700;

  &::before {
    content: '';
    position: absolute;
    top: 19px;
    left: 17px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--landing-primary);
    box-shadow: 0 0 0 5px rgba(17, 17, 17, 0.06);
  }
`

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`

export const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: var(--landing-card-shadow);
`

export const ProductPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.55fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

export const ProductCopy = styled(Card)`
  && {
    border-radius: 8px;
    border-color: var(--landing-card-border);
    background: var(--landing-card-bg);
    box-shadow: var(--landing-card-shadow);
  }
`

export const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`

export const OptionPill = styled.span`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  font-size: 13px;
  font-weight: 700;
`

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
`

export const TestimonialCard = styled(Card)`
  && {
    border-radius: 8px;
    border-color: var(--landing-card-border);
    background: var(--landing-card-bg);
    box-shadow: var(--landing-card-shadow);
  }
`

export const FaqGrid = styled.div`
  display: grid;
  gap: 12px;
`

export const FaqItem = styled(Card)`
  && {
    border-radius: 8px;
    border-color: var(--landing-card-border);
    background: var(--landing-card-bg);
    box-shadow: var(--landing-card-shadow);
  }
`

export const StickyCtaBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid #ededed;
  backdrop-filter: blur(16px);
`

export const StickyCtaInner = styled.div`
  width: min(1120px, calc(100% - 32px));
  min-height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
    padding: 12px 0;
  }
`

export const LeadDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding-bottom: 0;
  }
`

export const LeadForm = styled(Form)`
  padding-bottom: 18px;

  .ant-input,
  .ant-select-selector {
    border-radius: 8px !important;
  }
`

export const LeadFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const LeadSelectionCard = styled.div`
  margin-bottom: 14px;
  padding: 16px;
  border: 1px solid var(--landing-card-border);
  border-radius: 8px;
  background: var(--landing-card-bg);
`

export const LeadSelectionTitle = styled(Typography.Text)`
  display: block;
  margin-bottom: 12px;
  color: #111;
  font-size: 15px;
  font-weight: 800;
`

export const LeadSelectionHint = styled(Typography.Text)`
  display: block;
  margin-top: -6px;
  margin-bottom: 12px;
  color: #6b7280;
  font-size: 13px;
`

export const LeadFormActions = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  margin: 6px -24px 0;
  padding: 18px 24px 24px;
  border-top: 1px solid #ededed;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
`

export const DashboardFormSection = styled.div`
  margin-bottom: 24px;
`

export const DashboardSectionTitle = styled(Typography.Title).attrs({
  level: 5,
})`
  && {
    margin: 0 0 14px;
  }
`

export const TextArea = styled(Input.TextArea)``

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
`

export const PublicPathText = styled(Typography.Text)`
  display: block;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CompactSpace = styled(Space)`
  width: 100%;
`

export const LeadStatusSelect = styled(Select)`
  min-width: 150px;
`
