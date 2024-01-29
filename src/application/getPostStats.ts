import PostStats from "@domain/postStats";
import { IUseCase } from "@infra/useCaseFactory";
import { ContentManagerFilter } from "@interfaces/IContentManagerSystemRepository";
import { IPostStatRepository } from "@interfaces/IPostStatRepository";

import { Result } from "@/lib/result";

export enum PostStatsResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "no_data_found",
  NO_POST_MATCHING = "no_post_matching",
  BAD_REQUEST = "bad_request",
}

export type PostStatsRequest = {
  slug: ContentManagerFilter;
};

export default class GetPostStatsUseCase
  implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>>
{
  constructor(private postStatRepository: IPostStatRepository) {}
  async execute(
    request?: PostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>> {
    return this.postStatRepository.findPostStat(request);
  }
}
