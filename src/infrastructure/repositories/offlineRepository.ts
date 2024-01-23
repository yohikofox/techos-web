import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem"
import { OffLineData, OffLineDataResponse, offLineDataResponseSchema } from "@dto/offline.dto"
import CacheConstants from "@lib/constants/cache"
import RevalidateTagConstants from "@lib/constants/revalidateTag"
import { GetOfflinePageDataUseCaseResult } from "@app/getOfflinePageData"
import { Result } from "@lib/result"
import OffLinePageData from "@domain/offLinePageData"
import { IOffLineService } from "@infra/services/offline.service"
import { IOfflineRepository } from "@interfaces/IOfflineRepository"

export default class OfflineRepository implements IOfflineRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private offLineService: IOffLineService
  ) { }
  async getOfflineData(request?: any): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
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