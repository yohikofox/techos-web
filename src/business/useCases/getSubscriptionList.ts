import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import WebPushSubscription from "../model/webPushSubscription";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";


export enum GetWebPushSubscriptionListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type SaveWebPushSubscriptionRequest = {}

export default class GetSaveWebPushSubscriptionUseCase implements IUseCase<SaveWebPushSubscriptionRequest, Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
  ) { }
  async execute(request?: SaveWebPushSubscriptionRequest): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_WEB_PUSH_SUBSCRIPTION_LIST, request, { revalidate: 60 * 60 * 1 })

    if (response.IsError) {
      return response.transferError(GetWebPushSubscriptionListResult.ERROR)
    }

    if (!response.Value.webPushSubscriptions) {
      return response.transferError(GetWebPushSubscriptionListResult.NO_DATA_FOUND)
    }

    const results = response.Value.webPushSubscriptions.data.map((item: any) => {
      return {
        id: item.id,
        endpoint: item.attributes.endpoint,
        expirationTime: item.attributes.expiration_time,
        keys: {
          p256dh: item.attributes.p256dh,
          auth: item.attributes.auth,
        }
      } as WebPushSubscription
    })

    return Result.ok(results)
  }
}