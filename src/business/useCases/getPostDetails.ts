import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import Post from "../model/post";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";
import { IPostService } from "../services/post.service";
import { PostData, PostDetailsResponse, postDetailsResponseSchema } from "../services/dto/post.dto";


export enum PostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found',
  BAD_RESOURCE = 'bad_resource',
  NOT_UNIQUE_CONTENT = 'not_unique_content'
}

export default class GetPostDetailsUseCase implements IUseCase<any, Result<Post, PostDetailsResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService
  ) { }
  async execute(request?: any): Promise<Result<Post, PostDetailsResult>> {
    const response = await this.cmsRepository.get<PostDetailsResponse>(GraphQLQueries.GET_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: postDetailsResponseSchema
    })

    if (response.IsError) {
      return response.transferError(PostDetailsResult.ERROR)
    }

    if (!response.Value.posts?.data || response.Value.posts.data.length <= 0) {
      return response.transferError(PostDetailsResult.NO_DATA_FOUND)
    }

    if (response.Value.posts.data.length !== 1) {
      return response.transferError(PostDetailsResult.NOT_UNIQUE_CONTENT)
    }

    const result: Post = await this.postService.mapPost(response.Value.posts.data[0] satisfies PostData)

    return Result.ok(result)
  }
}