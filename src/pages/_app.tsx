import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme'

import { trpc } from '../utils/trpc'

import '../styles/globals.css'

interface IAppType {
  session: Session | null
}

const MyApp: AppType<IAppType> = (props) => {

  const { Component, pageProps: { session, ...pageProps } } = props

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
