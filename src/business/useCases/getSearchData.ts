import { ISearchEngineRepository } from "@/infrastructure/adapter/searchEngineRepository.repo";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import { ISearchService } from "../services/search.service";
import { SearchData } from "../services/dto/search.dto";
import Search from "../model/search";

export type SearchRequest = {
  payload: string,
  indexName: string
}

export enum SearchDataResult {
  SUCCESS = 'success',
  BAD_REQUEST = 'bad_request',
  ERROR = 'error',
}

export default class GetSearchDataUseCase implements IUseCase<SearchRequest, Result<Search, SearchDataResult>> {
  constructor(
    private searchEngineRepository: ISearchEngineRepository,
    private searchService: ISearchService
  ) { }
  async execute(request?: SearchRequest): Promise<Result<Search, SearchDataResult>> {
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