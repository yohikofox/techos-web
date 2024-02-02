import { AuthorData } from "./author.dto";
import { PictureData } from "./picture.dto";
import { PostStatData } from "./post-stat.dto";
import { TagData } from "./tag.dto";

export type FacetDistribution = Record<string, Record<string, number>>;

export type Hit = {
  id: string;
  title: string;
  slug: string;
  content: string;
  extract: string;
  picture: PictureData;
  author: AuthorData;
  post_stat_list: PostStatData[];
  tags: TagData[];
  start_at: string;
};

export type SearchData = {
  hits: Hit[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
  facetDistribution: FacetDistribution;
  facetStats: Record<string, { min: number; max: number }>;
};

export type FacetData = {
  name: string;
  count: number;
};

export type FacetListResponse = {
  facets: FacetData[];
};

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
