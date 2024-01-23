import WebPushNotification from "@domain/webPushNotification"
import { PictureData } from "@dto/picture.dto"
import { NotificationData, WebPushNotificationData, WebPushNotificationDataResponse } from "@dto/web-push-notification.dto"
import { IImageSetService, ImageSetOptions, ImageSetPreset } from "./imageSet.service"

export interface IWebPushNotificationService {
  mapToWebPushNotification(data: any): Promise<WebPushNotification>
}

export default class WebPushNotificationService implements IWebPushNotificationService {
  constructor(private imageSetService: IImageSetService) { }
  async mapToWebPushNotification(data: WebPushNotificationData): Promise<WebPushNotification> {
    const result = {
      title: data.title,
      body: data.body,
      badge: await this.imageSetService.mapImageSet(
        data.badge satisfies PictureData,
        { preset: ImageSetPreset.THUMBNAIL } satisfies ImageSetOptions),
      image: await this.imageSetService.mapImageSet(
        data.image satisfies PictureData,
        { preset: ImageSetPreset.LARGE } satisfies ImageSetOptions),
      icon: await this.imageSetService.mapImageSet(
        data.icon satisfies PictureData,
        { preset: ImageSetPreset.THUMBNAIL } satisfies ImageSetOptions),
      tag: data.tag,
      data: data.data as any,
      actions: await Promise.all(data.actions.map(async (action: NotificationData) => {
        return {
          action: action.action,
          title: action.title,
          icon: await this.imageSetService.mapImageSet(
            action.icon satisfies PictureData,
            { preset: ImageSetPreset.THUMBNAIL } satisfies ImageSetOptions
          )
        }
      })),
      dir: data.dir,
      lang: data.lang,
      url: data.url
    } as WebPushNotification

    return result
  }
}