import { SearchDataResult, SearchRequest } from "@app/getSearchData";
import { FacetConfig } from "@domain/facetConfig";
import Search from "@domain/search";
import {
  FacetConfigListResponse,
  facetConfigListResponseSchema,
} from "@dto/facet.dto";
import { SearchData } from "@dto/search.dto";
import {
  ISearchEngineRepository,
  SearchEngineVariables,
  SearchFetchOptions,
} from "@infra/repositories/searchEngineRepository";
import { ISearchService } from "@infra/services/search.service";
import { IContentManagerSystemRepository } from "@interfaces/IContentManagerSystemRepository";
import { ISearchRepository } from "@interfaces/ISearchRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class SearchRepository implements ISearchRepository {
  constructor(
    private searchEngineRepository: ISearchEngineRepository,
    private contentManagerSystemRepository: IContentManagerSystemRepository,
    private searchService: ISearchService
  ) {}

  async findSearchData(
    request?: SearchRequest
  ): Promise<Result<Search, SearchDataResult>> {
    if (request === undefined || request.indexName === undefined) {
      return Result.error(SearchDataResult.BAD_REQUEST);
    }

    const facetListResponse = await this.getFilterableAttributes(
      request.indexName
    );

    if (facetListResponse.IsError) {
      return facetListResponse.transferError(
        SearchDataResult.NO_FILTERABLE_ATTRIBUTES
      );
    }

    const filters = this.createFiltersString(request.filter);

    const req: SearchEngineVariables = {
      indexName: request.indexName,
      payload: "",
    };

    if (request.payload !== undefined) {
      req.payload = request.payload;
    }

    if (filters !== undefined) {
      req.filters = filters;
    }

    const opts: SearchFetchOptions = {
      revalidate: CacheConstants.ONE_MINUTE,
      tags: [RevalidateTagConstants.SEARCH],
      facets: facetListResponse.Value.map((f: FacetConfig) => f.label),
      limit: request.limit!,
      offset: request.offset!,
    };

    if (opts.limit === 0) {
      console.warn("limit is 0, returning empty search");
      return Result.ok();
    }

    const searchEngineResponse =
      await this.searchEngineRepository.search<SearchData>(req, opts);

    if (searchEngineResponse.IsError) {
      return searchEngineResponse.transferError(SearchDataResult.ERROR);
    }

    const model: Search = await this.searchService.mapSearchItem(
      searchEngineResponse.Value,
      facetListResponse.Value,
      request.indexName
    );

    return Result.ok(model);
  }

  async getFilterableAttributes(
    indexName: string
  ): Promise<Result<FacetConfig[], SearchDataResult>> {
    const response =
      await this.contentManagerSystemRepository.find<FacetConfigListResponse>(
        {
          entityName: "filterable-attributes",
          query: {
            index: indexName,
          },
        },
        {
          revalidate: 0,
          tags: [RevalidateTagConstants.SEARCH],
          schema: facetConfigListResponseSchema,
        }
      );

    if (response.IsError) {
      return response.transferError(SearchDataResult.ERROR);
    }

    return Result.ok(response.Value);
  }

  private createFiltersString = (
    filter?: Record<string, string | string[]>
  ) => {
    if (!filter) {
      return undefined;
    }

    const filters = Object.keys(filter).map((key) => {
      const value = filter[key];
      if (Array.isArray(value)) {
        return value.map((v) => `${key} = ${v}`).join(" AND ");
      }
      return `${key} = ${value}`;
    });

    return filters.join(" AND ");
  };
}
