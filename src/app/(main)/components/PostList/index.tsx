import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";
// import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { SearchDataResult, SearchRequest } from "R/src/application/getSearchData";
import Search, { SearchItem } from "R/src/domain/search";

import { getDefaultAd } from "./parts/DefaultAd";
import ServerSidePostCollection from "./parts/ServerSidePostCollection";

const ADS_POSITION_LIST: number[] = []; //3, 13
const DEFAULT_PAGE_SIZE = 3 * 4 - ADS_POSITION_LIST.length;
const DEFAULT_PAGE_INDEX = 0;


export interface PostListProps {
  title?: string
  page?: number,
  query?: Record<string, string | string[]>
}

export default async function PostListRender({ title, page, query }: PostListProps) {
  const validatedPage = page && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX
  const index = validatedPage * DEFAULT_PAGE_SIZE
  const limit = DEFAULT_PAGE_SIZE

  // const postListUseCase = await UseCaseFactory.Instance.getUseCase<PostListRequest, PostList, PostListResult>(UseCaseOption.GET_POST_LIST);
  // const postListResponse = await postListUseCase?.execute({ index, limit });

  const postListUseCase = await UseCaseFactory.Instance.getUseCase<SearchRequest, Search, SearchDataResult>(UseCaseOption.GET_SEARCH_DATA)

  const postListResponse = await postListUseCase.execute({
    indexName: 'post',
    filter: query,
    limit,
    offset: index,
  })//|| searchResponse.IsError

  if (postListResponse.IsError) {
    redirect('/error/400')
  }

  const def = await getDefaultAd();

  const postCollection = postListResponse.Value.hits //postListResponse.Value.posts

  const meta: any = {
    pagination: {
      page: validatedPage + 1,
      pageCount: Math.ceil(postListResponse.Value.estimatedTotalHits / limit),
      pageSize: limit,
      total: postListResponse.Value.estimatedTotalHits,
    }
  }

  const posts: SearchItem[] = [];
  let insertedAdCount = 0;
  const slimit = postCollection.length + ADS_POSITION_LIST.length;

  for (let i = 0; i < slimit; i++) {
    if (ADS_POSITION_LIST.includes(i)) {
      posts.push(def);
      insertedAdCount++;
    }

    if (!postCollection[i]) continue

    const p = postCollection[i];
    posts.push(p);
  }

  return (
    <>
      <ServerSidePostCollection
        posts={posts}
        facets={postListResponse.Value.facets}
      />
    </>
  )
}