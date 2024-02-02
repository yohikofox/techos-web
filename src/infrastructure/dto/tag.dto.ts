import { z } from "zod";

import { heroDataSchema } from "./hero.dto";

export const tagDataSchema = z
  .object({
    id: z.number(),
    label: z.string(),
    slug: z.string(),
    background_color: z.string(),
    color: z.string(),
    hero: heroDataSchema.optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
  })
  .strict();

export const tagInfosResponseSchema = z.object({
  tags: z.object({
    data: z.array(tagDataSchema),
  }),
});

export const tagDetailsSchema = z.object({});

export type TagDetails = z.infer<typeof tagDetailsSchema>;

export type TagData = z.infer<typeof tagDataSchema>;

export type TagInfosResponse = z.infer<typeof tagInfosResponseSchema>;
