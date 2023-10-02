import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique;
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const user = ctx.db.user.findFirst({
      where: {
        userId: input,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }

    return user;

  }),

  // ...
  // userCreate: publicProcedure
  //   .input(z.object({ userId: z.string(), username: z.string()}))
  //   .mutation(async (opts) => {
  //     const { input, ctx } = opts;

  //     // Create a new user in the database
  //     const user = await ctx.db.user.create({...input, teams: Team[]})
  //     return user;
  //   }),
  userCreate: publicProcedure
    .input(z.object({ userId: z.string(), username: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          ...input,
        },
      });
    }),
});
