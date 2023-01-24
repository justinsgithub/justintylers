import { z } from 'zod'

import { router, public_procedure } from '@/server/trpc'

export const writing_router = router({
  by_slug: public_procedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.writing.findFirst({
      where: { slug: input.slug },
      include: {
        likes: { where: { user_id: ctx.user_id }, select: { id: true, user_id: true } },
        _count: { select: { likes: true } }
      }
    })
  }),

  like: public_procedure.input(z.object({ writing_id: z.string(), action: z.enum(['create', 'delete']) })).mutation(async ({ ctx, input }) => {
    const isUser = ctx?.session?.user?.id
    if (input.action === 'create') {
      return ctx.prisma.like.create({
        data: {
          writing: { connect: { id: input.writing_id } },
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })
    } else {
      return ctx.prisma.like.delete({
        where: {
          content_id_user_id: {
            content_id: input.writing_id,
            user_id: ctx.user_id
          }
        }
      })
    }
  }),

  comment: public_procedure.input(z.object({ writing_id: z.string(), action: z.enum(['create', 'delete']) })).mutation(async ({ ctx, input }) => {
    const isUser = ctx?.session?.user?.id
    if (input.action === 'create') {
      return ctx.prisma.like.create({
        data: {
          writing: { connect: { id: input.writing_id } },
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })
    } else {
      return ctx.prisma.like.delete({
        where: {
          content_id_user_id: {
            content_id: input.writing_id,
            user_id: ctx.user_id
          }
        }
      })
    }
  }),
})
