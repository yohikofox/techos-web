import { SearchDataResult } from "@app/getSearchData";
import Search from "@domain/search";
import { Result } from "@lib/result";
import { FacetConfig } from "@domain/facetConfig";

export interface ISearchRepository {
  findSearchData(request?: any): Promise<Result<Search, SearchDataResult>>
  getFilterableAttributes(indexName: string): Promise<Result<FacetConfig[], SearchDataResult>>
}