import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import PostStats from "@domain/postStats";
import { NextRequest, NextResponse } from "next/server"
import { PostStatsResult } from "@app/getPostStats";

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data) {
    return badRequest();
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<any, PostStats, PostStatsResult>(UseCaseOption.UPDATE_POST_STATS);

  const response = await useCase?.execute({ slug: { "eq": data.slug } });

  if (response.IsError) {
    console.error('response.Error:', response)
    return badRequest()
  }

  return NextResponse.json(response.Value)
}


