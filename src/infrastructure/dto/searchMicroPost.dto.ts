import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";
import { facetDistributionSchema, facetStats } from "./search-facet.dto";
import { tagDataSchema } from "./tag.dto";

export const searchMicroPostHitSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  picture: pictureDataSchema,
  tags: z.array(tagDataSchema).optional(),
});

export const searchMicroPostResponseSchema = z.object({
  hits: z.array(searchMicroPostHitSchema),
  query: z.string(),
  processingTimeMs: z.number(),
  limit: z.number(),
  offset: z.number(),
  estimatedTotalHits: z.number(),
  facetDistribution: facetDistributionSchema,
  facetStats: facetStats,
});

export type MicroPostHitData = z.infer<typeof searchMicroPostHitSchema>;

export type SearchMicroPostResponse = z.infer<
  typeof searchMicroPostResponseSchema
>;
