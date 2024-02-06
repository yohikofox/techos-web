import { SearchDataResult, SearchRequest } from "@app/getSearchData";
import { MicroPostListRequest } from "@app/requests/microPostList.request";
import Search from "@domain/search";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { NextRequest, NextResponse } from "next/server";

const badRequest = (message?: string) =>
  new Response(message !== undefined ? message : "Bad Request", {
    status: 400,
  });

export async function GET(request: NextRequest) {
  const payload = request.nextUrl.searchParams.get("payload");
  const index = request.nextUrl.searchParams.get("index");

  if (index === undefined) {
    return badRequest();
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<
    MicroPostListRequest,
    Search,
    SearchDataResult
  >(UseCaseOption.GET_MICRO_POST_LIST);

  const response = await useCase.execute({
    payload: payload !== undefined ? payload : "",
    indexName: index,
  } as SearchRequest);

  if (response.IsError) {
    console.error("response.Error:", response);
    return badRequest();
  }

  return NextResponse.json(response.Value);
}
