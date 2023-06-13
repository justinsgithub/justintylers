// prettier-ignore
import { type FC, type ReactNode, useState } from 'react'
/* import { AppBar, Menu, MenuItem, Toolbar, Tooltip, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Divider, useScrollTrigger } from '@mui/material' */
import { AppBar, Toolbar, Tooltip, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useScrollTrigger } from '@mui/material'
import { Link } from '@/components/shared/link'
/* import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, AccountCircle, Home, Logout, Medication, Menu as MenuIcon, PersonAdd, Settings } from '@mui/icons-material' */
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Home, Medication, Menu as MenuIcon } from '@mui/icons-material'
import { useColorMode } from '@/components/context'

interface ILayoutProps {
  children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const colorMode = useColorMode()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const trigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 200
  })
  /**/
  /* const handleMenu = (event: React.MouseEvent<HTMLElement>) => { */
  /*   setAnchorEl(event.currentTarget) */
  /* } */

  const handleClose = () => {
    setAnchorEl(null)
  }

  trigger && anchorEl && handleClose()

  const drawer_items = [
    { text: 'Home', href: '/', icon: <Home /> },
    { text: 'Recovery Writings', href: '/writings', icon: <Medication /> }
  ]

  return (
    <div>
      <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={250} height='100%' bgcolor='background.paper' role='presentation'>
          <List>
            {drawer_items.map((item) => (
              <Link key={item.href} href={item.href} underline='none'>
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1 }} bgcolor='primary'>
        <AppBar position='sticky'>
          <Toolbar variant='dense' className='flex justify-between dark:bg-formal'>
            <div>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </div>
            <div className='flex gap-3'>
              <div>
                <Tooltip title='Change Theme'>
                  <IconButton size='large' edge='end' color='inherit' onClick={() => colorMode.toggle_color_mode()}>
                    {colorMode.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
              </div>
              {/* <div> */}
              {/*   <Tooltip title='Account'> */}
              {/*     <IconButton */}
              {/*       size='large' */}
              {/*       edge='end' */}
              {/*       color='inherit' */}
              {/*       aria-label='user account' */}
              {/*       aria-controls='menu-appbar' */}
              {/*       aria-haspopup='true' */}
              {/*       onClick={handleMenu} */}
              {/*     > */}
              {/*       <AccountCircle /> */}
              {/*     </IconButton> */}
              {/*   </Tooltip> */}
              {/* </div> */}
              {/* <Menu id='menu-appbar' anchorEl={anchorEl} keepMounted={false} open={Boolean(anchorEl)} onClose={handleClose} PaperProps={{ elevation: 0, sx: { mt: 2, ml: -2, borderRadius: 5, filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 } } }} > */}
              {/*   <MenuItem onClick={handleClose}> */}
              {/*     <Avatar /> Profile */}
              {/*   </MenuItem> */}
              {/*   <MenuItem onClick={handleClose}> */}
              {/*     <Avatar /> My account */}
              {/*   </MenuItem> */}
              {/*   <Divider /> */}
              {/*   <MenuItem onClick={handleClose}> */}
              {/*     <ListItemIcon> */}
              {/*       <PersonAdd fontSize='small' /> */}
              {/*     </ListItemIcon> */}
              {/*     Add another account */}
              {/*   </MenuItem> */}
              {/*   <MenuItem onClick={handleClose}> */}
              {/*     <ListItemIcon> */}
              {/*       <Settings fontSize='small' /> */}
              {/*     </ListItemIcon> */}
              {/*     Settings */}
              {/*   </MenuItem> */}
              {/*   <MenuItem onClick={handleClose}> */}
              {/*     <ListItemIcon> */}
              {/*       <Logout fontSize='small' /> */}
              {/*     </ListItemIcon> */}
              {/*     Logout */}
              {/*   </MenuItem> */}
              {/* </Menu> */}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <main>{children}</main>
    </div>
  )
}
