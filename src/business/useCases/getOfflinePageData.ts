import { IUseCase } from "@/business/useCaseFactory";
import { Result } from "../result";
import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import OffLinePageData from "../model/offLinePageData";

export interface GetOfflinePageDataRequest { }


export enum GetOfflinePageDataUseCaseResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetOfflinePageDataUseCase implements IUseCase<GetOfflinePageDataRequest, Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
  constructor(private contentManagerRepository: IContentManagerSystemRepository) { }
  async execute(request?: GetOfflinePageDataRequest | undefined): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {

    const response = await this.contentManagerRepository.get<any>(GraphQLQueries.GET_OFFLINE_PAGE_DATA, request)

    if (response.IsError) {
      return response.transferError(GetOfflinePageDataUseCaseResult.ERROR)
    }

    if (!response.Value.offlinePage.data){
      return response.transferError(GetOfflinePageDataUseCaseResult.NO_DATA_FOUND)
    }

    const result: OffLinePageData = {
      title: response.Value?.offlinePage.data.attributes.title,
      content: response.Value?.offlinePage.data.attributes.content,
    }

    return Result.ok(result)
  }
}
