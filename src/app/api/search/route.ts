import SearchData from "@/business/model/searchData";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { SearchDataResult, SearchRequest } from "@/business/useCases/getSearchData";
import { NextRequest, NextResponse } from "next/server"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest) {

  const payload = request.nextUrl.searchParams.get("payload");

  if (!payload) {
    return badRequest();
  }

  const useCase = await UseCaseFactory.Instance.get<SearchRequest, SearchData, SearchDataResult>(UseCaseOption.GET_SEARCH_DATA)

  const response = await useCase.execute({ payload })

  if (response.IsError) {
    console.error('response.Error:', response)
    return badRequest()
  }

  return NextResponse.json(response.Value)
}


