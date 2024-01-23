import PostStats from "@domain/postStats";
import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@/lib/result";
import { IPostStatRepository } from "@interfaces/IPostStatRepository";

export enum PostStatsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found',
  NO_POST_MATCHING = 'no_post_matching'
}

export type PostStatsRequest = {
  slug: any
}

export default class GetPostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(
    private postStatRepository: IPostStatRepository
  ) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {
    return this.postStatRepository.findPostStat(request)
  }
}