import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem"
import { IPostService } from "@infra/services/post.service"
import { Result } from "@lib/result"
import Post from "@domain/post"
import Meta from "@domain/meta"
import { PostDetailsResult } from "@app/getPostDetails"
import { PostData, PostDetailsResponse, PostListResponse, postDetailsResponseSchema, postListResponseSchema } from "@dto/post.dto"
import CacheConstants from "@lib/constants/cache"
import RevalidateTagConstants from "@lib/constants/revalidateTag"
import { IPostRepository } from "@interfaces/IPostRepository"
import { PostListResult } from "@app/getPostList"
import PostList from "@domain/postList"
import { IMetaService } from "@infra/services/meta.service"

export default class PostRepository implements IPostRepository {

  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService,
    private metaService: IMetaService,
  ) { }

  async findOnePost(request?: any): Promise<Result<Post, PostDetailsResult>> {
    const response = await this.cmsRepository.get<PostDetailsResponse>(GraphQLQueries.GET_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: postDetailsResponseSchema
    })

    if (response.IsError) {
      return response.transferError(PostDetailsResult.ERROR)
    }

    if (!response.Value.posts?.data || response.Value.posts.data.length <= 0) {
      return response.transferError(PostDetailsResult.NO_DATA_FOUND)
    }

    if (response.Value.posts.data.length !== 1) {
      return response.transferError(PostDetailsResult.NOT_UNIQUE_CONTENT)
    }

    const result: Post = await this.postService.mapPost(response.Value.posts.data[0] satisfies PostData)

    return Result.ok(result)
  }

  async findPostList(request?: any): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<PostListResponse>(GraphQLQueries.GET_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: postListResponseSchema
    })

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(PostListResult.NO_DATA_FOUND)
    }

    const result: PostList = {
      posts: await Promise.all(response.Value.posts.data.map(async (post: any) => await this.postService.mapPost(post satisfies PostData))),
      meta: await this.metaService.mapMeta(response.Value.posts.meta satisfies Meta)
    }

    return Result.ok(result)
  }
}