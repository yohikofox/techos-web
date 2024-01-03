import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import PostList from "../model/postList";
import { IUseCase } from "../useCaseFactory";
import { IPostService } from "../services/post.service";
import { Result } from "@/lib/result";
import CacheConstants from "@/lib/constants/cache";
import RevalidateTagConstants from "@/lib/constants/revalidateTag";
import { PostListData, postListDataSchema } from "../services/dto/post.dto";
import { IMetaService } from "../services/meta.service";

export enum PostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type PostListRequest = {
  index?: number,
  limit?: number,
  sort?: string
}

export default class GetPostListUseCase implements IUseCase<PostListRequest, Result<PostList, PostListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService,
    private metaService: IMetaService
  ) { }
  async execute(request?: PostListRequest): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<PostListData>(GraphQLQueries.GET_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: postListDataSchema
    })

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(PostListResult.NO_DATA_FOUND)
    }

    const result: PostList = {
      posts: await Promise.all(response.Value.posts.data.map(async (post: any) => await this.postService.mapPost(post))),
      meta: await this.metaService.mapMeta(response.Value.posts.meta)
    }

    return Result.ok(result)
  }
}
