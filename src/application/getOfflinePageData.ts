import OffLinePageData from "@domain/offLinePageData";
import { IUseCase } from "@infra/useCaseFactory";
import { IOfflineRepository } from "@interfaces/IOfflineRepository";

import { Result } from "@/lib/result";

export interface GetOfflinePageDataRequest { }

export enum GetOfflinePageDataUseCaseResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetOfflinePageDataUseCase implements IUseCase<GetOfflinePageDataRequest, Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
  constructor(
    private offlineRepository: IOfflineRepository,
  ) { }
  async execute(request?: GetOfflinePageDataRequest | undefined): Promise<Result<OffLinePageData, GetOfflinePageDataUseCaseResult>> {
    return this.offlineRepository.getOfflineData(request!);
  }
}
