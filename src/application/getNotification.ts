import WebPushNotification from "@domain/webPushNotification";
import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@/lib/result";
import { IWebPushNotificationRepository } from "@interfaces/IWebPushNotificationRepository";

export enum WebPushNotificationResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export interface GetWebPushNotificationRequest {
  notificationId?: number
}

export default class GetWebPushNotificationUseCase implements IUseCase<GetWebPushNotificationRequest, Result<WebPushNotification, WebPushNotificationResult>> {
  constructor(
    private webPushNotificationRepository: IWebPushNotificationRepository,
  ) { }

  async execute(request?: GetWebPushNotificationRequest | undefined): Promise<Result<WebPushNotification, WebPushNotificationResult>> {
    return await this.webPushNotificationRepository.findOneWebPushNotification(request)
  }
}