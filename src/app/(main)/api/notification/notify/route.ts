import {
  DeleteSubscriptionRequest,
  DeleteSubscriptionUseCaseResult,
} from "@app/deleteSubscription";
import {
  GetWebPushNotificationRequest,
  WebPushNotificationResult,
} from "@app/getNotification";
import { GetWebPushSubscriptionListResult } from "@app/getSubscriptionList";
import WebPushNotification from "@domain/webPushNotification";
import WebPushSubscription from "@domain/webPushSubscription";
import { IConfigManager } from "@infra/adapter/configManager";
import { IOC } from "@infra/container";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { NextRequest, NextResponse } from "next/server";
import webpush, { WebPushError } from "web-push";

const badRequest = (message?: string) =>
  new Response(message !== undefined ? message : "Bad Request", {
    status: 400,
  });

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { notificationId } = body;

  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");

  //TODO: lock undefined resources

  const publicKey = await configManager.get("WEB_PUSH_PUBLIC_KEY", "");
  const privateKey = await configManager.get("WEB_PUSH_PRIVATE_KEY", "");

  webpush.setVapidDetails(
    "mailto:yoann.lorho@thetribe.io",
    publicKey!,
    privateKey!
  );

  const getSubscriptionUseCase = await UseCaseFactory.Instance.getUseCase<
    void,
    WebPushSubscription[],
    GetWebPushSubscriptionListResult
  >(UseCaseOption.GET_WEB_PUSH_SUBSCRIPTION_LIST);
  const getNotificationUseCase = await UseCaseFactory.Instance.getUseCase<
    GetWebPushNotificationRequest,
    WebPushNotification,
    WebPushNotificationResult
  >(UseCaseOption.GET_NOTIFICATION);
  const deleteSubscriptionUseCase = await UseCaseFactory.Instance.getUseCase<
    DeleteSubscriptionRequest,
    void,
    DeleteSubscriptionUseCaseResult
  >(UseCaseOption.DELETE_WEB_PUSH_SUBSCRIPTION);

  const notificationResponse = await getNotificationUseCase.execute({
    notificationId,
  });
  const subscriptionsResponse = await getSubscriptionUseCase.execute();

  if (notificationResponse.IsError || subscriptionsResponse.IsError) {
    console.warn(
      "/api/notification/notify",
      subscriptionsResponse.Result,
      notificationResponse.Result
    );
    return badRequest(subscriptionsResponse.Message);
  }

  const payload = JSON.stringify(notificationResponse.Value);

  const results = await Promise.all(
    subscriptionsResponse.Value.map(
      async (subscription: WebPushSubscription) => {
        try {
          await webpush.sendNotification(subscription, payload);
        } catch (error) {
          if ((error as WebPushError).statusCode === 410) {
            await deleteSubscriptionUseCase.execute({
              data: { id: subscription.id.toString() },
            } as DeleteSubscriptionRequest);
            console.info("Subscription deleted", subscription.id);
          } else {
            console.error("Route error", error);
          }
        }
      }
    )
  );

  const res = NextResponse.json({ results });

  return res;
}
