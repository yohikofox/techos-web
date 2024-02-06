import { FetchOptions } from "@infra/adapter/fetchOptions";
import { SearchEngineVariables } from "R/src/interfaces/ISearchRepository";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import { defaultInstance } from "R/src/lib/zod";
import { z } from "zod";

import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";

import { ISearchService } from "../services/search.service";

export enum SearchEngineResult {
  SUCCESS = "success",
  ERROR = "error",
}

export enum FacetType {
  SIMPLE = "simple",
  RANGED = "ranged",
  HIERARCHICAL = "hierarchical",
}

export type SearchFetchOptions = {
  facets?: string[];
  filterableAttributes?: string[];
  offset: number;
  limit: number;
} & FetchOptions;

export interface ISearchEngineRepository<TResult> {
  search(
    request: SearchEngineVariables,
    options?: SearchFetchOptions
  ): Promise<Result<TResult, SearchEngineResult>>;
}

export default abstract class SearchEngineRepository<TResult>
  implements ISearchEngineRepository<TResult>
{
  constructor(
    private configManager: IConfigManager,
    protected searchService: ISearchService
  ) {}
  async search(
    request: SearchEngineVariables,
    options?: SearchFetchOptions
  ): Promise<Result<TResult, SearchEngineResult>> {
    if (process.env.BUILD_MODE === "true" && options?.schema !== undefined)
      return Result.ok(
        defaultInstance(options?.schema as z.AnyZodObject) as TResult
      );

    const { payload, indexName } = request;

    const endpoint = await this.configManager.get("INDEX_ENDPOINT");
    const bearer = await this.configManager.get("INDEX_TOKEN");
    const url = `${endpoint}/indexes/${indexName}/search`;

    const body: Record<string, unknown> = {};

    if (options?.offset !== undefined && options?.limit !== undefined) {
      body.offset = options.offset;
      body.limit = options.limit;
    }

    if (options?.filterableAttributes) {
      body.facets = options.filterableAttributes;
    }

    if (payload !== undefined) {
      body["q"] = payload;
    }

    if (request.filters !== undefined) {
      body["filter"] = request.filters;
    }

    if (options?.facets !== undefined) {
      body["facets"] = options.facets;
    }

    try {
      // const t = await fetch('http://localhost:7700/indexes/post/settings/filterable-attributes', {
      //   method: 'PUT',
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${bearer}`
      //   },
      //   body: JSON.stringify(['category_toto']),
      //   next: {
      //     revalidate: options?.revalidate || 0,
      //     tags: options?.tags || []
      //   }
      // })
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        next: {
          revalidate:
            options?.revalidate !== undefined ? options.revalidate : 0,
          tags:
            options?.tags !== undefined
              ? [...options.tags, RevalidateTagConstants.DANGER_GLOBAL]
              : [RevalidateTagConstants.DANGER_GLOBAL],
        },
      });

      if (!response.ok) {
        console.log(
          "Network response was not ok.",
          response.status,
          response.statusText
        );
        return Result.error(SearchEngineResult.ERROR);
      }

      const json = await response.json();

      if (options?.schema) {
        const parsedData = options.schema.safeParse(json);

        if (parsedData.success === false) {
          console.error(
            "🚀 ~ SearchEngineRepository ~ search ~ parsedData:",
            parsedData.error
          );
          return Result.error(SearchEngineResult.ERROR);
        }

        return Result.ok(parsedData.data as TResult);
      }

      return Result.ok(json as TResult);
    } catch (err) {
      console.error("SearchEngineRepository:", err);
      return Result.error(SearchEngineResult.ERROR);
    }
  }
}
