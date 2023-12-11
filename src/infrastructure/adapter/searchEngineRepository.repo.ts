import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";

export enum SearchEngineResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchEngineVariables = {
  payload: string,
  indexName: IndexNames
}

export interface ISearchEngineRepository {
  search<T>(options: SearchEngineVariables): Promise<Result<T, SearchEngineResult>>
}

export enum IndexNames {
  POST = 'post',
}

export default class SearchEngineRepository implements ISearchEngineRepository {
  constructor(private configManager: IConfigManager) { }
  async search<T>(options: SearchEngineVariables): Promise<Result<T, SearchEngineResult>> {
    const { payload, indexName } = options

    const response = await fetch(`${await this.configManager.get('INDEX_ENDPOINT')}/indexes/${indexName}/search`,
      {
        method: 'POST',
        body: JSON.stringify({
          q: payload
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer byq4v7FNY2HjA7ATSJeCPzxH7oqchSHMBaZOrBSFZrM"
        }
      })

    if (!response.ok) {
      console.log('Network response was not ok.', response.status, response.statusText);
      return Result.error(SearchEngineResult.ERROR)
    }

    const json = await response.json();

    return Result.ok(json)
  }
}