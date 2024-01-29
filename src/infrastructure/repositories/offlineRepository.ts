import {
  GetOfflinePageDataRequest,
  GetOfflinePageDataUseCaseResult,
} from "@app/getOfflinePageData";
import OffLinePageData from "@domain/offLinePageData";
import {
  OffLineData,
  OffLineDataResponse,
  offLineDataResponseSchema,
} from "@dto/offline.dto";
import { IOffLineService } from "@infra/services/offline.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IOfflineRepository } from "@interfaces/IOfflineRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class OfflineRepository implements IOfflineRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private offLineService: IOffLineService
  ) {}
  async getOfflineData(
    request?: GetOfflinePageDataRequest
  ): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
    const response = await this.contentManagerRepository.get<
      OffLineDataResponse,
      GetOfflinePageDataRequest
    >(GraphQLQueries.GET_OFFLINE_PAGE_DATA, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.OFFLINE_PAGE],
      schema: offLineDataResponseSchema,
    });

    if (response.IsError) {
      return response.transferError(GetOfflinePageDataUseCaseResult.ERROR);
    }

    if (response.Value.offlinePage.data === undefined) {
      return response.transferError(
        GetOfflinePageDataUseCaseResult.NO_DATA_FOUND
      );
    }

    const result: OffLinePageData = await this.offLineService.mapOffLine(
      response.Value?.offlinePage satisfies OffLineData
    );

    return Result.ok(result);
  }
}
