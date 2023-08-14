import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import PostList from "../model/postList";
import { Result } from "../result";
import { IPostService } from "../services/post.service";
import { IUseCase } from "../useCaseFactory";

export enum TagPostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
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
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_POST_LIST, request)

    if (response.IsError) {
      return response.transferError(TagPostListResult.ERROR)
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