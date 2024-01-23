import PostList from "@domain/postList";
import { IUseCase } from "@infra/useCaseFactory";
import { Result } from "@lib/result";
import { IPostRepository } from "@interfaces/IPostRepository";

export enum PostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type PostListRequest = {
  index?: number,
  limit?: number,
  sort?: string
}

export default class GetPostListUseCase implements IUseCase<PostListRequest, Result<PostList, PostListResult>> {
  constructor(
    private postRepository: IPostRepository,
  ) { }
  async execute(request?: PostListRequest): Promise<Result<PostList, PostListResult>> {
    return this.postRepository.findPostList(request)
  }
}
