import { z } from 'zod'

import { pictureDataSchema } from './picture.dto'

export const notificationSchema = z.object({
  action: z.string(),
  title: z.string(),
  icon: pictureDataSchema,
})

export const webPushNotificationSchema = z.object({
  title: z.string(),
  body: z.string(),
  dir: z.string(),
  lang: z.string(),
  url: z.string(),
  badge: pictureDataSchema,
  image: pictureDataSchema,
  icon: pictureDataSchema,
  tag: z.string(),
  data: z.any(),
  actions: z.array(notificationSchema),
})


export const webPushNotificationDataSchema = z.object({
  webPushNotification: z.object({
    data: z.object({
      attributes: webPushNotificationSchema
    })
  })
})

export type NotificationData = z.infer<typeof notificationSchema>

export type WebPushNotificationDataResponse = z.infer<typeof webPushNotificationDataSchema>

export type WebPushNotificationData = z.infer<typeof webPushNotificationSchema>