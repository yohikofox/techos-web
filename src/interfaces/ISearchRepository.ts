import { SearchDataResult } from "@app/getSearchData";
import Search from "@domain/search";
import { Result } from "@lib/result";

export interface ISearchRepository {
  findSearchData(request?: any): Promise<Result<Search, SearchDataResult>>
}