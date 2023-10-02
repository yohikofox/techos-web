import Container from "@/infrastructure/dependencyFactory";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import WebPushSubscription from "@/business/model/webPushSubscription";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { GetWebPushSubscriptionListResult } from "@/business/useCases/getSubscriptionList";
import { NextRequest, NextResponse } from "next/server"
import webpush, { WebPushError } from 'web-push'

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function POST(request: NextRequest, params: any) {

  const body = await request.json()

  const { notificationId } = body

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const publicKey = await configManager.get('WEB_PUSH_PUBLIC_KEY');
  const privateKey = await configManager.get('WEB_PUSH_PRIVATE_KEY');

  webpush.setVapidDetails(
    'mailto:yoann.lorho@thetribe.io',
    publicKey,
    privateKey
  )

  const getSubscriptionUseCase = await UseCaseFactory.Instance.getUseCase<any, WebPushSubscription[], GetWebPushSubscriptionListResult>(UseCaseOption.GET_WEB_PUSH_SUBSCRIPTION_LIST)
  const getNotificationUseCase = await UseCaseFactory.Instance.getUseCase<any, any, any>(UseCaseOption.GET_NOTIFICATION)
  const deleteSubscriptionUseCase = await UseCaseFactory.Instance.getUseCase<any, any, any>(UseCaseOption.DELETE_WEB_PUSH_SUBSCRIPTION)

  const notificationResponse = await getNotificationUseCase.execute({ notificationId })
  const subscriptionsResponse = await getSubscriptionUseCase.execute()

  if (notificationResponse.IsError || subscriptionsResponse.IsError) {
    console.warn('/api/notification/notify', subscriptionsResponse.Result, notificationResponse.Result)
    return badRequest(subscriptionsResponse.Message)
  }

  const payload = JSON.stringify(notificationResponse.Value)

  const results = await Promise.all(subscriptionsResponse.Value.map(async (subscription, index) => {
    try {
      await webpush.sendNotification(subscription, payload)
    } catch (error) {
      if ((error as WebPushError).statusCode === 410) {
        await deleteSubscriptionUseCase.execute({ data: { subscriptionId: subscription.id } })
        console.info('Subscription deleted', subscription.id)
      } else {
        console.error("Route error", error)
      }
    }
  }))

  const res = NextResponse.json({ results })

  return res
}


