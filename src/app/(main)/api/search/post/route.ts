import { SearchRequest } from "@app/getSearchData";
import { MicroPostListRequest } from "@app/requests/microPostList.request";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { NextRequest, NextResponse } from "next/server";
import { PostListResult } from "R/src/application/getPostList";
import PostList from "R/src/domain/postList";

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
    PostList,
    PostListResult
  >(UseCaseOption.GET_POST_LIST);

  const response = await useCase.execute({
    payload: payload !== undefined ? payload : "",
    indexName: index,
    limit: 10,
  } as SearchRequest);

  if (response.IsError) {
    console.error("response.Error:", response);
    return badRequest();
  }

  return NextResponse.json(response.Value);
}
