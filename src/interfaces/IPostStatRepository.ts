import { PostStatsRequest, PostStatsResult } from "@app/getPostStats";
import {
  CreatePostStatsRequest,
  UpdatePostStatsRequest,
} from "@app/updatePostStats";
import PostStats from "@domain/postStats";
import { Result } from "@lib/result";

export interface IPostStatRepository {
  findPostStat(
    request?: PostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>>;
  createPostStat(
    request?: CreatePostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>>;
  updatePostStat(
    request?: UpdatePostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>>;
}
