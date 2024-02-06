import {
  GetMicroPostDetailsRequest,
  MicroPostDetailsResult,
} from "@app/getMicroPostDetails";
import { MicroPostListResult } from "@app/getMicroPostList";
import { MicroPostListRequest } from "@app/requests/microPostList.request";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import {
  MicroPostHitData,
  SearchMicroPostResponse,
  searchMicroPostResponseSchema,
} from "@dto/searchMicroPost.dto";
import { ISearchEngineRepository } from "@infra/repositories/baseSearchEngineRepository";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";
import { IndexNames, ISearchRepository } from "@interfaces/ISearchRepository";
import { Result } from "@lib/result";
import { IMicroPostService } from "@services/micro-post.service";
import { ISearchService } from "@services/search.service";

import { MicroPostData } from "../dto/micro-post.dto";
import SearchAdapter from "./searchAdapter";

export default class MicroPostAdapter
  extends SearchAdapter
  implements IMicroPostRepository
{
  constructor(
    private microPostSearchRepository: ISearchEngineRepository<SearchMicroPostResponse>,
    searchRepository: ISearchRepository,
    searchService: ISearchService,
    private microPostService: IMicroPostService
  ) {
    super(IndexNames.MICRO_POST, searchRepository, searchService);
  }
  searchMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>> {
    console.debug("🚀 ~ request:", request);
    throw new Error("Method not implemented.");
  }
  async findOneMicroPost(
    request: GetMicroPostDetailsRequest
  ): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    const { req, opts } = await this.buildSearchRequest({
      filter: {
        slug: request?.slug.eq ?? "",
      },
      limit: 1,
    });

    if (opts.limit === 0) {
      console.warn("limit is 0, returning empty search");
      return Result.ok();
    }

    const searchEngineResponse = await this.microPostSearchRepository.search(
      req,
      opts
    );

    if (searchEngineResponse.IsError) {
      console.error(
        "🚀 ~ MicroPostAdapter ~ findOneMicroPost ~ searchEngineResponse:",
        searchEngineResponse.Result
      );
      return searchEngineResponse.transferError(
        MicroPostDetailsResult.NO_DATA_FOUND
      );
    }

    const result = await this.mapHitToMicroPost(
      searchEngineResponse.Value.hits[0]
    );

    return Result.ok(result);
  }
  async findMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>> {
    const { req, opts } = await this.buildSearchRequest({
      payload: request.payload,
      filter: request.filter,
      limit: request.limit,
      index: request.index,
      schema: searchMicroPostResponseSchema,
    });

    if (opts.limit === 0) {
      console.warn("limit is 0, returning empty search");
      return Result.ok();
    }

    const searchEngineResponse = await this.microPostSearchRepository.search(
      req,
      opts
    );

    const posts = await Promise.all(
      searchEngineResponse.Value.hits.map(async (h: MicroPostHitData) =>
        this.mapHitToMicroPost(h)
      )
    );

    const { limit, offset, estimatedTotalHits } = searchEngineResponse.Value;

    const currentPage = Math.floor(offset / limit) + 1;
    const pageCount = Math.ceil(estimatedTotalHits / limit);

    const result: MicroPostList = {
      posts,
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
  private async mapHitToMicroPost(h: MicroPostHitData): Promise<MicroPost> {
    const microPostData: MicroPostData = {
      content: h.content,
      id: h.id,
      picture: h.picture,
      slug: h.slug,
      title: h.title,
      tags: {
        items: h.tags ?? [],
      },
    };
    return await this.microPostService.mapMicroPost(microPostData);
  }
}
