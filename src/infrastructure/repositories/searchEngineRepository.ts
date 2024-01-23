import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";
import { FetchOptions } from "@infra/adapter/fetchOptions";

export enum SearchEngineResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchEngineVariables = {
  payload: string,
  indexName: IndexNames
}

export interface ISearchEngineRepository {
  search<T>(request: SearchEngineVariables, options?: FetchOptions): Promise<Result<T, SearchEngineResult>>
}

export enum IndexNames {
  POST = 'post',
  MICRO_POST = 'micro-post'
}

export default class SearchEngineRepository implements ISearchEngineRepository {
  constructor(private configManager: IConfigManager) { }
  async search<T>(request: SearchEngineVariables, options?: FetchOptions): Promise<Result<T, SearchEngineResult>> {
    const { payload, indexName } = request

    const endpoint = await this.configManager.get('INDEX_ENDPOINT')
    const bearer = await this.configManager.get('INDEX_TOKEN')
    const url = `${endpoint}/indexes/${indexName}/search`

    try {
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            q: payload
          }),
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
      return Result.ok(json)
    } catch (err) {
      console.error('SearchEngineRepository:', err)
      return Result.error(SearchEngineResult.ERROR)
    }
  }
}
