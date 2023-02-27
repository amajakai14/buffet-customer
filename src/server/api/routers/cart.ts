import z from "zod";
import {
  addMenu,
  AddToCartSchema,
  deleteCart,
  DeleteFromCartSchema,
  deleteMenus,
  getCart,
  GetCartSchema,
} from "../services/cart.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { publicProcedure } from "./../trpc";

export const cartRouter = createTRPCRouter({
  getCart: publicProcedure
    .input(GetCartSchema)
    .query(async ({ ctx, input }) => {
      const result = await getCart(ctx.prisma, input);
      return {
        result,
      };
    }),

  addMenu: protectedProcedure
    .input(AddToCartSchema)
    .mutation(async ({ ctx, input }) => {
      addMenu(ctx.session.user.id, ctx.prisma, input);
    }),

  deleteMenu: protectedProcedure
    .input(DeleteFromCartSchema)
    .mutation(async ({ ctx, input }) => {
      await deleteMenus(ctx.prisma, input);
    }),

  deleteCart: protectedProcedure
    .input(z.object({ channel_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await deleteCart(ctx.prisma, input);
    }),
});
