import { z } from "zod";

import { authorDataSchema } from "./author.dto";
import { metaDataSchema } from "./meta.dto";
import { pictureDataSchema } from "./picture.dto";
import { postStatDataSchema } from "./post-stat.dto";
import { tagDataSchema } from "./tag.dto";

export const postDataSchema = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    extract: z.string().optional(),
    start_at: z.string(),
    author: authorDataSchema,
    picture: pictureDataSchema.optional(),
    tags: z.object({
      data: z.array(tagDataSchema),
    }),
    post_stat_list: z.object({
      data: postStatDataSchema.optional(),
    }),
  }),
});
export type PostData = z.infer<typeof postDataSchema>;

export const postDetailsResponseSchema = z.object({
  posts: z.object({
    data: z.array(postDataSchema).length(1),
  }),
});

export const postListResponseSchema = z.object({
  posts: z.object({
    data: z.array(postDataSchema),
    meta: metaDataSchema,
  }),
});

export type PostListResponse = z.infer<typeof postListResponseSchema>;

export type PostDetailsResponse = z.infer<typeof postDetailsResponseSchema>;
