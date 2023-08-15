import { IUseCase } from "@/business/useCaseFactory";
import { Result } from "../result";
import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";

export interface IDeleteSubscriptionRequest {
  data: {
    id: string
  }
}

export enum DeleteSubscriptionUseCaseResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class IDeleteSubscriptionUseCase implements IUseCase<IDeleteSubscriptionRequest, Result<void, DeleteSubscriptionUseCaseResult>> {
  constructor(private contentManagerRepository: IContentManagerSystemRepository) { }
  async execute(request?: IDeleteSubscriptionRequest | undefined): Promise<Result<void, DeleteSubscriptionUseCaseResult>> {

    const response = await this.contentManagerRepository.get(GraphQLQueries.DELETE_WEB_PUSH_SUBSCRIPTION, request?.data)

    if (response.IsError) {
      return response.transferError(DeleteSubscriptionUseCaseResult.ERROR)
    }

    return Result.ok()
  }
}
