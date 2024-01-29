import { z } from "zod";

export const webPushSubscriptionSchema = z.object({
  id: z.string(),
  attributes: z.object({
    endpoint: z.string(),
    expiration_time: z.string(),
    p256dh: z.string(),
    auth: z.string(),
  }),
});

export const webPushSubscriptionResponseSchema = z.object({
  webPushSubscriptions: z.object({
    data: z.array(webPushSubscriptionSchema),
  }),
});

export type WebPushSubscriptionResponse = z.infer<
  typeof webPushSubscriptionResponseSchema
>;

export type WebPushSubscriptionData = z.infer<typeof webPushSubscriptionSchema>;
