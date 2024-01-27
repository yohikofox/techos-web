import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";
import { FetchOptions } from "@infra/adapter/fetchOptions";

export enum SearchEngineResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum FacetType {
  SIMPLE = 'simple',
  RANGED = 'ranged',
  HIERARCHICAL = 'hierarchical',
}

export type SearchFetchOptions = {
  facets?: string[],
  filterableAttributes?: string[],
  offset: number,
  limit: number,
} & FetchOptions

export type SearchEngineVariables = {
  payload: string,
  indexName: IndexNames,
  filters?: string,
}

export interface ISearchEngineRepository {
  search<T>(request: SearchEngineVariables, options?: SearchFetchOptions): Promise<Result<T, SearchEngineResult>>
}

export enum IndexNames {
  POST = 'post',
  MICRO_POST = 'micro-post'
}

export default class SearchEngineRepository implements ISearchEngineRepository {
  constructor(private configManager: IConfigManager) { }
  async search<T>(request: SearchEngineVariables, options?: SearchFetchOptions): Promise<Result<T, SearchEngineResult>> {
    const { payload, indexName } = request

    const endpoint = await this.configManager.get('INDEX_ENDPOINT')
    const bearer = await this.configManager.get('INDEX_TOKEN')
    const url = `${endpoint}/indexes/${indexName}/search`

    const body: Record<string, any> = {
      offset: options?.offset || 0,
      limit: options?.limit || 10,
    }

    if (options?.filterableAttributes) {
      body.facets = options.filterableAttributes
    }

    if (payload) {
      body['q'] = payload
    }

    if (request.filters) {
      body['filter'] = request.filters
    }

    if (options?.facets) {
      body['facets'] = options.facets
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
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearer}`
          },
          next: {
            revalidate: options?.revalidate || 0,
            tags: options?.tags || []
          }
        })

      if (!response.ok) {
        console.log('Network response was not ok.', response.status, response.statusText);
        return Result.error(SearchEngineResult.ERROR)
      }

      const json = await response.json();
      // console.debug("🚀 ~ SearchEngineRepository ~ json:", json)
      return Result.ok(json)
    } catch (err) {
      console.error('SearchEngineRepository:', err)
      return Result.error(SearchEngineResult.ERROR)
    }
  }
}
