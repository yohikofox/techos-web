import { FacetConfig } from "@domain/facetConfig";
import Search, { FacetedSearch, SearchItem } from "@domain/search";
import { SearchData } from "@dto/search.dto";
import { IMicroPostService } from "@infra/services/micro-post.service";
import { IPostService } from "@infra/services/post.service";
import dayjs from "dayjs";

import { PostData } from "../dto/post.dto";
import { TagData } from "../dto/tag.dto";

export interface ISearchService {
  mapSearchItem(
    search: SearchData,
    facets: FacetConfig[],
    indexName: string
  ): Promise<Search>;
}

export default class SearchService implements ISearchService {
  constructor(
    private postService: IPostService,
    private microPostService: IMicroPostService
  ) {}

  async mapSearchItem(
    search: SearchData,
    facets: FacetConfig[],
    indexName: string
  ): Promise<Search> {
    switch (indexName) {
      case "post": {
        const stats = search.facetStats;
        return {
          facets: Object.keys(search.facetDistribution).map((key) => {
            const result: FacetedSearch = {
              name: key,
              values: Object.keys(search.facetDistribution[key]).map((k) => ({
                label: k,
                count: search.facetDistribution[key][k],
              })),
              multiple: facets.find((f) => f.name === key)?.multiple,
              autocomplete: facets.find((f) => f.name === key)?.autocomplete,
              dataType: facets.find((f) => f.name === key)?.dataType,
            };
            if (Object.keys(stats).includes(key)) {
              result["min"] = stats[key].min;
              result["max"] = stats[key].max;
            }
            return result;
          }),
          query: search.query,
          processingTimeMs: search.processingTimeMs,
          limit: search.limit,
          offset: search.offset,
          estimatedTotalHits: search.estimatedTotalHits,
          hits: (await Promise.all(
            search.hits.map((h) => {
              let tags: {
                data: TagData[];
              } = {
                data: [],
              };
              if (h.tags !== undefined) {
                tags = {
                  data: h.tags,
                };
              }

              let postStat = {};

              if (h.post_stat_list !== undefined) {
                postStat = {
                  data: h.post_stat_list[0],
                };
              }

              const itemToMap: PostData = {
                id: "",
                attributes: {
                  author: h.author,
                  content: h.content,
                  extract: h.extract,
                  picture: h.picture,
                  slug: h.slug,
                  start_at: dayjs().toISOString(),
                  title: h.title,
                  tags,
                  post_stat_list: postStat,
                },
              };

              if (h.picture !== undefined && h.picture !== null) {
                itemToMap.attributes.picture = h.picture;
              }

              if (h.author !== undefined && h.author !== null) {
                itemToMap.attributes.author = h.author;
              }

              if (
                h.post_stat_list !== undefined &&
                h.post_stat_list !== null &&
                h.post_stat_list.length > 0
              ) {
                itemToMap.attributes.post_stat_list = {
                  data: h.post_stat_list[0],
                };
              }

              return this.postService.mapPost(itemToMap);
            })
          )) as SearchItem[],
        } satisfies Search;
      }
      case "micro-post": {
        return {
          estimatedTotalHits: search.estimatedTotalHits,
          query: search.query,
          processingTimeMs: search.processingTimeMs,
          limit: search.limit,
          offset: search.offset,
          hits: (await Promise.all(
            search.hits.map((h) =>
              this.microPostService.mapMicroPost({
                attributes: {
                  title: h.title,
                  slug: h.slug,
                  content: h.content,
                  picture: h.picture,
                },
              })
            )
          )) as SearchItem[],
        } satisfies Search;
      }

      default:
        return {
          hits: [],
          query: "",
          processingTimeMs: 0,
          limit: 0,
          offset: 0,
          estimatedTotalHits: 0,
        } satisfies Search;
    }
  }
}
