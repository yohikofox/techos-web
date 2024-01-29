import { PostStatsRequest, PostStatsResult } from "@app/getPostStats";
import {
  CreatePostStatsRequest,
  UpdatePostStatsRequest,
} from "@app/updatePostStats";
import PostStats from "@domain/postStats";
import {
  CreatePostStatResponse,
  PostStatData,
  PostStatDataResponse,
  postStatDataResponseSchema,
  UpdatePostStatsResponse,
} from "@dto/post-stat.dto";
import { IPostStatService } from "@infra/services/post-stats.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IPostStatRepository } from "@interfaces/IPostStatRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class PostStatRepository implements IPostStatRepository {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postStatService: IPostStatService
  ) {}
  async updatePostStat(
    request?: UpdatePostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>> {
    const updateResponse = await this.cmsRepository.get<
      UpdatePostStatsResponse,
      UpdatePostStatsRequest
    >(GraphQLQueries.UPDATE_POST_STATS, request);

    if (updateResponse.IsError) {
      return updateResponse.transferError(PostStatsResult.ERROR);
    }

    /**: PostStats = {
      
      slug: slug.eq,
      viewCount: updateResponse.Value.updatePostStatList.data.attributes.view_count,
    } */

    if (request?.slug !== undefined) {
      const result = await this.postStatService.mapPostStats(
        request.slug,
        updateResponse.Value.updatePostStatList.data satisfies PostStatData
      );

      return Result.ok(result);
    }

    return Result.ok();
  }
  async createPostStat(
    request?: CreatePostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>> {
    const createResponse = await this.cmsRepository.get<
      CreatePostStatResponse,
      CreatePostStatsRequest
    >(GraphQLQueries.CREATE_POST_STATS, request);

    if (createResponse.IsError === true) {
      return createResponse.transferError(PostStatsResult.ERROR);
    }

    if (request?.slug !== undefined) {
      const result = await this.postStatService.mapPostStats(
        request.slug,
        createResponse.Value.createPostStatList.data
      );

      return Result.ok(result);
    }

    return Result.ok();
  }

  async findPostStat(
    request?: PostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>> {
    const retrieveResponse = await this.cmsRepository.get<
      PostStatDataResponse,
      PostStatsRequest
    >(GraphQLQueries.GET_POST_STATS, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: postStatDataResponseSchema,
    });

    if (retrieveResponse.IsError) {
      return retrieveResponse.transferError(PostStatsResult.ERROR);
    }

    if (
      retrieveResponse.Value.postStatLists === undefined ||
      retrieveResponse.Value.postStatLists.data.length <= 0
    ) {
      return retrieveResponse.transferError(PostStatsResult.NO_DATA_FOUND);
    }

    const result: PostStats = await this.postStatService.mapPostStats(
      request?.slug,
      retrieveResponse.Value.postStatLists.data[0]
    );

    return Result.ok(result);
  }
}
