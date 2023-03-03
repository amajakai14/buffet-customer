import { TRPCError } from "@trpc/server";
import z from "zod";
import * as repository from "../repository/order.repository";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "./../trpc";

export const AddOrderSchema = z.object({
  channel_id: z.string(),
  menus: z.array(
    z.object({
      menu_id: z.number(),
      amount: z.number().positive(),
    })
  ),
});

export const orderRouter = createTRPCRouter({
  add: publicProcedure
    .input(AddOrderSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await repository.addOrder(ctx.prisma, input);
      if (!result) {
        throw new TRPCError({
          message: "Failed to add order",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
