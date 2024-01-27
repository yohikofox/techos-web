import { GetOfflinePageDataUseCaseResult } from "@app/getOfflinePageData";
import OffLinePageData from "@domain/offLinePageData";
import { Result } from "@lib/result";

export interface IOfflineRepository {
  getOfflineData(request?: any): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>>
}