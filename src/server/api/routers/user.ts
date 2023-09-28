import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // Upgrade to private when auth is added
  getUser: publicProcedure.query(({ ctx }) => {
      return ctx.db.user.findUnique
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
      where: {
        userId: input,
      },
    });
  }),

});
