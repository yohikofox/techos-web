import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import PostStats from "../model/postStats";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";

export enum PostStatsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type PostStatsRequest = {
  slug: any
}

export default class GetPostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {

    const retrieveResponse = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_STATS, request, { revalidate: 60 * 60 * 1 })

    if (retrieveResponse.IsError) {
      return retrieveResponse.transferError(PostStatsResult.ERROR)
    }

    if (!retrieveResponse.Value.tag) {
      return retrieveResponse.transferError(PostStatsResult.NO_DATA_FOUND)
    }

    const result: PostStats = {
      slug: retrieveResponse.Value.tag.slug,
      viewCount: retrieveResponse.Value.tag.viewCount,
    }

    return Result.ok(result)
  }
}