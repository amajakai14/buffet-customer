import type { Menu, PrismaClient } from "@prisma/client";
import { env } from "../../../env.mjs";
import { MenuWithUrl } from "../repository/menu.repository.js";

export async function getAvailableMenuService(
  prisma: PrismaClient,
  course_id: number
): Promise<Menu[]> {
  const courseOnMenu = await prisma.courseOnMenu.findMany({
    where: { course_id },
    select: {
      Menu: true,
    },
    orderBy: {
      menu_id: "asc",
    },
  });
  const menus: Menu[] = [];
  courseOnMenu.forEach((menu) => {
    menus.push(menu.Menu);
  });
  return menus;
}

export function addMenuImageURLService(menus: Menu[]): MenuWithUrl[] {
  return menus.map((menu) => {
    let url =
      env.CLOUDFRONT_URL + menu.corporation_id + "/" + menu.id.toString();
    if (!menu.hasImage) url = env.CLOUDFRONT_URL + "noimage.jpeg";
    return {
      ...menu,
      url,
    };
  });
}
