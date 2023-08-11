import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import PostStats from "../model/postStats";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";



export enum PostStatsResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PostStatsRequest = {
  slug: any
}

export default class GetPostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {

    const retrieveResponse = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_STATS, request)

    const result: PostStats = {
      slug: retrieveResponse.Value.tag.slug,
      viewCount: retrieveResponse.Value.tag.viewCount,
    }

    return Result.ok(result)
  }
}