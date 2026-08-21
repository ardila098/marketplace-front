import { Button, Card, Drawer, Form, Input, Select, Space, Typography } from 'antd'
import styled, { css } from 'styled-components'

const templateSurface = {
  bundle_drop: css`
    background:
      radial-gradient(circle at 15% 15%, rgba(245, 197, 66, 0.2), transparent 30%),
      linear-gradient(135deg, #111 0%, #272727 100%);
    color: #fff;
  `,
  premium_minimal: css`
    background: #f8f7f4;
  `,
}

export const LandingCanvas = styled.main`
  --landing-primary: ${({ $theme }) => $theme?.primaryColor || '#111111'};
  --landing-accent: ${({ $theme }) => $theme?.accentColor || '#f5c542'};
  --landing-bg: ${({ $theme }) => $theme?.backgroundColor || '#ffffff'};
  --landing-text: ${({ $theme }) => $theme?.textColor || '#111111'};

  min-height: 100vh;
  background: var(--landing-bg);
  color: var(--landing-text);
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

    width: min(1180px, calc(100% - 24px));
    margin-top: 18px;
    padding: 54px;
    border-radius: 28px;
  `}

  ${({ $template }) => $template === 'premium_minimal' && css`
    width: min(1180px, calc(100% - 24px));
    margin-top: 18px;
    padding: 54px;
    border-radius: 28px;
  `}

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 34px 0 28px;
    gap: 28px;

    ${({ $template }) => ['bundle_drop', 'premium_minimal'].includes($template) && css`
      padding: 28px;
      border-radius: 22px;
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
    color: #4b5563;
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
    border-radius: 999px;
    border-color: var(--landing-primary);
    background: var(--landing-primary);
    color: #fff;
    font-weight: 800;
    box-shadow: none;
  }

  &&:hover,
  &&:focus {
    border-color: var(--landing-primary);
    background: var(--landing-primary);
    color: #fff;
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
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.16);

  @media (max-width: 860px) {
    aspect-ratio: 1 / 1;
    border-radius: 22px;
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

export const BenefitCard = styled.div`
  padding: 20px;
  border: 1px solid #ededed;
  border-radius: 18px;
  background: #fff;
  font-weight: 700;
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
  border-radius: 18px;
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
    border-radius: 20px;
    border-color: #ededed;
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
    border-radius: 18px;
    border-color: #ededed;
  }
`

export const FaqGrid = styled.div`
  display: grid;
  gap: 12px;
`

export const FaqItem = styled(Card)`
  && {
    border-radius: 16px;
    border-color: #ededed;
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
    padding-bottom: 32px;
  }
`

export const LeadForm = styled(Form)`
  .ant-input,
  .ant-select-selector {
    border-radius: 12px !important;
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
