import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem";
import { ITagService } from "@infra/services/tag.service";
import { Result } from "@lib/result";
import { TagInfosResult } from "@app/getTagInfos";
import Tag from "@domain/tag";
import { ITagRepository } from "@interfaces/ITagRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { TagPostListResult } from "@app/getTagPostList";
import PostList from "@domain/postList";
import { IPostService } from "@infra/services/post.service";
import { PostData, postListResponseSchema } from "@dto/post.dto";

export default class TagRepository implements ITagRepository {

  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private tagService: ITagService,
    private postService: IPostService,
  ) { }

  async findTag(request?: any): Promise<Result<Tag, TagInfosResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_INFOS, request,
      {
        revalidate: CacheConstants.ONE_HOUR
      })

    if (response.IsError) {
      return response.transferError(TagInfosResult.ERROR)
    }

    if (!response.Value.tags) {
      return response.transferError(TagInfosResult.NO_DATA_FOUND)
    }

    const tag = response.Value.tags.data[0]

    const result = await this.tagService.mapTag(tag)

    return Result.ok(result)
  }

  async findTagPostList(request?: any): Promise<Result<PostList, TagPostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.TAG, RevalidateTagConstants.POST],
      schema: postListResponseSchema
    })

    if (response.IsError) {
      return response.transferError(TagPostListResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(TagPostListResult.NO_DATA_FOUND)
    }

    const result: PostList = {
      posts: await Promise.all(response.Value.posts.data.map(async (post: PostData) => await this.postService.mapPost(post satisfies PostData))),
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