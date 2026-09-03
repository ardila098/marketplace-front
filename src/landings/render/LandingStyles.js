import styled, { css } from 'styled-components'

export const LandingRoot = styled.main`
  --lp-radius: ${({ $theme }) => $theme?.radius ?? 16}px;

  min-height: 100vh;
  overflow: hidden;
  background: var(--lp-bg);
  color: var(--lp-text);
  font-family: var(--lp-font);
  font-size: var(--lp-font-size);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;

  h1, h2, h3, h4 {
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 800;
    color: var(--lp-text);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }
`

export const LpContainer = styled.div`
  width: min(var(--lp-container, 1140px), calc(100% - 32px));
  margin: 0 auto;
`

export const LpSection = styled.section`
  padding: calc(var(--lp-section-gap, 72px) * 0.82) 0;

  ${({ $flush }) => $flush && css`
    padding: 0;
  `}
`

export const LpCenteredSection = styled(LpSection)`
  text-align: center;

  ${LpContainer} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const LpEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 7px 14px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--lp-primary) 9%, transparent);
  color: var(--lp-primary);
  font-size: 0.82em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const LpTitle = styled.h2`
  font-size: clamp(1.85rem, 4.6vw, 3.3rem);
  max-width: 780px;
`

export const LpSubtitle = styled.p`
  max-width: 680px;
  margin: 18px 0 0;
  color: var(--lp-muted);
  font-size: 1.08rem;
  line-height: 1.65;

  ${({ $center }) => $center && css`
    margin-right: auto;
    margin-left: auto;
  `}
`

export const LpSectionHead = styled.div`
  max-width: 720px;
  margin-bottom: clamp(24px, 4vw, 42px);

  ${({ $center }) => $center && css`
    margin-right: auto;
    margin-left: auto;
    text-align: center;

    ${LpSubtitle} {
      margin-right: auto;
      margin-left: auto;
    }
  `}
`

export const LpButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 26px;
  border-radius: var(--lp-button-radius, 10px);
  background: var(--lp-primary);
  color: #fff;
  font-weight: 800;
  font-size: 0.98rem;
  border: 1px solid transparent;
  transition: opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    color: #fff;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.22);
  }

  ${({ $variant }) => $variant === 'ghost' && css`
    background: transparent;
    border-color: color-mix(in srgb, var(--lp-text) 28%, transparent);
    color: var(--lp-text);
    box-shadow: none;

    &:hover {
      background: color-mix(in srgb, var(--lp-text) 6%, transparent);
      color: var(--lp-text);
    }
  `}

  ${({ $variant }) => $variant === 'accent' && css`
    background: var(--lp-accent);
    color: #111;
  `}
`

export const LpImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const LpCard = styled.div`
  overflow: hidden;
  background: var(--lp-surface);

  ${({ $cardStyle }) => $cardStyle === 'bordered' && css`
    border: 1px solid color-mix(in srgb, var(--lp-text) 10%, transparent);
    border-radius: var(--lp-radius, 16px);
  `}

  ${({ $cardStyle }) => $cardStyle === 'rounded' && css`
    border-radius: calc(var(--lp-radius, 16px) + 8px);
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  `}

  ${({ $cardStyle }) => $cardStyle === 'shadow' && css`
    border-radius: var(--lp-radius, 16px);
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.12);
  `}

  ${({ $cardStyle }) => $cardStyle === 'plain' && css`
    background: transparent;
  `}
`

export const LpFooter = styled.footer`
  padding: 38px 0 52px;
  border-top: 1px solid color-mix(in srgb, var(--lp-text) 10%, transparent);
  color: var(--lp-muted);
  font-size: 0.92rem;
`

export const LpForm = styled.form`
  display: grid;
  gap: 14px;
`

export const LpFieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const LpField = styled.label`
  display: grid;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--lp-text);

  ${({ $full }) => $full && css`
    grid-column: 1 / -1;
  `}
`

export const LpInput = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid color-mix(in srgb, var(--lp-text) 18%, transparent);
  border-radius: 10px;
  background: var(--lp-bg);
  color: var(--lp-text);
  font: inherit;
  outline: none;

  &:focus {
    border-color: var(--lp-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-primary) 15%, transparent);
  }
`

export const LpTextarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, var(--lp-text) 18%, transparent);
  border-radius: 10px;
  background: var(--lp-bg);
  color: var(--lp-text);
  font: inherit;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: var(--lp-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-primary) 15%, transparent);
  }
`

export const LpCheckboxLabel = styled.label`
  display: inline-flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--lp-muted);
  font-size: 0.85rem;
  cursor: pointer;
`

export const cardGridStyles = css`
  display: grid;
  gap: 18px;
`

export const LpMediaFrame = styled.div`
  border-radius: calc(var(--lp-radius, 16px) + 6px);
  overflow: hidden;
  background: color-mix(in srgb, var(--lp-text) 6%, transparent);
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.12);
  aspect-ratio: ${({ $ratio }) => $ratio || '4 / 3'};
`
