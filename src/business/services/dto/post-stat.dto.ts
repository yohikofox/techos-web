import { z } from "zod";

export const postStatDataSchema = z.object({
  data: z.object({
    attributes: z.object({
      view_count: z.number(),
    })
  }).optional().nullable()
}).strict();


export const postStatDataResponseSchema = z.object({
  postStatLists: z.object({
    data: z.array(postStatDataSchema),
  })
})

export type PostStatData = z.infer<typeof postStatDataSchema>;

export type PostStatDataResponse = z.infer<typeof postStatDataResponseSchema>;