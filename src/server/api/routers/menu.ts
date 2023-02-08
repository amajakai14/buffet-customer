import { env } from "../../../env/server.mjs";
import { getMenuSchema } from "../../../schema/menu.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const menuRouter = createTRPCRouter({
  get: protectedProcedure.input(getMenuSchema).query(async ({ ctx, input }) => {
    const { corporation_id, channel_id } = input;
    const channel = await ctx.prisma.channel.findFirst({
      where: { id: channel_id },
    });
    if (!channel) return null;
    const course = await ctx.prisma.course.findFirst({
      where: { course_name: channel.course_name },
    });
    if (!course) return null;

    const x = await ctx.prisma.menu.findMany({
      where: { corporation_id },
      include: {
        CourseOnMenu: {
          where: { course_id: course.id },
          select: {
            menu_id: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    console.log("all menus", x);
    //fileter x that doesn't have menu_id in course_on_menu
    const menus = x.filter((menu) => {
      return menu.CourseOnMenu.length > 0;
    });

    const transform = menus.map((menu) => {
      let url = env.CLOUDFRONT_URL + corporation_id + "/" + menu.id.toString();
      if (!menu.hasImage) url = env.CLOUDFRONT_URL + "noimage.jpeg";
      return {
        ...menu,
        url,
      };
    });
    return transform;
  }),
});
