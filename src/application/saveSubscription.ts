import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@lib/result";
import { ISubscriptionRepository } from "@interfaces/ISubscriptionRepository";

export enum SaveWebPushSubscriptionResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SaveWebPushSubscriptionRequest = {
  data: {
    endpoint: string,
    p256dh: string,
    auth: string,
    expiration_time?: string,
  }

}
export default class GetSaveWebPushSubscriptionUseCase implements IUseCase<SaveWebPushSubscriptionRequest, Result<void, SaveWebPushSubscriptionResult>> {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
  ) { }
  async execute(request?: SaveWebPushSubscriptionRequest): Promise<Result<void, SaveWebPushSubscriptionResult>> {
    return this.subscriptionRepository.saveSubscription(request)
  }
}