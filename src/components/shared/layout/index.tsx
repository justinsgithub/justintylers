import { FC, ReactNode, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import {Link} from '@/components/shared/link'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Home, Medication } from '@mui/icons-material'

interface ILayoutProps {
    children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const drawer_items = [
        { text: 'Home', href: '/', icon: <Home />},
        { text: 'Recovery Writings', href: '/writings', icon: <Medication />},
    ]

    return (
        <div>
            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role='presentation'>
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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar variant='dense'>
                        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)} >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <main>{children}</main>
        </div>
    )
}
