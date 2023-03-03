import { z } from "zod";
import * as channelRepository from "../repository/channel.repository";
import * as menuRepository from "../repository/menu.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const getMenuSchema = z.object({
  channel_id: z.string(),
});

export const menuRouter = createTRPCRouter({
  get: protectedProcedure.input(getMenuSchema).query(async ({ ctx, input }) => {
    const { channel_id } = input;

    const channel = await channelRepository.getChannel(ctx.prisma, channel_id);
    if (!channel) return null;

    const availableMenu = await menuRepository.getAvailableMenu(
      ctx.prisma,
      channel.course_id
    );

    return menuRepository.addImageUrl(availableMenu);
  }),
});
