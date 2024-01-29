import { TagInfosRequest, TagInfosResult } from "@app/getTagInfos";
import { TagPostListRequest, TagPostListResult } from "@app/getTagPostList";
import PostList from "@domain/postList";
import Tag from "@domain/tag";
import {
  PostData,
  PostListResponse,
  postListResponseSchema,
} from "@dto/post.dto";
import { TagInfosResponse } from "@dto/tag.dto";
import { IPostService } from "@infra/services/post.service";
import { ITagService } from "@infra/services/tag.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { ITagRepository } from "@interfaces/ITagRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";
import { IMetaService } from "@services/meta.service";

export default class TagRepository implements ITagRepository {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private tagService: ITagService,
    private postService: IPostService,
    private metaService: IMetaService
  ) {}

  async findTag(
    request?: TagInfosRequest
  ): Promise<Result<Tag, TagInfosResult>> {
    const response = await this.cmsRepository.get<
      TagInfosResponse,
      TagInfosRequest
    >(GraphQLQueries.GET_TAG_INFOS, request, {
      revalidate: CacheConstants.ONE_HOUR,
    });

    if (response.IsError) {
      return response.transferError(TagInfosResult.ERROR);
    }

    if (response.Value.tags === undefined) {
      return response.transferError(TagInfosResult.NO_DATA_FOUND);
    }

    const tag = response.Value.tags.data[0];

    const result = await this.tagService.mapTag(tag);

    return Result.ok(result);
  }

  async findTagPostList(
    request?: TagPostListRequest
  ): Promise<Result<PostList, TagPostListResult>> {
    const response = await this.cmsRepository.get<
      PostListResponse,
      TagPostListRequest
    >(GraphQLQueries.GET_TAG_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.TAG, RevalidateTagConstants.POST],
      schema: postListResponseSchema,
    });

    if (response.IsError) {
      return response.transferError(TagPostListResult.ERROR);
    }

    if (response.Value.posts === undefined) {
      return response.transferError(TagPostListResult.NO_DATA_FOUND);
    }

    const result: PostList = {
      posts: await Promise.all(
        response.Value.posts.data.map(
          async (post: PostData) =>
            await this.postService.mapPost(post satisfies PostData)
        )
      ),
      meta: await this.metaService.mapMeta(response.Value.posts.meta),
    };

    return Result.ok(result);
  }
}
