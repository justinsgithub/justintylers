/* import { router, public_procedure, protected_procedure } from "@/server/trpc"; */
import { router, protected_procedure } from "@/server/trpc";

export const authRouter = router({
  getSession: protected_procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protected_procedure.query(() => {
    return "you can now see this secret message!";
  }),
});
