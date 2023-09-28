import { exampleRouter } from "~/server/api/routers/example";
import { teamsRouter } from "~/server/api/routers/teams";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { pokemonRouter } from "./routers/pokemon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  pokemon: pokemonRouter,
  teams: teamsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
