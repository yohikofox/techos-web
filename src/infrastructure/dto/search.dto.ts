export type FacetDistribution = Record<string, Record<string, number>>

export type SearchData = {
  hits: any[],
  query: string,
  processingTimeMs: number,
  limit: number,
  offset: number,
  estimatedTotalHits: number,
  facetDistribution: FacetDistribution,
  facetStats: Record<string, { min: number, max: number }>
}

export type FacetData = {
  name: string,
  count: number
}

export type FacetListResponse = {
  facets: FacetData[]
}

// {
//   hits: await Promise.all(result.Value.hits.map(async (hit: any) => {
//     return {
//       title: hit.title,
//       slug: hit.slug,
//       content: hit.content,
//       extract: hit.extract,
//       picture: await this.imageSetService.mapImageSet(hit.picture),
//       author: hit.author && {
//         username: hit.author?.username,
//       },
//       start_at: hit.start_at,
//     } as SearchDataItem
//   }))
// }