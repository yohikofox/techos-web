import { ISearchEngineRepository } from "../infrastructure/adapter/searchEngineRepository.repo";
import SearchData, { SearchDataItem } from "../model/searchData";
import { Result } from "../result";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";

export type SearchRequest = {
  payload: string
}

export enum SearchDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetSearchDataUseCase implements IUseCase<SearchRequest, Result<SearchData, SearchDataResult>> {
  constructor(
    private searchEngineRepository: ISearchEngineRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: any): Promise<Result<SearchData, SearchDataResult>> {
    const result = await this.searchEngineRepository.search<any>({ ...request, indexName: 'post' })

    if (result.IsError) {
      return result.transferError(SearchDataResult.ERROR)
    }

    const model: SearchData = {
      hits: await Promise.all(result.Value.hits.map(async (hit: any) => {
        return {
          title: hit.title,
          slug: hit.slug,
          content: hit.content,
          extract: hit.extract,
          picture: await this.imageSetService.mapImageSet(hit.picture),
          author: {
            username: hit.author.username,
          },
          start_at: hit.start_at,
        } as SearchDataItem
      }))
    }

    return Result.ok(model)
  }
}