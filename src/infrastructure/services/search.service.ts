import Search, { FacetedSearch, SearchItem } from "@domain/search"
import { SearchData } from "@dto/search.dto"
import { IMicroPostService } from "@infra/services/micro-post.service"
import { IPostService } from "@infra/services/post.service"
import { FacetConfig } from "@domain/facetConfig"

export interface ISearchService {
  mapSearchItem(search: SearchData, facets: FacetConfig[], indexName: string): Promise<Search>
}

export default class SearchService implements ISearchService {
  constructor(
    private postService: IPostService,
    private microPostService: IMicroPostService,
  ) { }

  async mapSearchItem(search: SearchData, facets: FacetConfig[], indexName: string): Promise<Search> {
    switch (indexName) {
      case 'post': {
        const stats = search.facetStats
        return {
          facets: search.facetDistribution && Object.keys(search.facetDistribution).map(key => {
            const result: FacetedSearch = {
              name: key,
              values: Object.keys(search.facetDistribution[key]).map(k => ({
                label: k,
                count: search.facetDistribution[key][k]
              })),
              multiple: facets.find(f => f.name === key)?.multiple,
              autocomplete: facets.find(f => f.name === key)?.autocomplete,
              dataType: facets.find(f => f.name === key)?.dataType,
            }
            if (Object.keys(stats).includes(key)) {
              result["min"] = stats[key].min
              result["max"] = stats[key].max
            }
            return result
          }),
          query: search.query,
          processingTimeMs: search.processingTimeMs,
          limit: search.limit,
          offset: search.offset,
          estimatedTotalHits: search.estimatedTotalHits,
          hits: (await Promise.all(search.hits.map(h => this.postService.mapPost({
            attributes: {
              ...h,
              picture: h.picture && {
                data: {
                  attributes: h.picture
                }
              },
              author: h.author && {
                data: {
                  attributes: h.author
                }
              },
              post_stat_list: h.post_stat_list && {
                data: {
                  attributes: h.post_stat_list
                }
              },
              tags: h.tags && {
                data: h.tags.map((tag: any) => ({
                  attributes: tag
                }))
              }
            }
          })))).filter(h => !!h) as SearchItem[]
        } satisfies Search
      }
      case 'micro-post': {
        return {
          estimatedTotalHits: search.estimatedTotalHits,
          query: search.query,
          processingTimeMs: search.processingTimeMs,
          limit: search.limit,
          offset: search.offset,
          hits: (await Promise.all(search.hits.map(h => this.microPostService.mapMicroPost({
            attributes: {
              ...h,
              picture: h.picture && {
                data: {
                  attributes: h.picture
                }
              }
            }
          })))).filter(h => !!h) as SearchItem[]
        } satisfies Search
      }
      default:
        return {
          hits: [],
          query: "",
          processingTimeMs: 0,
          limit: 0,
          offset: 0,
          estimatedTotalHits: 0,
        } satisfies Search
    }
  }
}