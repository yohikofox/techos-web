import Post from "@domain/post";
import { IUseCase } from "@infra/useCaseFactory";
import { IPostRepository } from "@interfaces/IPostRepository";

import { Result } from "@/lib/result";


export enum PostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found',
  BAD_RESOURCE = 'bad_resource',
  NOT_UNIQUE_CONTENT = 'not_unique_content'
}

export default class GetPostDetailsUseCase implements IUseCase<any, Result<Post, PostDetailsResult>> {
  constructor(
    private postRepository: IPostRepository,
  ) { }
  async execute(request?: any): Promise<Result<Post, PostDetailsResult>> {
    return this.postRepository.findOnePost(request)
  }
}