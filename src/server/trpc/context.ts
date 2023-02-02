import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type Session } from 'next-auth'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { deleteCookie, setCookie } from 'cookies-next'

type CreateContextOptions = {
  session: Session | null
}

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma
  }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  const gid = req.cookies['g']

  console.log('GID', gid)

  let user_id: string
  let username: string

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res })

  if (session?.user?.id) {
    user_id = session.user.id
    if (gid) {
      deleteCookie('g', {req, res})
      try {
        // TODO: need to change this to use prisma CONNECT api transfer guest content to user content 
        const guest = await prisma.guest.delete({ where: { id: gid }, include: { comments: true, deleted_comments: true, likes: true } })
        const likes = guest.likes.length > 0 ? { create: guest.likes } : undefined
        const comments = guest.comments.length > 0 ? { create: guest.comments } : undefined
        const deleted_comments = guest.deleted_comments.length > 0 ? { create: guest.deleted_comments } : undefined
        await prisma.user.update({ where: { id: session.user.id }, data: { likes, comments, deleted_comments } })
      } catch (error) {
        console.log(error)
      }
    }

    if (session?.user?.name) {
      username = session?.user?.name
    } else {
      username = `User ${session.user.id.slice(session.user.id.length - 5)}`
    }
  } else {
    if (gid) {
      user_id = gid
      username = `Guest ${gid.slice(gid.length - 5)}`
    } else {
      const new_guest = await prisma.guest.create({ data: {} })
      user_id = new_guest.id
      username = `Guest ${new_guest.id.slice(new_guest.id.length - 5)}`
      setCookie('g', user_id, { req, res, maxAge: 3600 * 24 * 365 })
    }
  }

  const inner_context = await createContextInner({ session })

  // make request and response available to procedures for setting cookies and such
  return { ...inner_context, req, res, user_id, username }
}

export type Context = inferAsyncReturnType<typeof createContext>
