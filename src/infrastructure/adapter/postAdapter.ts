import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import { PostListResult } from "@app/getPostList";
import { PostListRequest } from "@app/requests/postList.request";
import { FacetConfig } from "@domain/facetConfig";
import Post from "@domain/post";
import PostList from "@domain/postList";
import { PostData } from "@dto/post.dto";
import {
  SearchPostResponse,
  searchPostResponseSchema,
} from "@dto/searchPost.dto";
import { TagData } from "@dto/tag.dto";
import {
  ISearchEngineRepository,
  SearchFetchOptions,
} from "@infra/repositories/baseSearchEngineRepository";
import { IPostService } from "@infra/services/post.service";
import { ISearchService } from "@infra/services/search.service";
import { IPostRepository } from "@interfaces/IPostRepository";
import {
  IndexNames,
  ISearchRepository,
  SearchEngineVariables,
} from "@interfaces/ISearchRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class PostAdapter implements IPostRepository {
  private indexName: IndexNames;
  constructor(
    private postSearchRepository: ISearchEngineRepository<SearchPostResponse>,
    private searchRepository: ISearchRepository,
    private searchService: ISearchService,
    private postService: IPostService
  ) {
    this.indexName = IndexNames.POST;
  }

  findOnePost(
    request?: PostDetailsRequest | undefined
  ): Promise<Result<Post, PostDetailsResult>> {
    // const opts: SearchFetchOptions = {
    //   revalidate: CacheConstants.ONE_MINUTE,
    //   tags: [RevalidateTagConstants.SEARCH],
    //   facets: facetListResponse.Value.map((f: FacetConfig) => f.label),
    //   limit: request.limit!,
    //   offset: request.offset!,
    // };

    // if (opts.limit === 0) {
    //   console.warn("limit is 0, returning empty search");
    //   return Result.ok();
    // }
    // const response = await this.postRepository.search({})
    throw new Error("Method not implemented.");
  }
  async findPostList(
    request: PostListRequest
  ): Promise<Result<PostList, PostListResult>> {
    const facetListResponse =
      await this.searchRepository.getFilterableAttributes(this.indexName);

    if (facetListResponse.IsError) {
      console.error(
        "🚀 ~ PostAdapter ~ facetListResponse:",
        facetListResponse.Result
      );
      return facetListResponse.transferError(PostListResult.NO_DATA_FOUND);
    }

    const req: SearchEngineVariables = {
      indexName: this.indexName,
      payload: "",
    };

    if (request?.payload !== undefined) {
      req.payload = request.payload;
    }
    const filters = await this.searchService.createFiltersString(
      request.filter
    );

    if (filters !== undefined) {
      req.filters = filters;
    }

    const opts: SearchFetchOptions = {
      revalidate: CacheConstants.ONE_MINUTE,
      tags: [RevalidateTagConstants.SEARCH],
      facets: facetListResponse.Value.map((f: FacetConfig) => f.label),
      limit: request.limit === undefined ? 0 : request.limit,
      offset: request.index === undefined ? 0 : request.index,
      schema: searchPostResponseSchema,
    };

    if (opts.limit === 0) {
      console.warn("limit is 0, returning empty search");
      return Result.ok();
    }

    const searchEngineResponse = await this.postSearchRepository.search(
      req,
      opts
    );

    const posts: Post[] = await Promise.all(
      searchEngineResponse.Value.hits.map(async (h) => {
        const item: PostData = {
          id: h.id.toString(),
          attributes: {
            author: {
              data: {
                attributes: {
                  username: h.author.username,
                  avatar: {
                    data: {
                      attributes: h.author.avatar,
                    },
                  },
                },
              },
            },
            content: h.content,
            title: h.title,
            post_stat_list: {
              data: {
                id: h.post_stat_list.id.toString(),
                attributes: {
                  view_count: h.post_stat_list.view_count,
                },
              },
            },
            slug: h.slug,
            start_at: h.start_at,
            tags: {
              data: h.tags.map((t) => {
                const tag: TagData = {
                  attributes: {
                    background_color: t.background_color,
                    color: t.color,
                    label: t.label,
                    slug: t.slug,
                  },
                };
                return tag;
              }),
            },
          },
        };
        return this.postService.mapPost(item);
      })
    );

    const result: PostList = {
      posts,
      meta: {
        pagination: {
          total: 0,
          page: 0,
          pageCount: 0,
          pageSize: 0,
          pathPrefix: "",
        },
      },
    };

    return Result.ok(result);
  }
}
