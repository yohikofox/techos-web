import { z } from "zod";

export const pictureDataObjectSchema = z.object({
  name: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  alternativeText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  mime: z.string(),
  formats: z
    .record(
      z.object({
        ext: z.string(),
        name: z.string(),
        url: z.string(),
        width: z.number(),
        height: z.number(),
        size: z.number(),
        mime: z.string(),
      })
    )
    .optional(),
});

export const pictureDataSchema = pictureDataObjectSchema.strict();

export type PictureData = z.infer<typeof pictureDataSchema>;
