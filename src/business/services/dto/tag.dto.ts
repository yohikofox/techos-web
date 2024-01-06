import { z } from "zod";

export const tagDataSchema = z.object({
  attributes: z.object({
    label: z.string(),
    slug: z.string(),
    background_color: z.string(),
    color: z.string()
  })
}).strict();

export type TagData = z.infer<typeof tagDataSchema>;