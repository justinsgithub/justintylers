import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import {theme} from '@/client/theme'
import {create_emotion_cache} from '@/client/create-emotion-cache'
import { api } from '@/client/api'


// Client-side cache, shared for the whole session of the user in the browser.
const client_side_emotion_cache = create_emotion_cache()

interface IAppType {
  session: Session | null
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType<IAppType> = (props: MyAppProps) => {
  const { Component, emotionCache = client_side_emotion_cache, pageProps: { session, ...pageProps } } = props

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
