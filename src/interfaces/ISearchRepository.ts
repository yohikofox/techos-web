import { SearchDataResult } from "@app/getSearchData";
import { FacetConfig } from "@domain/facetConfig";
import { Result } from "@lib/result";

export interface ISearchRepository {
  // findSearchData(request?: SearchRequest): Promise<Result<Search, SearchDataResult>>
  getFilterableAttributes(
    indexName: string
  ): Promise<Result<FacetConfig[], SearchDataResult>>;
}

export enum IndexNames {
  POST = "post",
  MICRO_POST = "micro-post",
}

export type SearchEngineVariables = {
  payload: string;
  indexName: IndexNames;
  filters?: string;
};
