import { ISearchEngineRepository } from "../infrastructure/adapter/searchEngineRepository.repo";
import SearchData, { SearchDataItem } from "../model/searchData";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";


export type SearchRequest = {
  payload: string
}


export enum SearchDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetSearchDataUseCase implements IUseCase<SearchRequest, Result<SearchData, SearchDataResult>> {
  constructor(private searchEngineRepository: ISearchEngineRepository) { }
  async execute(request?: any): Promise<Result<SearchData, SearchDataResult>> {
    const result = await this.searchEngineRepository.search<any>({ ...request, indexName: 'post' })


    if (result.IsError) {
      return result.transferError(SearchDataResult.ERROR)
    }


    const model: SearchData = {
      hits: result.Value.hits.map((hit: any) => {
        return {
          title: hit.title,
          slug: hit.slug,
          content: hit.content,
          extract: hit.extract,
          picture: {
            height: hit.picture.height,
            width: hit.picture.width,
            src: hit.picture.url,
            name: hit.picture.name,
          },
          author: {
            username: hit.author.username,
          },
          start_at: hit.start_at,
        } as SearchDataItem
      })
    }

    return Result.ok(model)
  }
}