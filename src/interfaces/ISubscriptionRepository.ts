import { DeleteSubscriptionUseCaseResult } from "@app/deleteSubscription";
import { Result } from "@lib/result";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import WebPushSubscription from "@domain/webPushSubscription";
import { SaveWebPushSubscriptionResult } from "@app/saveSubscription";

export interface ISubscriptionRepository {
  deleteSubscription(request?: any): Promise<Result<void, DeleteSubscriptionUseCaseResult>>
  findSubscription(request?: any): Promise<Result<WebPushSubscription[], GetWebPushSubscriptionListResult>>
  saveSubscription(request?: any): Promise<Result<void, SaveWebPushSubscriptionResult>>
}