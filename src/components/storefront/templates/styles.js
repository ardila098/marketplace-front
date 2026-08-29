import { Button } from 'antd'
import styled, { css } from 'styled-components'

const claySurface = css`
  background: linear-gradient(135deg, #f8f3ec 0%, #eef3f1 52%, #f6f1ea 100%);
`

const editorialSurface = css`
  background: #fbfbfa;
`

export const StorefrontCanvas = styled.main`
  min-height: 100%;
  color: ${({ theme }) => theme.textColor || '#111827'};
  background: ${({ theme }) => theme.backgroundColor || '#ffffff'};

  ${({ $template }) => $template === 'clay_boutique' && claySurface}
  ${({ $template }) => $template === 'editorial_clean' && editorialSurface}
`

export const TemplateHero = styled.section`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 34px;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(320px, 0.8fr);
  gap: 34px;
  align-items: center;

  ${({ $template }) => $template === 'clay_boutique' && css`
    width: min(1200px, calc(100% - 24px));
    margin-top: 24px;
    padding: 42px;
    border: 1px solid rgba(255, 255, 255, 0.76);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.44);
    box-shadow:
      18px 18px 42px rgba(89, 99, 117, 0.12),
      -14px -14px 34px rgba(255, 255, 255, 0.82);
  `}

  ${({ $template }) => $template === 'editorial_clean' && css`
    min-height: 500px;
    grid-template-columns: minmax(0, 0.7fr) minmax(360px, 1fr);
    border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  `}

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 36px 0 24px;

    ${({ $template }) => $template === 'clay_boutique' && css`
      padding: 24px;
      border-radius: 14px;
    `}

    ${({ $template }) => $template === 'editorial_clean' && css`
      min-height: auto;
    `}
  }
`

export const HeroContent = styled.div`
  min-width: 0;
`

export const HeroEyebrow = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0;
  text-transform: uppercase;
`

export const HeroTitle = styled.h1`
  max-width: 720px;
  margin: 0;
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: clamp(34px, 6vw, 70px);
  font-weight: 820;
  line-height: 0.98;
  letter-spacing: 0;

  ${({ $template }) => $template === 'classic' && css`
    font-size: clamp(34px, 4.8vw, 56px);
    line-height: 1.04;
  `}
`

export const HeroDescription = styled.p`
  max-width: 620px;
  margin: 18px 0 0;
  color: ${({ theme }) => theme.mutedTextColor || '#566170'};
  font-size: 16px;
  line-height: 1.65;
`

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
`

export const HeroButton = styled(Button)`
  && {
    min-height: 44px;
    padding: 0 20px;
    border-radius: ${({ theme }) => Math.max(theme.borderRadius || 8, 8)}px;
    font-weight: 750;
  }
`

export const HeroMedia = styled.div`
  min-width: 0;
  position: relative;
`

export const HeroImageFrame = styled.div`
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => Math.max(theme.borderRadius || 8, 8)}px;
  background: ${({ theme }) => theme.surfaceColor || '#f4f4f5'};
  box-shadow: 0 18px 44px rgba(17, 24, 39, 0.12);

  ${({ $template }) => $template === 'clay_boutique' && css`
    box-shadow:
      16px 16px 36px rgba(89, 99, 117, 0.18),
      -12px -12px 28px rgba(255, 255, 255, 0.76);
  `}

  ${({ $template }) => $template === 'editorial_clean' && css`
    aspect-ratio: 1 / 1;
  `}
`

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

export const HeroImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 28px;
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: clamp(28px, 5vw, 54px);
  font-weight: 820;
  line-height: 1;
  text-align: center;
  background: ${({ theme }) => theme.surfaceColor || '#f4f4f5'};
`

export const HeroLogoBadge = styled.div`
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100% - 36px);
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.12);
`

export const HeroLogo = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  object-fit: contain;
`

export const HeroLogoText = styled.span`
  min-width: 0;
  overflow: hidden;
  color: #111827;
  font-size: 13px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MainStack = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 58px;
  display: grid;
  gap: 32px;

  ${({ $template }) => $template === 'clay_boutique' && css`
    padding-top: 34px;
  `}
`

export const TemplateSection = styled.section`
  min-width: 0;

  ${({ $template }) => $template === 'clay_boutique' && css`
    padding: 22px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.42);
    box-shadow:
      12px 12px 30px rgba(89, 99, 117, 0.1),
      -10px -10px 24px rgba(255, 255, 255, 0.72);
  `}
`

export const SectionHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`

export const SectionCopy = styled.div`
  min-width: 0;
`

export const SectionEyebrow = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 12px;
  font-weight: 760;
  letter-spacing: 0;
  text-transform: uppercase;
`

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: clamp(22px, 3.6vw, 34px);
  font-weight: 780;
  line-height: 1.12;
  letter-spacing: 0;
`

export const SectionActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 640px) {
    .ant-btn {
      width: 100%;
    }
  }
`

export const ProductsWrap = styled.div`
  min-width: 0;
`

export const LoadingBlock = styled.div`
  min-height: 180px;
  display: grid;
  place-items: center;
`
