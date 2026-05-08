import { Button, Drawer, Grid, Menu } from 'antd'
import { Menu as MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { publicMenu } from '../../constants/menu'

const { useBreakpoint } = Grid

const menuItems = publicMenu.map(item => ({
  key: item.path,
  label: <Link to={item.path}>{item.label}</Link>
}))

const ResponsivePublicMenu = () => {
  const screens = useBreakpoint()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  if (screens.md) {
    return <Menu mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} style={{ minWidth: 320, borderBottom: 0 }} />
  }

  return (
    <>
      <Button icon={<MenuIcon size={18} />} onClick={() => setOpen(true)} />
      <Drawer title="Menú" open={open} onClose={() => setOpen(false)} placement="left">
        <Menu mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={() => setOpen(false)} />
      </Drawer>
    </>
  )
}

export default ResponsivePublicMenu
