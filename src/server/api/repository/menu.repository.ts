import type { Menu, PrismaClient } from "@prisma/client";
import type { z } from "zod";
import type { getMenuSchema } from "../routers/menu";
import {
  addMenuImageURLService,
  getAvailableMenuService,
} from "../service/menu.service";

export const getAvailableMenu: GetAvailableMenu = getAvailableMenuService;

export const addImageUrl: AddImageUrl = addMenuImageURLService;

interface GetAvailableMenu {
  (prisma: PrismaClient, course_id: number): Promise<Menu[]>;
}

interface AddImageUrl {
  (menus: Menu[]): MenuWithUrl[];
}

export type getMenuInput = z.TypeOf<typeof getMenuSchema>;

export type MenuWithUrl = Menu & { url: string };
