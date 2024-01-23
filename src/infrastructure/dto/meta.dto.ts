import { z } from "zod";

export const metaDataSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    pageCount: z.number(),
    total: z.number(),
  })
})


export type MetaData = z.infer<typeof metaDataSchema>;