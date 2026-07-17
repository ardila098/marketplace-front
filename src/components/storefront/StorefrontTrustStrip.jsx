import { CreditCard, PackageCheck, ShieldCheck } from 'lucide-react'
import styled from 'styled-components'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const Wrapper = styled.section`
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  background: ${({ theme }) => theme.surfaceColor || '#ffffff'};
`

const Inner = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  padding: 18px 0;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.textColor || '#111827'};
`

const IconBox = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #ffffff;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.primaryColor || '#111111'};
  flex: 0 0 auto;
`

const Text = styled.div`
  font-size: 13px;
  font-weight: 560;
`

const StorefrontTrustStrip = () => {
  const { translate } = useDictionaryTranslation()
  const items = [
    { icon: ShieldCheck, text: translate('storefront.trustPayment') },
    { icon: PackageCheck, text: translate('storefront.trustProducts') },
    { icon: CreditCard, text: translate('storefront.trustCoupons') },
  ]

  return (
    <Wrapper>
      <Inner>
        {items.map(item => {
          const Icon = item.icon

          return (
            <Item key={item.text}>
              <IconBox><Icon size={17} /></IconBox>
              <Text>{item.text}</Text>
            </Item>
          )
        })}
      </Inner>
    </Wrapper>
  )
}

export default StorefrontTrustStrip
