import { Button, Drawer, Grid, Menu } from 'antd'
import { Menu as MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicMenu } from '../../constants/menu'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const { useBreakpoint } = Grid

const ResponsivePublicMenu = () => {
  const screens = useBreakpoint()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const selectedKey = `${location.pathname}${location.search}`
  const { translate } = useDictionaryTranslation()
  const menuItems = publicMenu.map(item => ({
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
      <Button icon={<MenuIcon size={18} />} onClick={() => setOpen(true)} />
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
