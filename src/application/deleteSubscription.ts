import { ISubscriptionRepository } from "@interfaces/ISubscriptionRepository";
import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@/lib/result";

export interface DeleteSubscriptionRequest {
  data: {
    id: string
  }
}

export enum DeleteSubscriptionUseCaseResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class DeleteSubscriptionUseCase implements IUseCase<DeleteSubscriptionRequest, Result<void, DeleteSubscriptionUseCaseResult>> {

  constructor(
    private subscriptionRepository: ISubscriptionRepository,
  ) { }

  async execute(request?: DeleteSubscriptionRequest | undefined): Promise<Result<void, DeleteSubscriptionUseCaseResult>> {
    return this.subscriptionRepository.deleteSubscription(request)
  }
}
