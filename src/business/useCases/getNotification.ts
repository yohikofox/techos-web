import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import WebPushNotification from "../model/webPushNotification";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import { IWebPushNotificationService } from "../services/web-push-notification.service";
import { WebPushNotificationData, WebPushNotificationDataResponse, notificationSchema } from "../services/dto/web-push-notification.dto";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";


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
    private cmsRepository: IContentManagerSystemRepository,
    private webPushNotificationService: IWebPushNotificationService
  ) { }

  async execute(request?: GetWebPushNotificationRequest | undefined): Promise<Result<WebPushNotification, WebPushNotificationResult>> {
    const response = await this.cmsRepository.get<WebPushNotificationDataResponse>(GraphQLQueries.GET_WEB_PUSH_NOTIFICATION, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.NOTIFICATION],
      schema: notificationSchema
    })

    if (response.IsError) {
      return response.transferError(WebPushNotificationResult.ERROR)
    }

    if (!response.Value.webPushNotification) {
      return response.transferError(WebPushNotificationResult.NO_DATA_FOUND)
    }

    const result = await this.webPushNotificationService.mapToWebPushNotification(
      response.Value.webPushNotification.data.attributes satisfies WebPushNotificationData
    )

    return Result.ok(result)
  }
}