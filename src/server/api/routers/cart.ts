import z from "zod";
import * as repository from "../repository/cart.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { publicProcedure } from "./../trpc";
export const GetCartSchema = z.object({ channel_id: z.string() });

export const AddToCartSchema = z.object({
  channel_id: z.string(),
  menu_id: z.number(),
  amount: z.number().positive(),
});

export const DeleteCartSchema = z.object({
  channel_id: z.string(),
});

export const DeleteFromCartSchema = z.object({
  channel_id: z.string(),
  menu_id: z.number(),
});

export const cartRouter = createTRPCRouter({
  getCart: publicProcedure
    .input(GetCartSchema)
    .query(async ({ ctx, input }) => {
      const result = await repository.getCart(ctx.prisma, input);
      return {
        result,
      };
    }),

  addMenu: protectedProcedure
    .input(AddToCartSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await repository.addMenu(
        ctx.prisma,
        ctx.session.user.id,
        input
      );
      return {
        result,
      };
    }),

  deleteMenu: protectedProcedure
    .input(DeleteFromCartSchema)
    .mutation(async ({ ctx, input }) => {
      await repository.deleteMenus(ctx.prisma, input);
    }),

  deleteCart: protectedProcedure
    .input(z.object({ channel_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await repository.deleteCart(ctx.prisma, input);
    }),
});
