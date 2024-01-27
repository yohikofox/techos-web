import PostList from "@domain/postList";
import { IUseCase } from "@infra/useCaseFactory";
import { ITagRepository } from "@interfaces/ITagRepository";
import { Result } from "@lib/result";

export enum TagPostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type TagPostListRequest = {
  tag: any
  index?: number
  limit?: number
}

export default class GetTagPostListUseCase implements IUseCase<TagPostListRequest, Result<PostList, TagPostListResult>> {
  constructor(
    private tagRepository: ITagRepository,
  ) { }
  async execute(request?: TagPostListRequest): Promise<Result<PostList, TagPostListResult>> {
    return this.tagRepository.findTagPostList(request)
  }
}