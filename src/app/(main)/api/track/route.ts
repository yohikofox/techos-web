import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import PostStats from "@/business/model/postStats";
import { PostStatsResult } from "@/business/useCases/updatePostStats";
import { NextRequest, NextResponse } from "next/server"

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


