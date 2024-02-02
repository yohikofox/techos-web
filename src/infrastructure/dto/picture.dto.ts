import { z } from "zod";

export const pictureDataObjectSchema = z.object({
  id: z.coerce.number(),
  hash: z.string(),
  ext: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.any().nullable(),
  folderPath: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  mime: z.string(),
  formats: z.record(
    z.object({
      ext: z.string(),
      name: z.string(),
      url: z.string(),
      path: z.string().nullable(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      mime: z.string(),
      hash: z.string(),
    })
  ),
});

export const pictureDataSchema = pictureDataObjectSchema.strict();

export type PictureData = z.infer<typeof pictureDataSchema>;
