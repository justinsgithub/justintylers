import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const user_router = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  create_guest: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

