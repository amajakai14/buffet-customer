import type { Channel, PrismaClient } from "@prisma/client";
import { getChannelService } from "../service/channel.service";

export const getChannel: GetChannel = getChannelService;

interface GetChannel {
  (prisma: PrismaClient, channel_id: string): Promise<Channel | null>;
}
