import { z } from "zod";

import { setCookie } from "@/utils/set-cookie";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    setCookie(ctx.res, 'Justins Cookie!', 'api-middleware!', { path: '/', maxAge: 2592000 })
    console.log('GETALL COOKIES', ctx.req.cookies)
    return ctx.prisma.example.findMany();
  }),
});
