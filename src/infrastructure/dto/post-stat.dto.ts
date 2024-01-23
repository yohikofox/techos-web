import { z } from "zod";

export const postStatDataSchema = z.object({
  id: z.string(),
  attributes: z.object({
    view_count: z.number(),
  })
}).strict().optional().nullable()


export const postStatDataResponseSchema = z.object({
  postStatLists: z.object({
    data: z.array(postStatDataSchema),
  })
})

export type PostStatData = z.infer<typeof postStatDataSchema>;

export type PostStatDataResponse = z.infer<typeof postStatDataResponseSchema>;