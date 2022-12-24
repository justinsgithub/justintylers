import { FC, ReactNode, useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import {Link} from '@/components/link'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

interface ILayoutProps {
    children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const drawer_items = [
        { text: 'Daily Workout', href: '/daily-workout', icon: <FitnessCenterIcon />},
        { text: 'Tip of the day', href: '/tip-of-the-day', icon: <TipsAndUpdatesIcon />},
        { text: 'About the creator', href: '/about-the-creator', icon: <InsertEmoticonIcon /> }
    ]

    return (
        <div>
            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role='presentation'>
                    <List>
                        {drawer_items.map((item) => (
                            <Link href={item.href} underline='none'>
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
                    <Toolbar>
                        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                            <MenuIcon onClick={() => setDrawerOpen(true)} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <main>{children}</main>
        </div>
    )
}
