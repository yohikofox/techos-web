import Search from "@domain/search";
import { IUseCase } from "@infra/useCaseFactory";
import { IndexNames, ISearchRepository } from "@interfaces/ISearchRepository";
import { Result } from "@lib/result";
import { ZodTypeAny } from "zod";

export type SearchRequest = {
  indexName: IndexNames;
  filter?: Record<string, string | string[]>;
  payload?: string;
  offset?: number;
  limit?: number;
  schema?: ZodTypeAny;
};

export enum SearchDataResult {
  SUCCESS = "success",
  BAD_REQUEST = "bad_request",
  ERROR = "error",
  NO_FILTERABLE_ATTRIBUTES = "no_filterable_attributes",
}

export default class GetSearchDataUseCase
  implements IUseCase<SearchRequest, Result<Search, SearchDataResult>>
{
  constructor(private searchRepository: ISearchRepository) {}
  async execute(
    request?: SearchRequest
  ): Promise<Result<Search, SearchDataResult>> {
    console.debug("🚀 ~ request:", request);
    return Result.ok();
    // return this.searchRepository.findSearchData(request);
  }
}
