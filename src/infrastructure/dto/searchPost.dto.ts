import { authorDataSchema } from "@dto/author.dto";
import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";
import { facetDistributionSchema, facetStats } from "./search-facet.dto";
import { tagDataSchema } from "./tag.dto";

export const searchPostHitSchema = z
  .object({
    _meilisearch_id: z.string(),
    level: z.string().nullable().optional(),
    writer: z.string().nullable().optional(),
    THUMBNAIL_PICTURE: z.string().nullable().optional(),
    facet_start_at: z.coerce.number().nullable().optional(),
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    start_at: z.string(),
    picture: pictureDataSchema,
    end_at: z.string().nullable().optional(),
    extract: z.string().nullable().optional(),
    author: authorDataSchema,
    post_stat_list: z.object({
      id: z.number(),
      view_count: z.number(),
      // views: z.number(),
      // likes: z.number(),
      // dislikes: z.number(),
      // comments: z.number(),
      // post_id: z.number(),
    }),
    tags: z.array(tagDataSchema).optional(),
  })
  .strict();

export const searchPostResponseSchema = z.object({
  hits: z.array(searchPostHitSchema),
  query: z.string(),
  processingTimeMs: z.number(),
  limit: z.number(),
  offset: z.number(),
  estimatedTotalHits: z.number(),
  facetDistribution: facetDistributionSchema,
  facetStats: facetStats,
});
// .strict();
export type HitData = z.infer<typeof searchPostHitSchema>;
export type SearchPostResponse = z.infer<typeof searchPostResponseSchema>;
