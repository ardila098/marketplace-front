import { Button, Drawer, Grid, Menu } from 'antd'
import { Menu as MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { publicMenu } from '../../constants/menu'
import { buildRoute, ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const { useBreakpoint } = Grid

const MenuTrigger = styled(Button)`
  && {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    padding: 0;
  }

  &&:hover {
    background: transparent;
    color: inherit;
  }
`

const ResponsivePublicMenu = () => {
  const screens = useBreakpoint()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const selectedKey = `${location.pathname}${location.search}`
  const { translate } = useDictionaryTranslation()
  const verticalId = location.pathname.match(/^\/vertical\/([^/]+)(?:\/|$)/)?.[1]
  const isVerticalContext = Boolean(verticalId && verticalId !== 'products')
  const activeMenu = isVerticalContext
    ? [
        {
          labelKey: 'home',
          path: buildRoute(ROUTES.VERTICAL, { id: verticalId }),
        },
        {
          labelKey: 'products',
          path: buildRoute(ROUTES.VERTICAL_PRODUCTS, { id: verticalId }),
        },
        {
          labelKey: 'categories',
          path: `${buildRoute(ROUTES.VERTICAL, { id: verticalId })}#categories`,
        },
        {
          labelKey: 'outlet',
          path: buildRoute(ROUTES.VERTICAL_OUTLET, { id: verticalId }),
        },
      ]
    : publicMenu
  const menuItems = activeMenu.map(item => ({
    key: item.path,
    label: <Link to={item.path}>{item.labelKey ? translate(item.labelKey) : item.label}</Link>,
  }))

  if (screens.md) {
    return (
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey, location.pathname]}
        items={menuItems}
        style={{ minWidth: 320, borderBottom: 0 }}
      />
    )
  }

  return (
    <>
      <MenuTrigger icon={<MenuIcon size={20} />} onClick={() => setOpen(true)} />
      <Drawer title={translate('menu')} open={open} onClose={() => setOpen(false)} placement="left">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey, location.pathname]}
          items={menuItems}
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </>
  )
}

export default ResponsivePublicMenu
