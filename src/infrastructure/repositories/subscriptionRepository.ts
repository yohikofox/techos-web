import {
  DeleteSubscriptionRequest,
  DeleteSubscriptionUseCaseResult,
} from "@app/deleteSubscription";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import { SaveWebPushSubscriptionResult } from "@app/saveSubscription";
import WebPushSubscription from "@domain/webPushSubscription";
import {
  WebPushSubscriptionData,
  WebPushSubscriptionResponse,
} from "@dto/web-push-subscriptions.dto";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { ISubscriptionRepository } from "@interfaces/ISubscriptionRepository";
import CacheConstants from "@lib/constants/cache";
import { Result } from "@lib/result";

export default class SubscriptionRepository implements ISubscriptionRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository
  ) {}
  async deleteSubscription(
    request?: DeleteSubscriptionRequest
  ): Promise<Result<void, DeleteSubscriptionUseCaseResult>> {
    const response = await this.contentManagerRepository.get(
      GraphQLQueries.DELETE_WEB_PUSH_SUBSCRIPTION,
      request?.data
    );

    if (response.IsError) {
      return response.transferError(DeleteSubscriptionUseCaseResult.ERROR);
    }

    return Result.ok();
  }

  async findSubscription(
    request?: void
  ): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>> {
    const response = await this.contentManagerRepository.get<
      WebPushSubscriptionResponse,
      void
    >(GraphQLQueries.GET_WEB_PUSH_SUBSCRIPTION_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
    });

    if (response.IsError) {
      return response.transferError(GetWebPushSubscriptionListResult.ERROR);
    }

    if (response.Value.webPushSubscriptions === undefined) {
      return response.transferError(
        GetWebPushSubscriptionListResult.NO_DATA_FOUND
      );
    }

    const results = response.Value.webPushSubscriptions.data.map(
      (item: WebPushSubscriptionData) => {
        return {
          id: Number(item.id),
          endpoint: item.attributes.endpoint,
          expirationTime: item.attributes.expiration_time,
          keys: {
            auth: item.attributes.auth,
            p256dh: item.attributes.p256dh,
          },
        } as WebPushSubscription;
      }
    );

    return Result.ok(results);
  }

  async saveSubscription(
    request: WebPushSubscription
  ): Promise<Result<void, SaveWebPushSubscriptionResult>> {
    const response = await this.contentManagerRepository.get<
      WebPushSubscription,
      WebPushSubscription
    >(GraphQLQueries.CREATE_WEB_PUSH_SUBSCRIPTION, request);

    if (response.IsError) {
      return response.transferError(SaveWebPushSubscriptionResult.ERROR);
    }

    return Result.ok();
  }
}
