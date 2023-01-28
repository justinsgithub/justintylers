import { z } from 'zod'

import { router, public_procedure } from '@/server/trpc'

export const writing_router = router({
  by_slug: public_procedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const writing = await ctx.prisma.writing.findFirst({
      where: { slug: input.slug },
      include: {
        likes: { where: { user_id: ctx.user_id }, select: { id: true, user_id: true } },
        comments: { select: { id: true, user_id: true, body: true, created_at: true } },
        _count: { select: { likes: true } }
      }
    })
    const user_comment = writing?.comments?.find((comment) => comment.user_id === ctx.user_id)
    return { user_comment, writing }
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
    }
    return ctx.prisma.like.delete({
      where: {
        content_id_user_id: {
          content_id: input.writing_id,
          user_id: ctx.user_id
        }
      }
    })
  }),

  comment: public_procedure
    .input(z.object({ content_type: z.enum(['writing', 'comment']), content_id: z.string(), body: z.string().min(5) }))
    .mutation(async ({ ctx, input }) => {
      const isUser = ctx?.session?.user?.id
      if (input.body !== 'delete_comment') {
        return ctx.prisma.comment.create({
          data: {
            body: input.body,
            writing: input.content_type === 'writing' ? { connect: { id: input.content_id } } : undefined,
            parent: input.content_type === 'comment' ? { connect: { id: input.content_id } } : undefined,
            user: isUser ? { connect: { id: isUser } } : undefined,
            guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
          }
        })
      }

      const deleted_comment = await ctx.prisma.comment.delete({
        where: {
          content_id_user_id: {
            content_id: input.content_id,
            user_id: ctx.user_id
          }
        }
      })

      await ctx.prisma.deletedComment.create({
        data: {
          created_at: deleted_comment.created_at,
          body: deleted_comment.body,
          writing: input.content_type === 'writing' ? { connect: { id: input.content_id } } : undefined,
          parent: input.content_type === 'comment' ? { connect: { id: input.content_id } } : undefined,
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })

      return deleted_comment
    })
})
