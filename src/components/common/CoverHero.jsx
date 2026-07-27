import styled from 'styled-components'

const Wrapper = styled.section`
  min-height: ${({ $size }) => ($size === 'compact' ? '430px' : '520px')};
  display: flex;
  align-items: flex-end;
  padding: 76px max(20px, calc((100vw - 1180px) / 2)) 42px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.64)),
    ${({ $image }) => ($image ? `url(${$image})` : 'linear-gradient(135deg, #1f2937, #111827)')};
  background-position: center;
  background-size: cover;

  @media (max-width: 768px) {
    min-height: ${({ $size }) => ($size === 'compact' ? '360px' : '430px')};
    padding-top: 64px;
    padding-bottom: 34px;
  }
`

const Content = styled.div`
  width: min(${({ $maxWidth }) => $maxWidth || '680px'}, 100%);
  color: #ffffff;

  .ant-typography {
    color: inherit;
  }
`

const CoverHero = ({
  children,
  className,
  contentWidth = '680px',
  image,
  size = 'default',
}) => (
  <Wrapper className={className} $image={image} $size={size}>
    <Content $maxWidth={contentWidth}>{children}</Content>
  </Wrapper>
)

export default CoverHero
