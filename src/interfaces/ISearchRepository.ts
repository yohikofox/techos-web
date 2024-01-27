import { SearchDataResult } from "@app/getSearchData";
import { FacetConfig } from "@domain/facetConfig";
import Search from "@domain/search";
import { Result } from "@lib/result";

export interface ISearchRepository {
  findSearchData(request?: any): Promise<Result<Search, SearchDataResult>>
  getFilterableAttributes(indexName: string): Promise<Result<FacetConfig[], SearchDataResult>>
}