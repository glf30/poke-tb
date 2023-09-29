import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  // Upgrade to private when auth is added
  

  getUserTeamById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.team.findFirst(
        {
            where: {
                teamId: input
            }
        }
      )
    }),

  getUserTeamsById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.team.findMany(
        {
            where: {
                userId: input
            },
            orderBy: {
               createdAt: 'desc'
            }
        }
      )
    }),
});
