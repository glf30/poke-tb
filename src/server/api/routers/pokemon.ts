import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
  // Upgrade to private when auth is added
  getTeamPokemonById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      const pokemon = ctx.db.pokemon.findMany({
        where: {
          teamId: input,
        },
      });
      if (!pokemon) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return pokemon;
    }),

    pokemonCreate: publicProcedure
    .input(z.object({ 
      teamId: z.string(),  
      name:   z.string(),
      level: z.number(),
      ability: z.string(),
      item: z.string(),
      nature: z.string(),
      move1: z.string(),
      move2: z.string(),
      move3: z.string(),
      move4: z.string(),
      hp_EV: z.number(),
      atk_EV: z.number(),
      def_EV: z.number(),
      spatk_EV: z.number(),
      spdef_EV: z.number(),
      spe_EV: z.number(),
      hp_IV: z.number(),
      atk_IV: z.number(),
      def_IV: z.number(),
      spatk_IV: z.number(),
      spdef_IV: z.number(),
      spe_IV: z.number(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.pokemon.create({
        data: {
          ...input,
        },
      });
    }),
});
