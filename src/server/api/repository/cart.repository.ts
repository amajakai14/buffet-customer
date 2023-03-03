import type { Cart, PrismaClient } from "@prisma/client";
import type z from "zod";
import type {
  AddToCartSchema,
  DeleteCartSchema,
  DeleteFromCartSchema,
  GetCartSchema,
} from "../routers/cart";
import {
  addMenuService,
  deleteCartService,
  deleteMenusService,
  getCartService,
} from "../services/cart.service";

export const getCart: GetCart = getCartService;

export const deleteCart: DeleteCart = deleteCartService;

export const deleteMenus: DeleteMenus = deleteMenusService;

export const addMenu: AddMenu = addMenuService;

interface GetCart {
  (prisma: PrismaClient, input: getCartInput): Promise<Cart[]>;
}

interface DeleteCart {
  (prisma: PrismaClient, input: deleteCartInput): Promise<void>;
}

interface DeleteMenus {
  (prisma: PrismaClient, input: deleteFromCartInput): Promise<void>;
}

interface AddMenu {
  (prisma: PrismaClient, user_id: string, input: addToCartInput): Promise<Cart>;
}

export type getCartInput = z.TypeOf<typeof GetCartSchema>;

export type addToCartInput = z.TypeOf<typeof AddToCartSchema>;

export type deleteCartInput = z.TypeOf<typeof DeleteCartSchema>;

export type deleteFromCartInput = z.TypeOf<typeof DeleteFromCartSchema>;
