import styled from 'styled-components'

export const PageShell = styled.main`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;

  h1, h2 { margin: 0; letter-spacing: -0.03em; }
  p { margin: 8px 0 0; color: #6b7280; }
`

export const MutedText = styled.p`
  color: #6b7280;
  margin: 0;
`

export const StorefrontHero = styled.section`
  border-radius: 28px;
  min-height: 280px;
  padding: 42px;
  display: flex;
  align-items: flex-end;
  background: ${({ $image, $color }) => $image ? `linear-gradient(90deg, rgba(0,0,0,.68), rgba(0,0,0,.20)), url(${$image}) center/cover` : $color || '#111'};
  color: white;
`
