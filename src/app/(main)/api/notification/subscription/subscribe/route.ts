import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import GraphQLConstants from "@/infrastructure/adapter/constants";

const badRequest = (message?: string) =>
  new Response(message !== undefined ? message : "Bad Request", {
    status: 400,
  });

export const dynamic = "force-dynamic";

const subscriptionSaveSchema = z.object({
  endpoint: z.string().url(),
  expirationTime: z.string().optional(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const subscriptionSave = subscriptionSaveSchema.safeParse(body);

  if (!subscriptionSave.success) {
    return badRequest(subscriptionSave.error.message);
  }

  const data = subscriptionSave.data;

  const useCase = await UseCaseFactory.Instance.getUseCase(
    UseCaseOption.SAVE_WEB_PUSH_SUBSCRIPTION
  );

  const response = await useCase.execute({
    data: {
      endpoint: data.endpoint,
      p256dh: data.keys.p256dh,
      auth: data.keys.auth,
      expiration_time: data.expirationTime,
      publishedAt: dayjs().format(GraphQLConstants.GRAPHQL_DATE_FORMAT),
    },
  });

  const res = NextResponse.json({ message: response.Result });

  return res;
}
