import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const writing_include = { writing_likes: { select: { id: true, user_id: true } } }

export const writing_router = router({
    by_slug: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
        const is_writing = ctx.prisma.writing.findFirst({
            where: { slug: input.slug },
            include: writing_include
        })
        if (is_writing) return is_writing
        return ctx.prisma.writing.create({ data: { slug: input.slug }, include: writing_include })
    }),
    like: publicProcedure.input(z.object({ writing_id: z.string(), user_id: z.string() })).mutation(async ({ ctx, input }) => {
        const isUser = ctx.session?.user?.id
        return ctx.prisma.writingLike.create({
            data: {
                writing: { connect: { id: input.writing_id } },
                user: isUser ? { connect: { id: isUser } } : undefined,
                guest: !isUser ? { connect: { id: input.user_id } } : undefined
            }
        })
    }),
    unlike: publicProcedure.input(z.object({ writing_id: z.string(), user_id: z.string() })).mutation(async ({ ctx, input }) => {
        const isUser = ctx.session?.user?.id
        return ctx.prisma.writingLike.delete({
            where: {
                writing_id_user_id: {
                    writing_id: input.writing_id,
                    user_id: isUser ? isUser : input.user_id
                }
            }
        })
    }),
    get_all: publicProcedure.query(({ ctx }) => ctx.prisma.writing.findMany()),
    hello: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
        return {
            greeting: `Hello ${input?.text ?? 'world'}`
        }
    })
})
