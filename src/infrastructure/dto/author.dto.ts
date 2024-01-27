import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";

export const authorDataSchema = z.object({
  data: z.object({
    attributes: z.object({
      username: z.string(),
      avatar: pictureDataSchema.nullable().optional()
    })
  })
})

export type AuthorData = z.infer<typeof authorDataSchema>