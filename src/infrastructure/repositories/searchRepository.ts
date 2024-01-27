import { SearchDataResult } from "@app/getSearchData"
import { ISearchEngineRepository } from "@infra/repositories/searchEngineRepository"
import Search from "@domain/search"
import { Result } from "@lib/result"
import CacheConstants from "@lib/constants/cache"
import RevalidateTagConstants from "@lib/constants/revalidateTag"
import { ISearchService } from "@infra/services/search.service"
import { ISearchRepository } from "@interfaces/ISearchRepository"
import { IContentManagerSystemRepository } from "@interfaces/contentManagementSystem"
import { FacetConfigListResponse, facetConfigListResponseSchema } from "../dto/facet.dto"
import { FacetConfig } from "R/src/domain/facetConfig"
//  filter?: Record<string, string | string[]>,
export default class SearchRepository implements ISearchRepository {
  constructor(
    private searchEngineRepository: ISearchEngineRepository,
    private contentManagerSystemRepository: IContentManagerSystemRepository,
    private searchService: ISearchService
  ) { }

  async findSearchData(request?: any): Promise<Result<Search, SearchDataResult>> {
    if (!request || !request.indexName) {
      return Result.error(SearchDataResult.BAD_REQUEST)
    }

    const facets = await this.getFilterableAttributes(request.indexName)

    if (facets.IsError) {
      return facets.transferError(SearchDataResult.NO_FILTERABLE_ATTRIBUTES)
    }

    const fltrs = this.createFiltersString(request.filter)

    const req = {
      payload: request.payload,
      indexName: request.indexName,
      filters: fltrs,
    }

    const result = await this.searchEngineRepository.search<any>(req, {
      revalidate: CacheConstants.ONE_MINUTE,
      tags: [RevalidateTagConstants.SEARCH],
      facets: facets.Value.map((f: FacetConfig) => f.label),
      limit: request.limit,
      offset: request.offset,
    })

    if (result.IsError) {
      return result.transferError(SearchDataResult.ERROR)
    }

    const model: Search = await this.searchService.mapSearchItem(result.Value, facets.Value, request.indexName)

    return Result.ok(model)
  }

  async getFilterableAttributes(indexName: string): Promise<Result<FacetConfig[], SearchDataResult>> {
    const response = await this.contentManagerSystemRepository.find<FacetConfigListResponse>({
      entityName: "filterable-attributes",
      query: {
        index: indexName,
      }
    }, {
      revalidate: 0,
      tags: [RevalidateTagConstants.SEARCH],
      schema: facetConfigListResponseSchema,
    })

    if (response.IsError) {
      return response.transferError(SearchDataResult.ERROR)
    }

    return Result.ok(response.Value)
  }

  private createFiltersString = (filter?: Record<string, string | string[]>) => {
    if (!filter) {
      return undefined
    }

    const filters = Object.keys(filter).map(key => {
      const value = filter[key]
      if (Array.isArray(value)) {
        return value.map(v => `${key} = ${v}`).join(' AND ')
      }
      return `${key} = ${value}`
    })

    return filters.join(' AND ')
  }
}