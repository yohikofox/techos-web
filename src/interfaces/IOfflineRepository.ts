import { Result } from "@lib/result";
import OffLinePageData from "@domain/offLinePageData";
import { GetOfflinePageDataUseCaseResult } from "@app/getOfflinePageData";

export interface IOfflineRepository {
  getOfflineData(request?: any): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>>
}