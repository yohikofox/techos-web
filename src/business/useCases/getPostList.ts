import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import PostList from "../model/postList";
import { IUseCase } from "../useCaseFactory";
import { IPostService } from "../services/post.service";
import { Result } from "@/lib/result";

export enum PostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type PostListRequest = {
  index?: number,
  limit?: number
}

export default class GetPostListUseCase implements IUseCase<PostListRequest, Result<PostList, PostListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService
  ) { }
  async execute(request?: PostListRequest): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_LIST, request, { revalidate: 60 * 60 * 1 })

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(PostListResult.NO_DATA_FOUND)
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
