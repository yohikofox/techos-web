import { z } from "zod";

import { trainingDataSchema } from "./training.dto";

export const headerSchema = z.object({
  placeholder: z.string(),
  search_title: z.string(),
})

export const headerDataSchema = z.object({
  header: z.object({
    data: z.object({
      attributes: headerSchema
    })
  }),
  trainings: z.object({
    data: z.array(trainingDataSchema)
  }).optional().nullable()
});

export type HeaderResponseData = z.infer<typeof headerDataSchema>
export type HeaderData = z.infer<typeof headerSchema>