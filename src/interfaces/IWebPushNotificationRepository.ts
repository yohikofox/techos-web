import { GetWebPushNotificationRequest, WebPushNotificationResult } from "@app/getNotification";
import WebPushNotification from "@domain/webPushNotification";
import { Result } from "@lib/result";

export interface IWebPushNotificationRepository {
  findOneWebPushNotification(request: GetWebPushNotificationRequest): Promise<Result<WebPushNotification, WebPushNotificationResult>>
}