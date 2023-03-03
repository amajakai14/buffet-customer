import type { Channel, PrismaClient } from "@prisma/client";

export async function getChannelService(
  prisma: PrismaClient,
  channel_id: string
): Promise<Channel | null> {
  const channel = await prisma.channel.findFirst({
    where: { id: channel_id },
  });
  return channel;
}
