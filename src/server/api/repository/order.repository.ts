import type { PrismaClient } from "@prisma/client";
import type z from "zod";
import type { AddOrderSchema } from "../routers/order";
import { addOrderService } from "../service/order.service";

export const addOrder: AddOrder = addOrderService;

interface AddOrder {
  (prisma: PrismaClient, input: addOrderInput): Promise<boolean>;
}

export type addOrderInput = z.TypeOf<typeof AddOrderSchema>;
