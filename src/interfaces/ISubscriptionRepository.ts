import {
  DeleteSubscriptionRequest,
  DeleteSubscriptionUseCaseResult,
} from "@app/deleteSubscription";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import { SaveWebPushSubscriptionResult } from "@app/saveSubscription";
import WebPushSubscription from "@domain/webPushSubscription";
import { Result } from "@lib/result";

export interface ISubscriptionRepository {
  deleteSubscription(
    request?: DeleteSubscriptionRequest
  ): Promise<Result<void, DeleteSubscriptionUseCaseResult>>;
  findSubscription(
    request?: void
  ): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>>;
  saveSubscription(
    request?: void
  ): Promise<Result<void, SaveWebPushSubscriptionResult>>;
}
