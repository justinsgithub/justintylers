/* import { z } from 'zod' */
import { router, public_procedure } from '@/server/trpc'

export const user_router = router({
  get_user_id: public_procedure.query(({ ctx }) => {
    return ctx.user_id
  }),
  /* hello: public_procedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => { */
  /*   return { */
  /*     greeting: `Hello ${input?.text ?? 'world'}` */
  /*   } */
  /* }), */
  /* get_all: public_procedure.query(({ ctx }) => { */
  /*   return ctx.prisma.user.findMany() */
  /* }) */
})
