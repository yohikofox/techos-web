import { GetOfflinePageDataRequest, GetOfflinePageDataUseCaseResult } from "@app/getOfflinePageData";
import OffLinePageData from "@domain/offLinePageData";
import { Result } from "@lib/result";

export interface IOfflineRepository {
  getOfflineData(request?: GetOfflinePageDataRequest): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>>
}