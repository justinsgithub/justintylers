import { router } from "../trpc"; import { authRouter } from "./auth";
import { user_router } from "./user";
import { writing_router } from "./writing";

export const appRouter = router({
  /* user: user_router, */
  auth: authRouter,
  user: user_router,
  writing: writing_router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
