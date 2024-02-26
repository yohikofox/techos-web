import { z } from "zod";

import { authorDataSchema } from "./author.dto";
import { metaDataSchema } from "./meta.dto";
import { pictureDataSchema } from "./picture.dto";
import { postStatDataSchema } from "./post-stat.dto";
import { tagDataSchema } from "./tag.dto";

export const postDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  extract: z.string().optional().nullable(),
  start_at: z.string(),
  end_at: z.string().optional().nullable(),
  level: z.string().optional().nullable(),
  author: authorDataSchema,
  picture: pictureDataSchema.optional(),
  tags: z.object({
    items: z.array(tagDataSchema).optional(),
  }),
  post_stat_list: postStatDataSchema.optional(),
});
export type PostData = z.infer<typeof postDataSchema>;

export const postDetailsResponseSchema = z.object({
  posts: z.object({
    items: z.array(postDataSchema).length(1),
  }),
});

export const postListResponseSchema = z.object({
  posts: z.object({
    items: z.array(postDataSchema),
    meta: metaDataSchema,
  }),
});

export type PostListResponse = z.infer<typeof postListResponseSchema>;

export type PostDetailsResponse = z.infer<typeof postDetailsResponseSchema>;
