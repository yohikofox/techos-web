import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import PostList from "../model/postList";
import { IPostService } from "../services/post.service";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";


export enum TagPostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type TagPostListRequest = {
  tag: any
  index?: number
  limit?: number
}

export default class GetTagPostListUseCase implements IUseCase<TagPostListRequest, Result<PostList, TagPostListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService
  ) { }
  async execute(request?: TagPostListRequest): Promise<Result<PostList, TagPostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.TAG, RevalidateTagConstants.POST]
    })

    if (response.IsError) {
      return response.transferError(TagPostListResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(TagPostListResult.NO_DATA_FOUND)
    }

    const result: PostList = {
      posts: await Promise.all(response.Value.posts.data.map(async (post: any) => await this.postService.mapPost(post))),
      meta: {
        pagination: {
          page: response.Value.posts.meta.pagination.page,
          pageSize: response.Value.posts.meta.pagination.pageSize,
          pageCount: response.Value.posts.meta.pagination.pageCount,
          total: response.Value.posts.meta.pagination.total,
        }
      }
    }

    return Result.ok(result)
  }
}