import { router } from "../trpc"; import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { user_router } from "./user";
import { writing_router } from "./writing";

export const appRouter = router({
  /* user: user_router, */
  auth: authRouter,
  example: exampleRouter,
  writing: writing_router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
