import { DeleteSubscriptionUseCaseResult } from "@app/deleteSubscription";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import { SaveWebPushSubscriptionResult } from "@app/saveSubscription";
import WebPushSubscription from "@domain/webPushSubscription";
import { Result } from "@lib/result";

export interface ISubscriptionRepository {
  deleteSubscription(request?: any): Promise<Result<void, DeleteSubscriptionUseCaseResult>>
  findSubscription(request?: any): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>>
  saveSubscription(request?: any): Promise<Result<void, SaveWebPushSubscriptionResult>>
}