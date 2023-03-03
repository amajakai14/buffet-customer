import type { PrismaClient } from "@prisma/client";
import type { addOrderInput } from "../repository/order.repository";

export async function addOrderService(
  prisma: PrismaClient,
  input: addOrderInput
): Promise<boolean> {
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
