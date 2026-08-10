import { AtSign, Mail, MapPin, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { env } from '../../config/env'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { selectPlatformSettings } from '../../store/slices/platformSlice'

const Footer = styled.footer`
  border-top: 1px solid rgba(17, 24, 39, 0.08);
  background: ${({ theme }) => `${theme.surfaceColor || '#ffffff'}10`};
  color: ${({ theme }) => theme.textColor || '#111827'};
  margin-top: auto;
`

const Inner = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 36px 0 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(160px, 0.6fr));
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 10px;
`

const Text = styled.p`
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 440px;
`

const ColumnTitle = styled.h3`
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: 13px;
  font-weight: 200;
  margin: 0 0 12px;
`

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  a,
  span {
    color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
    font-size: 14px;
  }

  a:hover {
    color: ${({ theme }) => theme.primaryColor || '#111111'};
  }
`

const ContactItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const Bottom = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 0 0 22px;
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 12px;
`

const buildStorePaths = ({ store, resolutionMode }) => {
  const slug = store?.slug

  if (resolutionMode === 'host') {
    return {
      home: '/',
      products: '/products',
      categories: '/categories',
      outlet: '/outlet',
    }
  }

  return {
    home: slug ? buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug: slug }) : '/',
    products: slug ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: slug }) : '/products',
    categories: slug
      ? buildRoute(ROUTES.STOREFRONT_CATEGORIES, { storeSlug: slug })
      : '/categories',
    outlet: slug ? buildRoute(ROUTES.STOREFRONT_OUTLET, { storeSlug: slug }) : '/outlet',
  }
}

const SiteFooter = ({ store, resolutionMode }) => {
  const { translate } = useDictionaryTranslation()
  const location = useLocation()
  const platformSettings = useSelector(selectPlatformSettings)
  const verticalId = location.pathname.match(/^\/vertical\/([^/]+)(?:\/|$)/)?.[1]
  const isVerticalContext = Boolean(verticalId && verticalId !== 'products')
  const contact = store?.settings?.contact || {}
  const brand = store?.name || platformSettings.name || env.appName || 'Marketplace'
  const paths = store
    ? buildStorePaths({ store, resolutionMode })
    : isVerticalContext
      ? {
          products: buildRoute(ROUTES.VERTICAL_PRODUCTS, { id: verticalId }),
          outlet: buildRoute(ROUTES.VERTICAL_OUTLET, { id: verticalId }),
        }
      : null
  const currentYear = new Date().getFullYear()
  const description =
    store?.description ||
    platformSettings.footer?.description ||
    translate('footer.marketplaceDescription')
  const instagramUrl = contact.instagram?.startsWith('http')
    ? contact.instagram
    : contact.instagram
      ? `https://instagram.com/${contact.instagram.replace(/^@/, '')}`
      : ''

  return (
    <Footer>
      <Inner>
        <div>
          <Brand>{brand}</Brand>
          <Text>{description}</Text>
        </div>

        <div>
          <ColumnTitle>{translate('footer.support')}</ColumnTitle>
          <LinkList>
            <Link to={paths?.products || ROUTES.MARKETPLACE}>{translate('products')}</Link>
            {store && <Link to={paths.categories}>{translate('categories')}</Link>}
            <Link to={paths?.outlet || `${ROUTES.MARKETPLACE}?discounted=true`}>
              {translate('outlet')}
            </Link>
            <Link to={ROUTES.ORDER_LOOKUP}>{translate('footer.orderLookup')}</Link>
          </LinkList>
        </div>

        <div>
          <ColumnTitle>{translate('footer.contact')}</ColumnTitle>
          <LinkList>
            {contact.email && (
              <a href={`mailto:${contact.email}`}>
                <ContactItem>
                  <Mail size={14} /> {contact.email}
                </ContactItem>
              </a>
            )}
            {(contact.phone || contact.whatsapp) && (
              <a href={`tel:${contact.whatsapp || contact.phone}`}>
                <ContactItem>
                  <Phone size={14} /> {contact.whatsapp || contact.phone}
                </ContactItem>
              </a>
            )}
            {contact.address && (
              <ContactItem>
                <MapPin size={14} /> {contact.address}
              </ContactItem>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                <ContactItem>
                  <AtSign size={14} /> Instagram
                </ContactItem>
              </a>
            )}
            {!contact.email &&
              !contact.phone &&
              !contact.whatsapp &&
              !contact.address &&
              !contact.instagram && <span>{store ? store.name : translate('footer.about')}</span>}
          </LinkList>
        </div>
      </Inner>
      <Bottom>
        {currentYear} {brand}. {translate('footer.rights')}
      </Bottom>
    </Footer>
  )
}

export default SiteFooter
