import { z } from "zod";
import { env } from "../../../env.mjs";
import * as channelRepository from "../repository/channel.repository";
import * as menuRepository from "../repository/menu.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const getMenuSchema = z.object({
  corporation_id: z.string(),
  channel_id: z.string(),
});

export const menuRouter = createTRPCRouter({
  get: protectedProcedure.input(getMenuSchema).query(async ({ ctx, input }) => {
    const { corporation_id, channel_id } = input;

    const channel = await channelRepository.getChannel(ctx.prisma, channel_id);
    if (!channel) return null;

    const availableMenu = await menuRepository.getAvailableMenu(
      ctx.prisma,
      channel.course_id
    );

    const transform = availableMenu.map((menu) => {
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
