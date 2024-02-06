// import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { PostListResult } from "@app/getPostList";
import { PostListRequest } from "@app/requests/postList.request";
import PostList from "@domain/postList";
import { SearchItem } from "@domain/search";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";

import { getDefaultAd } from "./parts/DefaultAd";
import ServerSidePostCollection from "./parts/ServerSidePostCollection";

const ADS_POSITION_LIST: number[] = []; //3, 13
const DEFAULT_PAGE_SIZE = 3 * 4 - ADS_POSITION_LIST.length;
const DEFAULT_PAGE_INDEX = 0;

export interface PostListProps {
  title?: string;
  page?: number;
  query?: Record<string, string | string[]>;
}

export default async function PostListRender({ page, query }: PostListProps) {
  const validatedPage =
    page !== undefined && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX;
  const index = validatedPage * DEFAULT_PAGE_SIZE;
  const limit = DEFAULT_PAGE_SIZE;

  const postListUseCase = await UseCaseFactory.Instance.getUseCase<
    PostListRequest,
    PostList,
    PostListResult
  >(UseCaseOption.GET_POST_LIST);
  const postListResponse = await postListUseCase?.execute({
    filter: query,
    limit,
    offset: index,
  } as PostListRequest);

  if (postListResponse.IsError) {
    console.error("Error:", postListResponse.Result);
    redirect("/error/400");
  }

  const def = await getDefaultAd();

  const postCollection = postListResponse.Value.posts;

  const posts: SearchItem[] = [];
  const slimit = postCollection.length + ADS_POSITION_LIST.length;

  for (let i = 0; i < slimit; i++) {
    if (ADS_POSITION_LIST.includes(i)) {
      posts.push(def);
    }

    if (postCollection[i] === undefined) continue;

    const p = postCollection[i];
    posts.push(p);
  }

  return (
    <>
      <ServerSidePostCollection
        posts={posts}
        meta={postListResponse.Value.meta}
        // facets={postListResponse.Value.facets}
      />
    </>
  );
}
