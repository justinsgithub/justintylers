import { Theme, ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    breakpoints: {
      values: {
        xs: any
        sm: any
        md: any
        lg: any
        xl: any
        '2xl': any
      }
    }
  }
}
