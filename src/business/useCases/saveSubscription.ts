import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";

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
    private cmsRepository: IContentManagerSystemRepository,
  ) { }
  async execute(request?: SaveWebPushSubscriptionRequest): Promise<Result<void, SaveWebPushSubscriptionResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.CREATE_WEB_PUSH_SUBSCRIPTION, request)

    if (response.IsError) {
      return response.transferError(SaveWebPushSubscriptionResult.ERROR)
    }

    return Result.ok()
  }
}