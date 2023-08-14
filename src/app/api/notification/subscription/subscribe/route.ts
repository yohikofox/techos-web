import Container from "@/business/dependencyFactory";
import { IConfigManager } from "@/business/infrastructure/adapter/configManager";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })


const subscriptionSaveSchema = z.object({
  endpoint: z.string().url(),
  expirationTime: z.string().nullable().optional(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  })
})


export async function POST(request: NextRequest, params: any) {

  const body = await request.json();

  const subscriptionSave = subscriptionSaveSchema.safeParse(body);

  if (!subscriptionSave.success) {
    return badRequest(subscriptionSave.error.message)
  }

  const data = subscriptionSave.data

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const useCase = await UseCaseFactory.Instance.getUseCase(UseCaseOption.SAVE_WEB_PUSH_SUBSCRIPTION)

  const response = await useCase.execute({
    data: {
      endpoint: data.endpoint,
      p256dh: data.keys.p256dh,
      auth: data.keys.auth,
      expiration_time: data.expirationTime,
    }
  })

  const res = NextResponse.json({ message: response.Result })

  return res
}


