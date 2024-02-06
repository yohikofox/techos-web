import PostList from "@domain/postList";
import { IUseCase } from "@infra/useCaseFactory";
import { IPostRepository } from "@interfaces/IPostRepository";
import { Result } from "@lib/result";
import { PostListRequest } from "@requests/postList.request";

export enum PostListResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "NO_DATA_FOUND",
}

export default class GetPostListUseCase
  implements IUseCase<PostListRequest, Result<PostList, PostListResult>>
{
  constructor(private postRepository: IPostRepository) {}
  async execute(
    request?: PostListRequest
  ): Promise<Result<PostList, PostListResult>> {
    return this.postRepository.findPostList(request);
  }
}
