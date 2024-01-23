import { PostStatsResult } from "@app/getPostStats";
import PostStats from "@domain/postStats";
import { Result } from "@lib/result";

export interface IPostStatRepository {
  findPostStat(request?: any): Promise<Result<PostStats, PostStatsResult>>
  createPostStat(request?: any): Promise<Result<PostStats, PostStatsResult>>
  updatePostStat(request?: any): Promise<Result<PostStats, PostStatsResult>>
}