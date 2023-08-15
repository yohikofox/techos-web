import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import WebPushNotification from "../model/webPushNotification";
import { Result } from "../result";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";

export enum WebPushNotificationResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface GetWebPushNotificationRequest {
  notificationId?: number
}

export default class GetWebPushNotificationUseCase implements IUseCase<GetWebPushNotificationRequest, Result<WebPushNotification, WebPushNotificationResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService,
  ) { }

  async execute(request?: GetWebPushNotificationRequest | undefined): Promise<Result<WebPushNotification, WebPushNotificationResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_WEB_PUSH_NOTIFICATION, request)

    if (response.IsError) {
      return response.transferError(WebPushNotificationResult.ERROR)
    }

    const data = response.Value.webPushNotification.data.attributes

    const result = {
      title: data.title,
      body: data.body,
      badge: (await this.imageSetService.mapImageSet(data.badge.data.attributes.formats.thumbnail)).src,
      image: (await this.imageSetService.mapImageSet(data.image.data.attributes.formats.large)).src,
      icon: (await this.imageSetService.mapImageSet(data.icon.data.attributes.formats.thumbnail)).src,
      tag: data.tag,
      data: data.data as any,
      actions: await Promise.all(data.actions.map(async (action: any) => {
        return {
          action: action.action,
          title: action.title,
          icon: (await this.imageSetService.mapImageSet(action.icon.data.attributes.formats.thumbnail)).src
        }
      })),
      dir: data.dir,
      lang: data.lang,
      url: data.url
    } as WebPushNotification

    return Result.ok(result)
  }
}