import { IUseCase } from "@/business/useCaseFactory";
import { Result } from "@/lib/result";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";

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
  constructor(private contentManagerRepository: IContentManagerSystemRepository) { }
  async execute(request?: DeleteSubscriptionRequest | undefined): Promise<Result<void, DeleteSubscriptionUseCaseResult>> {

    const response = await this.contentManagerRepository.get(GraphQLQueries.DELETE_WEB_PUSH_SUBSCRIPTION, request?.data)

    if (response.IsError) {
      return response.transferError(DeleteSubscriptionUseCaseResult.ERROR)
    }

    return Result.ok()
  }
}
