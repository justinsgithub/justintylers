import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import { set_cookie } from "@/utils/set-cookie";
import { Guest } from "@prisma/client";

export const user_router = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  get_guest: publicProcedure.mutation(({ ctx }) => {
    if (ctx.session?.user) {
      return ctx.session
    }
    const gsesh_id = ctx.req.cookies['gsesh']
    console.log('GSESH ID', gsesh_id)
    console.log(gsesh_id)

    if (!gsesh_id || gsesh_id === undefined) {
      const new_guest = ctx.prisma.guest.create({data: {name: 'New Guest'}}) as unknown as Guest
      console.log('NEW GUEST', new_guest)
      set_cookie(ctx.res, 'gsesh', new_guest.id, { path: '/', maxAge: 25920000 })
      return new_guest
    } 
    if (gsesh_id) {
      const guest = ctx.prisma.guest.findFirst({where: {id: gsesh_id}})
      return guest
    }
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

