import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  // Upgrade to private when auth is added
  

  getUserTeamById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      const team = ctx.db.team.findFirst(
        {
            where: {
                teamId: input
            }
        }
      )

      
      if (!team) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Team not found",
        });
      }

      return team;

    }),

  getUserTeamsById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      const teams = ctx.db.team.findMany(
        {
            where: {
                userId: input
            },
            orderBy: {
               createdAt: 'desc'
            }
        }
      )

      if (!teams) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Teams not found",
        });
      }

      return teams;
    }),

    teamCreate: publicProcedure
    .input(z.object({ teamName: z.string(), userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.team.create({
        data: {
          ...input,
        },
      });
    }),

    deleteTeam: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.delete({
        where: {
          teamId: input
        },
      });

      return team;
    }),
});
