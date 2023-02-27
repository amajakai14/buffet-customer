import type { Cart, PrismaClient } from "@prisma/client";
import { z } from "zod";

export const GetCartSchema = z.object({ channel_id: z.string() });
export type getCartInput = z.TypeOf<typeof GetCartSchema>;

export async function getCart(prisma: PrismaClient, input: getCartInput) {
  const { channel_id } = input;
  return mockCarts;
  const cart: Cart[] | undefined = await prisma.cart.findMany({
    where: {
      channel_id,
    },
  });
  return cart;
}

const mockCarts: Cart[] = [
  {
    id: 1,
    user_id: "1",
    channel_id: "1",
    menu_id: 1,
    amount: 1,
  },
  {
    id: 2,
    user_id: "1",
    channel_id: "1",
    menu_id: 2,
    amount: 1,
  },
  {
    id: 3,
    user_id: "2",
    channel_id: "1",
    menu_id: 1,
    amount: 1,
  },
  {
    id: 4,
    user_id: "3",
    channel_id: "1",
    menu_id: 1,
    amount: 1,
  },
  {
    id: 5,
    user_id: "5",
    channel_id: "1",
    menu_id: 1,
    amount: 1,
  },
  {
    id: 6,
    user_id: "1",
    channel_id: "1",
    menu_id: 3,
    amount: 1,
  },
  {
    id: 7,
    user_id: "1",
    channel_id: "1",
    menu_id: 4,
    amount: 1,
  },
  {
    id: 8,
    user_id: "1",
    channel_id: "1",
    menu_id: 5,
    amount: 1,
  },
  {
    id: 9,
    user_id: "1",
    channel_id: "1",
    menu_id: 6,
    amount: 1,
  },
  {
    id: 10,
    user_id: "1",
    channel_id: "1",
    menu_id: 7,
    amount: 1,
  },
  {
    id: 11,
    user_id: "1",
    channel_id: "1",
    menu_id: 8,
    amount: 1,
  },
  {
    id: 12,
    user_id: "1",
    channel_id: "1",
    menu_id: 9,
    amount: 1,
  },
];

export const AddToCartSchema = z.object({
  channel_id: z.string(),
  menu_id: z.number(),
  amount: z.number().positive(),
});
export type addToCartInput = z.TypeOf<typeof AddToCartSchema>;

export async function addMenu(
  user_id: string,
  prisma: PrismaClient,
  input: addToCartInput
) {
  const { channel_id, menu_id, amount } = input;
  const exist = await prisma.cart.findFirst({
    where: {
      channel_id,
      user_id,
      menu_id,
    },
  });
  if (!exist) {
    prisma.cart.create({
      data: {
        user_id,
        channel_id,
        menu_id,
        amount,
      },
    });
    return;
  }
  prisma.cart.update({
    where: {
      id: exist.id,
    },
    data: {
      amount: exist.amount + amount,
    },
  });
}

export const DeleteFromCartSchema = z.object({
  channel_id: z.string(),
  menu_id: z.number(),
});

export type deleteFromCartInput = z.TypeOf<typeof DeleteFromCartSchema>;

export async function deleteMenus(
  prisma: PrismaClient,
  input: deleteFromCartInput
) {
  const { channel_id, menu_id } = input;
  await prisma.cart.deleteMany({
    where: {
      channel_id,
      menu_id,
    },
  });
}

export const DeleteCartSchema = z.object({
  channel_id: z.string(),
});
export type deleteCartInput = z.TypeOf<typeof DeleteCartSchema>;

export async function deleteCart(prisma: PrismaClient, input: deleteCartInput) {
  const { channel_id } = input;
  await prisma.cart.deleteMany({
    where: {
      channel_id,
    },
  });
}
