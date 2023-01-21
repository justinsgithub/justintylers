import DiscordProvider from 'next-auth/providers/discord'
import type { GetServerSidePropsContext } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { unstable_getServerSession } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter' // Prisma adapter for NextAuth, optional and can be removed
import { env } from '@/env/server.mjs'
import { prisma } from '@/server/db'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    })
    // ...add more providers here
  ]
}

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: { req: GetServerSidePropsContext['req']; res: GetServerSidePropsContext['res'] }) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions)
}
