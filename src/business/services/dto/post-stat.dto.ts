import { z } from "zod";

export const postStatDataSchema = z.object({
  data: z.object({
    attributes: z.object({
      view_count: z.number(),
    })
  }).optional().nullable()
}).strict();

export type PostStatData = z.infer<typeof postStatDataSchema>;