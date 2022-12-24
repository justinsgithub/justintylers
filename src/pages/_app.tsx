import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import theme from '@/utils/theme'
import createEmotionCache from '@/utils/createEmotionCache'
import { trpc } from '../utils/trpc'

/* import '../styles/globals.css' */

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface IAppType {
  session: Session | null
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType<IAppType> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props

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

export default trpc.withTRPC(MyApp)
