import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import PostStats from "../model/postStats";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import { PostStatData, PostStatDataResponse } from "../services/dto/post-stat.dto";
import { IPostStatService } from "../services/post-stats.service";

export enum PostStatsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type PostStatsRequest = {
  slug: any
}

export default class GetPostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postStatService: IPostStatService
  ) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {

    const retrieveResponse = await this.cmsRepository.get<PostStatDataResponse>(GraphQLQueries.GET_POST_STATS, request, { revalidate: 60 * 60 * 1 })

    if (retrieveResponse.IsError) {
      return retrieveResponse.transferError(PostStatsResult.ERROR)
    }

    if (!retrieveResponse.Value.postStatLists || retrieveResponse.Value.postStatLists.data.length <= 0) {
      return retrieveResponse.transferError(PostStatsResult.NO_DATA_FOUND)
    }

    const result: PostStats = await this.postStatService.mapPostStats(request?.slug, retrieveResponse.Value.postStatLists.data[0] satisfies PostStatData)

    return Result.ok(result)
  }
}