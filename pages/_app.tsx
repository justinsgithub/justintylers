import Head from 'next/head'
import type { AppProps, AppType } from 'next/app'
import type { Session } from 'next-auth'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import { api } from '@/client/api'
import { useEffect, useState } from 'react'
import { ColorModeContext } from '@/components/context'
import { light_theme, dark_theme } from '@/client/theme'

interface IApp {
  session: Session | null
}

const App: AppType<IApp> = (props: AppProps) => {
  // prettier-ignore
  const { Component, pageProps: { session, ...pageProps } } = props
  const [mode, setMode] = useState<'light' | 'dark'>()
  const [theme, setTheme] = useState(() => (mode === 'dark' ? dark_theme : light_theme))

  const toggle_color_mode = () => {
    setMode((prev_mode) => {
      const set_this = prev_mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('mode', set_this)
      return set_this
    })
  }

  useEffect(() => {
    if (!mode) {
      let stored_mode = localStorage.getItem('mode') as 'light' | 'dark' | undefined
      if (!stored_mode) {
        stored_mode = 'dark'
        localStorage.setItem('mode', 'dark')
        setMode('dark')
      } else {
        setMode(stored_mode)
      }
    }
    if (mode) {
      mode === 'light' ? setTheme(light_theme) : setTheme(dark_theme)
      if (mode === 'light') {
        setTheme(light_theme)
      } else {
        setTheme(dark_theme)
      }
    }
  }, [mode])

  if (!mode) return null

  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ColorModeContext.Provider value={{ toggle_color_mode, mode }}>
          <MuiThemeProvider theme={theme}>
            <Head>
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <CssBaseline />
            <div className={mode}>
              <Component {...pageProps} />
            </div>
          </MuiThemeProvider>
        </ColorModeContext.Provider>
      </StyledEngineProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
