import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
/* import { CacheProvider, type EmotionCache } from '@emotion/react' */
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
/* import {theme} from '@/client/theme' */
import '@/styles/globals.css'
/* import {create_emotion_cache} from '@/client/create-emotion-cache' */
import { api } from '@/client/api'

// Client-side cache, shared for the whole session of the user in the browser.
/* const client_side_emotion_cache = create_emotion_cache() */

const rootElement = typeof document !== 'undefined' ? document.getElementById('__next') : undefined

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    }
  }
})

interface IAppType {
  session: Session | null
}

/* interface MyAppProps extends AppProps { */
/*   emotionCache?: EmotionCache */
/* } */

const MyApp: AppType<IAppType> = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps }
  } = props

  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Head>
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
