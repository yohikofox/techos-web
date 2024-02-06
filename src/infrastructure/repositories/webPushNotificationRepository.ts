import {
  GetWebPushNotificationRequest,
  WebPushNotificationResult,
} from "@app/getNotification";
import WebPushNotification from "@domain/webPushNotification";
import {
  notificationSchema,
  WebPushNotificationData,
  WebPushNotificationDataResponse,
} from "@dto/web-push-notification.dto";
import { IWebPushNotificationService } from "@infra/services/web-push-notification.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IWebPushNotificationRepository } from "@interfaces/IWebPushNotificationRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class WebPushNotificationRepository
  implements IWebPushNotificationRepository
{
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private webPushNotificationService: IWebPushNotificationService
  ) {}

  async findOneWebPushNotification(
    request: GetWebPushNotificationRequest
  ): Promise<Result<WebPushNotification, WebPushNotificationResult>> {
    const response = await this.contentManagerRepository.get<
      WebPushNotificationDataResponse,
      {
        notificationId: string;
      }
    >(
      GraphQLQueries.GET_WEB_PUSH_NOTIFICATION,
      {
        notificationId: request.notificationId!.toString(),
      },
      {
        revalidate: CacheConstants.ONE_HOUR,
        tags: [RevalidateTagConstants.NOTIFICATION],
        schema: notificationSchema,
      }
    );

    if (response.IsError) {
      return response.transferError(WebPushNotificationResult.ERROR);
    }

    if (response.Value.webPushNotification === undefined) {
      return response.transferError(WebPushNotificationResult.NO_DATA_FOUND);
    }

    const result =
      await this.webPushNotificationService.mapToWebPushNotification(
        response.Value.webPushNotification.data
          .attributes satisfies WebPushNotificationData
      );

    return Result.ok(result);
  }
}
