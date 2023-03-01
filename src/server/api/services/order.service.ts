import type { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const AddOrderSchema = z.object({
  channel_id: z.string(),
  menus: z.array(
    z.object({
      menu_id: z.number(),
      amount: z.number().positive(),
    })
  ),
});
export type AddOrderInput = z.TypeOf<typeof AddOrderSchema>;

export async function addOrder(prisma: PrismaClient, input: AddOrderInput) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
  const { channel_id, menus } = input;
  try {
    await prisma.$transaction([
      prisma.order.createMany({
        data: menus.map((menu) => ({
          channel_id,
          menu_id: menu.menu_id,
          order_amount: menu.amount,
          total_price: 0,
          process_type: "pending",
        })),
      }),
      prisma.cart.deleteMany({
        where: {
          channel_id,
        },
      }),
    ]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
