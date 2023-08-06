import { Result } from "@/business/result";

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
  async search<T>(options: SearchEngineVariables): Promise<Result<T, SearchEngineResult>> {
    const { payload, indexName } = options

    const response = await fetch(`http://localhost:7700/indexes/${indexName}/search`,
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
