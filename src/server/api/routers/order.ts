import { TRPCError } from "@trpc/server";
import { createTRPCRouter } from "../trpc";
import { addOrder, AddOrderSchema } from "./../services/order.service";
import { publicProcedure } from "./../trpc";

export const orderRouter = createTRPCRouter({
  add: publicProcedure
    .input(AddOrderSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await addOrder(ctx.prisma, input);
      if (!result) {
        throw new TRPCError({
          message: "Failed to add order",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
