import { z } from "zod";

export const tagDataSchema = z.object({
  attributes: z.object({})
}).strict();

export type TagData = z.infer<typeof tagDataSchema>;