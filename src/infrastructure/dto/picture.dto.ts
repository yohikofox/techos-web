import { z } from "zod";

export const pictureDataSchema = z.object({
  data: z.object({
    attributes: z.object({
      name: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      mime: z.string(),
      formats: z.record(z.object({
        ext: z.string(),
        name: z.string(),
        url: z.string(),
        width: z.number(),
        height: z.number(),
        size: z.number(),
        mime: z.string(),
      })).optional(),
    })
  })
}).strict();

export type PictureData = z.infer<typeof pictureDataSchema>;