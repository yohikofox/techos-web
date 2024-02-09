import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import { PostListResult } from "@app/getPostList";
import { PostListRequest } from "@app/requests/postList.request";
import Post from "@domain/post";
import PostList from "@domain/postList";
import {
  HitData,
  SearchPostResponse,
  searchPostResponseSchema,
} from "@dto/searchPost.dto";
import { ISearchEngineRepository } from "@infra/repositories/baseSearchEngineRepository";
import { IPostService } from "@infra/services/post.service";
import { ISearchService } from "@infra/services/search.service";
import { IPostRepository } from "@interfaces/IPostRepository";
import { IndexNames, ISearchRepository } from "@interfaces/ISearchRepository";
import { Result } from "@lib/result";
import { FacetConfig } from "R/src/domain/facetConfig";
import { FacetedSearch, FacetedValue } from "R/src/domain/search";

import { FacetDistribution } from "../dto/search-facet.dto";
import { FacetStats } from "./../dto/search-facet.dto";
import SearchAdapter from "./searchAdapter";

export default class PostAdapter
  extends SearchAdapter
  implements IPostRepository
{
  constructor(
    private postSearchRepository: ISearchEngineRepository<SearchPostResponse>,
    searchRepository: ISearchRepository,
    searchService: ISearchService,
    private postService: IPostService
  ) {
    super(IndexNames.POST, searchRepository, searchService);
  }

  async findOnePost(
    request?: PostDetailsRequest | undefined
  ): Promise<Result<Post, PostDetailsResult>> {
    const { req, opts } = await this.buildSearchRequest({
      filter: {
        slug: request?.slug.eq ?? "",
      },
      limit: 1,
    });

    const searchEngineResponse = await this.postSearchRepository.search(
      req,
      opts
    );

    if (searchEngineResponse.IsError) {
      console.error(
        "🚀 ~ PostAdapter ~ findOnePost ~ searchEngineResponse:",
        searchEngineResponse.Result
      );
      return searchEngineResponse.transferError(
        PostDetailsResult.NO_DATA_FOUND
      );
    }

    if (searchEngineResponse.Value.hits.length === 0) {
      return Result.error(PostDetailsResult.NO_DATA_FOUND);
    }

    const h: HitData = searchEngineResponse.Value.hits[0];

    const post = await this.mapHitToPost(h);

    return Result.ok(post);
  }
  async findPostList(
    request: PostListRequest
  ): Promise<Result<PostList, PostListResult>> {
    const { req, opts, facetConfigs } = await this.buildSearchRequest({
      payload: request.payload,
      filter: request.filter,
      limit: request.limit,
      index: request.index,
      schema: searchPostResponseSchema,
    });

    if (opts.limit === 0) {
      console.warn("limit is 0, returning empty search");
      return Result.ok();
    }

    const searchEngineResponse = await this.postSearchRepository.search(
      req,
      opts
    );

    if (searchEngineResponse.IsError) {
      console.error(
        "🚀 ~ PostAdapter ~ findPostList ~ searchEngineResponse:",
        searchEngineResponse.Result
      );
      return searchEngineResponse.transferError(PostListResult.NO_DATA_FOUND);
    }

    const posts = await Promise.all(
      searchEngineResponse.Value.hits.map(async (h: HitData) =>
        this.mapHitToPost(h)
      )
    );

    const facets: FacetDistribution =
      searchEngineResponse.Value.facetDistribution ?? {};

    const facetStats = searchEngineResponse.Value.facetStats ?? {};

    const { limit, offset, estimatedTotalHits } = searchEngineResponse.Value;

    const currentPage = Math.floor(offset / limit) + 1;
    const pageCount = Math.ceil(estimatedTotalHits / limit);

    const mappedFacets = await this.mapFacetConfigToFacetedSearch(
      facets,
      facetConfigs,
      facetStats,
      request.filter
    );

    const result: PostList = {
      posts,
      facets: mappedFacets,
      meta: {
        pagination: {
          total: estimatedTotalHits,
          page: currentPage,
          pageCount,
          pageSize: limit,
          pathPrefix: "",
        },
      },
    };

    return Result.ok(result);
  }
  async mapFacetConfigToFacetedSearch(
    facets: FacetDistribution,
    facetConfigs: FacetConfig[],
    facetStats: FacetStats,
    filters: Record<string, string | string[]> = {}
  ): Promise<FacetedSearch[] | undefined> {
    const result: FacetedSearch[] = [];

    Object.keys(facets).forEach((key) => {
      const facet = facets[key];
      const config = facetConfigs.find((f) => f.name === key);
      if (!config) {
        return;
      }
      const items = Object.keys(facet).map((k) => {
        const item: FacetedValue = {
          label: k,
          count: facet[k],
        };
        return item;
      });

      const stats = facetStats[key];

      if (
        filters[key] === undefined &&
        stats !== undefined &&
        stats.max === stats.min
      ) {
        return;
      }

      if (config.multiple !== true && filters[key] !== undefined) {
        if (items.length > 0) {
          return;
        }
      }

      result.push({
        name: config.name,
        label: config.label,
        values: items,
        autocomplete: config.autocomplete,
        dataType: config.dataType,
        max: stats !== undefined ? stats.max : undefined,
        min: stats !== undefined ? stats.min : undefined,
        multiple: config.multiple,
      });
    });

    return result;
  }

  async mapHitToPost(h: HitData): Promise<Post> {
    return await this.postService.mapPost({
      id: h.id.toString(),
      author: h.author,
      content: h.content,
      title: h.title,
      post_stat_list: h.post_stat_list,
      slug: h.slug,
      start_at: h.start_at,
      level: h.level ?? "",
      end_at: h.end_at ?? "",
      tags: {
        items: h.tags,
      },
      extract: h.extract ?? "",
      picture: h.picture,
    });
  }
}
