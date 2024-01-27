import { PostStatsResult } from "@app/getPostStats";
import PostStats from "@domain/postStats";
import { IUseCase } from "@infra/useCaseFactory";
import { IPostRepository } from "@interfaces/IPostRepository";
import { IPostStatRepository } from "@interfaces/IPostStatRepository";

import { Result } from "@/lib/result";


export type PostStatsRequest = {
  slug: any
}

export default class UpdatePostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(
    private postStatRepository: IPostStatRepository,
    private postRepository: IPostRepository,
  ) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {

    const retrieveResponse = await this.postStatRepository.findPostStat(request)

    const slug = request?.slug

    if (retrieveResponse.IsError) {

      if (retrieveResponse.lastErrorMatchWith(PostStatsResult.NO_DATA_FOUND)) {

        const retrievePostResponse = await this.postRepository.findOnePost(request)

        if (retrievePostResponse.IsError) {
          return retrievePostResponse.transferError(PostStatsResult.NO_POST_MATCHING)
        }

        const createRequest = {
          count: 1,
          post: Number(retrievePostResponse.Value.id),
          slug
        }

        return this.postStatRepository.createPostStat(createRequest)
      }

      return retrieveResponse.transferError(PostStatsResult.ERROR)
    }


    const postStatsId = retrieveResponse.Value.id

    const updateRequest = {
      id: postStatsId,
      count: retrieveResponse.Value.viewCount + 1
    }

    return this.postStatRepository.updatePostStat(updateRequest)
  }
}