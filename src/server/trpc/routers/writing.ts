import { z } from 'zod'

import { router, public_procedure } from '@/server/trpc'

const action = z.enum(['create', 'delete']) 

const pp_input = (shape: z.ZodRawShape) => {
  return public_procedure.input(z.object(shape))
}

export const writing_router = router({

  by_slug: pp_input({ slug: z.string() }).query(async ({ ctx, input }) => {
    const writing = await ctx.prisma.writing.findFirst({
      where: { slug: input.slug },
      include: {
        likes: { where: { user_id: ctx.user_id }, select: { id: true, user_id: true } },
        comments: { select: { id: true, user_id: true, body: true, created_at: true, replies: true, likes: true } },
        _count: { select: { likes: true } }
      }
    })
    const user_comment = writing?.comments?.find((comment) => comment.user_id === ctx.user_id)
    return { user_comment, writing, user_id: ctx.user_id, username: ctx.username }
  }),

  like: pp_input({ writing_id: z.string(), action}).mutation(async ({ ctx, input }) => {
    const isUser = ctx?.session?.user?.id
    if (input.action === 'create') {
      return await ctx.prisma.like.create({
        data: {
          writing: { connect: { id: input.writing_id } },
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })
    }
    return await ctx.prisma.like.delete({
      where: {
        content_id_user_id: {
          content_id: input.writing_id,
          user_id: ctx.user_id
        }
      }
    })
  }),

  like_comment: pp_input({ comment_id: z.string(), action }).mutation(async ({ ctx, input }) => {
      const isUser = ctx?.session?.user?.id
      if (input.action === 'create') {
        return await ctx.prisma.like.create({
          data: {
            comment: { connect: { id: input.comment_id } },
            user: isUser ? { connect: { id: isUser } } : undefined,
            guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
          }
        })
      }
      return await ctx.prisma.like.delete({
        where: {
          content_id_user_id: {
            content_id: input.comment_id,
            user_id: ctx.user_id
          }
        }
      })
    }),

  comment: pp_input({ writing_id: z.string(), body: z.string().min(5).nullish() }).mutation(async ({ ctx, input }) => {
    const isUser = ctx?.session?.user?.id

    if (input.body) {
      return await ctx.prisma.comment.create({
        data: {
          body: input.body,
          writing: { connect: { id: input.writing_id } },
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })
    }

    return await ctx.prisma.comment.delete({
      where: {
        writing_id_user_id: {
          writing_id: input.writing_id,
          user_id: ctx.user_id
        }
      }
    })
  }),

  reply: pp_input({ comment_id: z.string(), parent_id: z.string().nullish(), body: z.string().min(5).nullish() }).mutation(async ({ ctx, input }) => {
    const isUser = ctx?.session?.user?.id

    if (input.body) {
      return await ctx.prisma.reply.create({
        data: {
          body: input.body,
          comment: { connect: { id: input.comment_id } },
          parent: input.parent_id ? { connect: { id: input.parent_id } } : undefined,
          user: isUser ? { connect: { id: isUser } } : undefined,
          guest: !isUser ? { connect: { id: ctx.user_id } } : undefined
        }
      })
    }

    return await ctx.prisma.reply.delete({
      where: {
        parent_id_user_id: {
          parent_id: input.parent_id,
          user_id: ctx.user_id
        }
      }
    })
  })
  
})
