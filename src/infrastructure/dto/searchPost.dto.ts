import { authorDataSchema } from "@dto/author.dto";
import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";
import { tagDataSchema } from "./tag.dto";

export const searchPostHitSchema = z.object({
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
});

export const facetDistributionSchema = z.record(z.record(z.number().min(1)));
export const facetStats = z.record(
  z.object({ min: z.number(), max: z.number() })
);

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

export type SearchPostResponse = z.infer<typeof searchPostResponseSchema>;
