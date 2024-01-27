import { DeleteSubscriptionUseCaseResult } from "@app/deleteSubscription";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import { SaveWebPushSubscriptionResult } from "@app/saveSubscription";
import WebPushSubscription from "@domain/webPushSubscription";
import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem";
import { ISubscriptionRepository } from "@interfaces/ISubscriptionRepository";
import CacheConstants from "@lib/constants/cache";
import { Result } from "@lib/result";

export default class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private contentManagerRepository: IContentManagerSystemRepository) { }
  async deleteSubscription(request?: any): Promise<Result<void, DeleteSubscriptionUseCaseResult>> {
    const response = await this.contentManagerRepository.get(GraphQLQueries.DELETE_WEB_PUSH_SUBSCRIPTION, request?.data)

    if (response.IsError) {
      return response.transferError(DeleteSubscriptionUseCaseResult.ERROR)
    }

    return Result.ok()
  }

  async findSubscription(request?: any): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
    const response = await this.contentManagerRepository.get<any>(GraphQLQueries.GET_WEB_PUSH_SUBSCRIPTION_LIST, request, { revalidate: CacheConstants.ONE_HOUR })

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

  async saveSubscription(request?: any): Promise<Result<void, SaveWebPushSubscriptionResult>> {
    const response = await this.contentManagerRepository.get<any>(GraphQLQueries.CREATE_WEB_PUSH_SUBSCRIPTION, request)

    if (response.IsError) {
      return response.transferError(SaveWebPushSubscriptionResult.ERROR)
    }

    return Result.ok()
  }
}