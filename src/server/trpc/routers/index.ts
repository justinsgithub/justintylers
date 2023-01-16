import { router } from '@/server/trpc'
import { authRouter } from '@/server/trpc/routers/auth'
import { user_router } from '@/server/trpc/routers/user'
import { writing_router } from '@/server/trpc/routers/writing'

export const appRouter = router({
  auth: authRouter,
  user: user_router,
  writing: writing_router
})

// export type definition of API
export type AppRouter = typeof appRouter

