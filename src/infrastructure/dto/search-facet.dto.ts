import { z } from "zod";

export const facetDistributionSchema = z.record(z.record(z.number().min(1)));
export const facetStats = z.record(
  z.object({ min: z.number(), max: z.number() })
);

export type FacetDistribution = z.infer<typeof facetDistributionSchema>;
export type FacetStats = z.infer<typeof facetStats>;
