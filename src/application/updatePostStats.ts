import { PostStatsResult } from "@app/getPostStats";
import PostStats from "@domain/postStats";
import { IUseCase } from "@infra/useCaseFactory";
import { ContentManagerFilter } from "@interfaces/IContentManagerSystemRepository";
import { IPostRepository } from "@interfaces/IPostRepository";
import { IPostStatRepository } from "@interfaces/IPostStatRepository";

import { Result } from "@/lib/result";

export type CreatePostStatsRequest = {
  count: number;
  post: number;
  slug: string;
};

export type UpdatePostStatsRequest = {
  id: string;
  count: number;
  slug?: string;
};

export type PostStatsRequest = {
  slug: ContentManagerFilter;
};

export default class UpdatePostStatsUseCase
  implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>>
{
  constructor(
    private postStatRepository: IPostStatRepository,
    private postRepository: IPostRepository
  ) {}
  async execute(
    request?: PostStatsRequest
  ): Promise<Result<PostStats, PostStatsResult>> {
    const retrieveResponse =
      await this.postStatRepository.findPostStat(request);

    if (request?.slug === undefined) {
      return Result.error(PostStatsResult.BAD_REQUEST);
    }

    if (retrieveResponse.IsError) {
      if (retrieveResponse.lastErrorMatchWith(PostStatsResult.NO_DATA_FOUND)) {
        const retrievePostResponse = await this.postRepository.findOnePost({
          slug: request.slug,
        });

        if (retrievePostResponse.IsError) {
          return retrievePostResponse.transferError(
            PostStatsResult.NO_POST_MATCHING
          );
        }

        const createRequest: CreatePostStatsRequest = {
          count: 1,
          post: Number(retrievePostResponse.Value.id),
          slug: request.slug.eq,
        };

        return this.postStatRepository.createPostStat(createRequest);
      }

      return retrieveResponse.transferError(PostStatsResult.ERROR);
    }

    const postStatsId = retrieveResponse.Value.id;

    const updateRequest: UpdatePostStatsRequest = {
      id: postStatsId,
      count: retrieveResponse.Value.viewCount + 1,
    };

    return this.postStatRepository.updatePostStat(updateRequest);
  }
}
