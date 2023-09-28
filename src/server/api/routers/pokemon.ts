import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
  // Upgrade to private when auth is added
  getTeamPokemonById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.pokemon.findMany(
        {
            where: {
                teamId: input
            }
        }
      )
    }),
});
