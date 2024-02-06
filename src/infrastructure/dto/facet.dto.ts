import { z } from "zod"

export const facetConfigSchema = z.object({
  id: z.number().optional(),
  label: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  multiple: z.boolean().optional(),
  autocomplete: z.boolean().optional(),
  dataType: z.string().optional(),
}).strict()


export const facetConfigListResponseSchema = z.array(facetConfigSchema)


export type FacetConfigData = z.infer<typeof facetConfigSchema>
export type FacetConfigListResponse = z.infer<typeof facetConfigListResponseSchema>