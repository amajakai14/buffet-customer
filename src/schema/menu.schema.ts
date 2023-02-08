import z from "zod";

export const getMenuSchema = z.object({
  corporation_id: z.string(),
  channel_id: z.string(),
});

export type getMenuInput = z.TypeOf<typeof getMenuSchema>;
