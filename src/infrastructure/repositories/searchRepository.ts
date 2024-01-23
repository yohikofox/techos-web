import { SearchDataResult } from "@app/getSearchData"
import { ISearchEngineRepository } from "@infra/repositories/searchEngineRepository"
import Search from "@domain/search"
import { Result } from "@lib/result"
import CacheConstants from "@lib/constants/cache"
import RevalidateTagConstants from "@lib/constants/revalidateTag"
import { ISearchService } from "@infra/services/search.service"
import { ISearchRepository } from "@interfaces/ISearchRepository"

export default class SearchRepository implements ISearchRepository {
  constructor(
    private searchEngineRepository: ISearchEngineRepository,
    private searchService: ISearchService
  ) { }

  async findSearchData(request?: any): Promise<Result<Search, SearchDataResult>> {
    if (!request || !request.indexName) {
      return Result.error(SearchDataResult.BAD_REQUEST)
    }

    const result = await this.searchEngineRepository.search<any>({ ...request } as any, {
      revalidate: CacheConstants.ONE_MINUTE,
      tags: [RevalidateTagConstants.SEARCH]
    })

    if (result.IsError) {
      return result.transferError(SearchDataResult.ERROR)
    }

    const model: Search = await this.searchService.mapSearchItem(result.Value, request.indexName)

    return Result.ok(model)
  }
}