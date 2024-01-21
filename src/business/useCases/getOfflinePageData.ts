import { IUseCase } from "@/business/useCaseFactory";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import OffLinePageData from "../model/offLinePageData";
import { Result } from "@/lib/result";
import { IOffLineService } from "../services/offline.service";
import { OffLineData, OffLineDataResponse, offLineDataResponseSchema } from "../services/dto/offline.dto";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

export interface GetOfflinePageDataRequest { }


export enum GetOfflinePageDataUseCaseResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetOfflinePageDataUseCase implements IUseCase<GetOfflinePageDataRequest, Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private offLineService: IOffLineService
  ) { }
  async execute(request?: GetOfflinePageDataRequest | undefined): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {

    const response = await this.contentManagerRepository.get<OffLineDataResponse>(GraphQLQueries.GET_OFFLINE_PAGE_DATA, request,
      {
        revalidate: CacheConstants.ONE_HOUR,
        tags: [RevalidateTagConstants.OFFLINE_PAGE],
        schema: offLineDataResponseSchema
      }
    )

    if (response.IsError) {
      return response.transferError(GetOfflinePageDataUseCaseResult.ERROR)
    }

    if (!response.Value.offlinePage.data) {
      return response.transferError(GetOfflinePageDataUseCaseResult.NO_DATA_FOUND)
    }

    const result: OffLinePageData = await this.offLineService.mapOffLine(response.Value?.offlinePage satisfies OffLineData)

    return Result.ok(result)
  }
}
