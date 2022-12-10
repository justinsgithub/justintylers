import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { user_router } from "./user";

export const appRouter = router({
  user: user_router,
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
