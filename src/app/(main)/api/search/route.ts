import { SearchDataResult, SearchRequest } from "@app/getSearchData";
import Search from "@domain/search";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { NextRequest, NextResponse } from "next/server"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest) {

  const payload = request.nextUrl.searchParams.get("payload");
  const index = request.nextUrl.searchParams.get("index");

  if (!index) {
    return badRequest();
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<SearchRequest, Search, SearchDataResult>(UseCaseOption.GET_SEARCH_DATA)

  const response = await useCase.execute({ payload: payload || '', indexName: index })

  if (response.IsError) {
    console.error('response.Error:', response)
    return badRequest()
  }

  return NextResponse.json(response.Value)
}


