import { z } from 'zod'

import { router, public_procedure } from '@/server/trpc'

export const writing_router = router({
  by_slug: public_procedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.writing.findFirst({
      where: { slug: input.slug },
      include: {
        writing_likes: { where: { user_id: ctx.user_id }, select: { id: true, user_id: true } },
        _count: { select: {writing_likes: true} }
      }
    })
  }),

  like: public_procedure.input(z.object({ writing_id: z.string() })).mutation(async ({ ctx, input }) => {
    const isUser = ctx.session?.user?.id
    return ctx.prisma.writingLike.create({
      data: {
        writing: { connect: { id: input.writing_id } },
        user: isUser ? { connect: { id: isUser } } : undefined,
        guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
      }
    })
  }),

  unlike: public_procedure.input(z.object({writing_id: z.string()})).mutation(async ({ ctx, input }) => {
    return ctx.prisma.writingLike.delete({
      where: {
        writing_id_user_id: {
          writing_id: input.writing_id,
          user_id: ctx.user_id
        }
      }
    })
  }),

  get_all: public_procedure.query(({ ctx }) => {
    return ctx.prisma.writing.findMany()
  }),

  hello: public_procedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? 'world'}`
    }
  })
})
