import { z } from "zod";

export const pictureDataSchema = z.object({
  data: z.object({
    attributes: z.object({
      url: z.string(),
      width: z.number(),
      height: z.number()
    })
  })
}).strict();

export type PictureData = z.infer<typeof pictureDataSchema>;