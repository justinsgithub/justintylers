import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const writing_router = router({
  by_slug: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.writing.findFirst({where: { slug: input.slug }});
  }),
  get_all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.writing.findMany();
  }),
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
  }),
});

