import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import { PostListResult } from "@app/getPostList";
import Post from "@domain/post";
import PostList from "@domain/postList";
import {
  PostData,
  PostDetailsResponse,
  postDetailsResponseSchema,
  PostListResponse,
  postListResponseSchema,
} from "@dto/post.dto";
import { IMetaService } from "@infra/services/meta.service";
import { IPostService } from "@infra/services/post.service";
import {
  ContentManagerFilter,
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IPostRepository } from "@interfaces/IPostRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";
import { PostListRequest } from "R/src/application/requests/postList.request";

export default class PostRepository implements IPostRepository {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService,
    private metaService: IMetaService
  ) {}

  async findOnePost(
    request?: PostDetailsRequest
  ): Promise<Result<Post, PostDetailsResult>> {
    if (request?.slug === undefined)
      return Result.error(PostDetailsResult.BAD_REQUEST);

    const req = {
      slug: request.slug,
    };

    const response = await this.cmsRepository.get<
      PostDetailsResponse,
      {
        slug: ContentManagerFilter;
      }
    >(GraphQLQueries.GET_POST_DETAILS, req, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: postDetailsResponseSchema,
    });

    if (response.IsError === true) {
      return response.transferError(PostDetailsResult.ERROR);
    }

    if (
      response.Value.posts === undefined ||
      response.Value.posts.items.length <= 0
    ) {
      return response.transferError(PostDetailsResult.NO_DATA_FOUND);
    }

    if (response.Value.posts.items.length !== 1) {
      return response.transferError(PostDetailsResult.NOT_UNIQUE_CONTENT);
    }

    const result: Post = await this.postService.mapPost(
      response.Value.posts.items[0]
    );

    return Result.ok(result);
  }

  async findPostList(
    request?: PostListRequest
  ): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<
      PostListResponse,
      PostListRequest
    >(GraphQLQueries.GET_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: postListResponseSchema,
    });

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR);
    }

    if (response.Value.posts === undefined) {
      return response.transferError(PostListResult.NO_DATA_FOUND);
    }

    const result: PostList = {
      posts: await Promise.all(
        response.Value.posts.items.map((post: PostData) => {
          return this.postService.mapPost(post);
        })
      ),
      meta: await this.metaService.mapMeta(response.Value.posts.meta),
    };

    return Result.ok(result);
  }
}
