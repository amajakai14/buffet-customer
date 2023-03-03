import type { Menu, PrismaClient } from "@prisma/client";
import type { z } from "zod";
import type { getMenuSchema } from "../routers/menu";
import { getAvailableMenuService } from "../service/menu.service";

export const getAvailableMenu: GetAvailableMenu = getAvailableMenuService;

interface GetAvailableMenu {
  (prisma: PrismaClient, course_id: number): Promise<Menu[]>;
}

export type getMenuInput = z.TypeOf<typeof getMenuSchema>;
