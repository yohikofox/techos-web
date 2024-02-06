import { FacetConfig } from "R/src/domain/facetConfig";
import {
  IndexNames,
  ISearchRepository,
  SearchEngineVariables,
} from "R/src/interfaces/ISearchRepository";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import { ZodTypeAny } from "zod";

import { SearchFetchOptions } from "../repositories/baseSearchEngineRepository";
import { ISearchService } from "../services/search.service";

export default abstract class SearchAdapter {
  constructor(
    protected indexName: IndexNames,
    private searchRepository: ISearchRepository,
    private searchService: ISearchService
  ) {}
  /**
   * //TODO: Refacto following code
    const r: {
      limit: number;
      filter: Record<string, string | string[]>;
    } = {
      limit: 1,
      filter: {},
    };

    if (request?.slug.eq == undefined) {
      console.error("slug is undefined");
      return Result.error(PostDetailsResult.NO_DATA_FOUND);
    }

    r.filter["slug"] = request.slug.eq;

    const { req, opts } = await this.buildSearchRequest(r);
 */

  async buildSearchRequest(request: {
    payload?: string;
    filter?: Record<string, string | string[]>;
    limit?: number;
    index?: number;
    schema?: ZodTypeAny;
  }): Promise<
    Promise<{ req: SearchEngineVariables; opts: SearchFetchOptions }>
  > {
    const facetListResponse =
      await this.searchRepository.getFilterableAttributes(this.indexName);

    if (facetListResponse.IsError) {
      console.error(
        "🚀 ~ PostAdapter ~ facetListResponse:",
        facetListResponse.Result
      );
    }

    const facets = facetListResponse.Value ?? [];

    const req: SearchEngineVariables = {
      indexName: this.indexName,
      payload: "",
    };

    if (request?.payload !== undefined) {
      req.payload = request.payload;
    }
    const filters = await this.searchService.createFiltersString(
      request.filter
    );

    if (filters !== undefined) {
      req.filters = filters;
    }

    const opts: SearchFetchOptions = {
      revalidate: CacheConstants.ONE_MINUTE,
      tags: [RevalidateTagConstants.SEARCH],
      facets: facets.map((f: FacetConfig) => f.label),
      limit: request.limit === undefined ? 0 : request.limit,
      offset: request.index === undefined ? 0 : request.index,
      schema: request.schema,
    };

    return {
      opts,
      req,
    };
  }
}
