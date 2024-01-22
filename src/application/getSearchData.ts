import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@lib/result";
import Search from "@domain/search";
import { ISearchRepository } from "@interfaces/ISearchRepository";

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
    private searchRepository: ISearchRepository,
  ) { }
  async execute(request?: SearchRequest): Promise<Result<Search, SearchDataResult>> {
    return this.searchRepository.findSearchData(request)
  }
}