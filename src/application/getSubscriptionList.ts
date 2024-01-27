import WebPushSubscription from "@domain/webPushSubscription";
import { IUseCase } from "@infra/useCaseFactory";
import { ISubscriptionRepository } from "@interfaces/ISubscriptionRepository";
import { Result } from "@lib/result";


export enum GetWebPushSubscriptionListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type SaveWebPushSubscriptionRequest = {}

export default class GetSaveWebPushSubscriptionUseCase implements IUseCase<SaveWebPushSubscriptionRequest, Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
  constructor(
    private subscriptionRepository: ISubscriptionRepository
  ) { }
  async execute(request?: SaveWebPushSubscriptionRequest): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
    return this.subscriptionRepository.findSubscription(request)
  }
}