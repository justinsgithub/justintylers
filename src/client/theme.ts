import { Roboto } from '@next/font/google'
import { createTheme, type ThemeOptions } from '@mui/material/styles'
import resolve_config from 'tailwindcss/resolveConfig'
import tailwind_config_file from 'tailwind.config.cjs'
import type { Config } from 'tailwindcss'

const tailwind_config: any = resolve_config(tailwind_config_file as Config)

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

const root_element = typeof window !== 'undefined' ? document.getElementById('__next') : undefined

const create_theme = (mode: 'light' | 'dark', opts: Partial<ThemeOptions>) => createTheme({
  ...opts,
  breakpoints: {
    values: {
      xs: 0,
      sm: tailwind_config.theme.screens.sm,
      md: tailwind_config.theme.screens.md,
      lg: tailwind_config.theme.screens.lg,
      xl: tailwind_config.theme.screens.xl,
      '2xl': tailwind_config.theme.screens['2xl']
    }
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: root_element
      }
    },
    MuiPopper: {
      defaultProps: {
        container: root_element
      }
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  palette: {
    background: {
      default: mode === 'light' ? '#fff' : tailwind_config.theme.colors.formal.DEFAULT,
      paper: mode === 'light' ? '#fff' : tailwind_config.theme.colors.formal.DEFAULT
    },
    primary: {
      main: tailwind_config.theme.colors.sky['500']
    },
    secondary: {
      main: tailwind_config.theme.colors.rose['400']
    },
    info: {
      main: tailwind_config.theme.colors.purple['600']
    },
    warning: {
      main: tailwind_config.theme.colors.orange['500']
    },
    error: {
      main: tailwind_config.theme.colors.red['600']
    },
    success: {
      main: tailwind_config.theme.colors.green['700']
    },
    mode
  },
})

export const light_theme = create_theme('light', {})

export const dark_theme = create_theme('dark', {})
