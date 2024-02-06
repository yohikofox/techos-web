import { z } from "zod";

import { metaDataSchema } from "./meta.dto";
import { pictureDataSchema } from "./picture.dto";
import { tagDataSchema } from "./tag.dto";

const microPostSchema = z
  .object({
    id: z.coerce.number(),
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    picture: pictureDataSchema.optional(),
    tags: z
      .object({
        items: z.array(tagDataSchema),
      })
      .optional(),
  })
  .strict();

export const microPostDataSchema = microPostSchema;

export type MicroPostData = z.infer<typeof microPostDataSchema>;

export const microPostListDataSchema = z.object({
  microPosts: z.object({
    items: z.array(microPostDataSchema),
    meta: metaDataSchema,
  }),
});

export const microPostDetailResponseSchema = z.object({
  microPosts: z.object({
    items: z.array(microPostDataSchema),
  }),
});

export type MicroPostListData = z.infer<typeof microPostListDataSchema>;
