import type { Cart, PrismaClient } from "@prisma/client";
import type {
  addToCartInput,
  deleteCartInput,
  deleteFromCartInput,
  getCartInput,
} from "../repository/cart.repository";

export async function getCartService(
  prisma: PrismaClient,
  input: getCartInput
): Promise<Cart[]> {
  const { channel_id } = input;
  const cart = await prisma.cart.findMany({
    where: {
      channel_id,
    },
  });
  return cart;
}

export async function addMenuService(
  prisma: PrismaClient,
  user_id: string,
  input: addToCartInput
): Promise<Cart> {
  const { channel_id, menu_id, amount } = input;
  const exist = await prisma.cart.findFirst({
    where: {
      channel_id,
      user_id,
      menu_id,
    },
  });
  if (!exist) {
    const menu = await prisma.cart.create({
      data: {
        user_id,
        channel_id,
        menu_id,
        amount,
      },
    });
    return menu;
  }
  const menu = await prisma.cart.update({
    where: {
      id: exist.id,
    },
    data: {
      amount: exist.amount + amount,
    },
  });
  return menu;
}

export async function deleteMenusService(
  prisma: PrismaClient,
  input: deleteFromCartInput
): Promise<void> {
  const { channel_id, menu_id } = input;
  await prisma.cart.deleteMany({
    where: {
      channel_id,
      menu_id,
    },
  });
}

export async function deleteCartService(
  prisma: PrismaClient,
  input: deleteCartInput
): Promise<void> {
  const { channel_id } = input;
  await prisma.cart.deleteMany({
    where: {
      channel_id,
    },
  });
}
