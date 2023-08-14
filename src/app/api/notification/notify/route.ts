import Container from "@/business/dependencyFactory";
import { IConfigManager } from "@/business/infrastructure/adapter/configManager";
import WebPushSubscription from "@/business/model/webPushSubscription";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { GetWebPushSubscriptionListResult } from "@/business/useCases/getSubscriptionList";
import { NextRequest, NextResponse } from "next/server"
import webpush from 'web-push'

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

  const notificationResponse = await getNotificationUseCase.execute({ notificationId })

  const subscriptionsResponse = await getSubscriptionUseCase.execute()

  if (notificationResponse.IsError || subscriptionsResponse.IsError) {
    return badRequest(subscriptionsResponse.Message)
  }

  const payload = JSON.stringify(notificationResponse.Value)

  for (const subscription of subscriptionsResponse.Value) {
    try {
      await webpush.sendNotification(subscription, payload)
    } catch (error) {
      console.error(error)
    }
  }

  const res = NextResponse.json({ api_key: publicKey })

  return res
}


