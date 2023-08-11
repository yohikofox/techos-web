import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import PostStats from "../model/postStats";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";



export enum PostStatsResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PostStatsRequest = {
  slug: any
}

export default class UpdatePostStatsUseCase implements IUseCase<PostStatsRequest, Result<PostStats, PostStatsResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: PostStatsRequest): Promise<Result<PostStats, PostStatsResult>> {

    const retrieveResponse = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_STATS, request)

    if (retrieveResponse.IsError) {
      return retrieveResponse.transferError(PostStatsResult.ERROR)
    }

    const slug = request?.slug

    if (retrieveResponse.Value.postStatLists.data.length <= 0) {

      const retrievePostResponse = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_DETAILS, {
        slug: slug
      })

      if (retrievePostResponse.IsError) {
        return retrievePostResponse.transferError(PostStatsResult.ERROR)
      }

      const createRequest = {
        count: 1,
        post: Number(retrievePostResponse.Value.posts.data[0].id)
      }

      const createResponse = await this.cmsRepository.get<any>(GraphQLQueries.CREATE_POST_STATS, createRequest)
      if (createResponse.IsError) {
        return createResponse.transferError(PostStatsResult.ERROR)
      }

      const result: PostStats = {
        slug: slug.eq,
        viewCount: createResponse.Value.createPostStatList.data.attributes.view_count,
      }

      return Result.ok(result)

    } else {
      const postStatsId = retrieveResponse.Value.postStatLists.data[0].id

      const updateRequest = {
        id: postStatsId,
        count: retrieveResponse.Value.postStatLists.data[0].attributes.view_count + 1
      }

      const updateResponse = await this.cmsRepository.get<any>(GraphQLQueries.UPDATE_POST_STATS, updateRequest)

      if (updateResponse.IsError) {
        return updateResponse.transferError(PostStatsResult.ERROR)
      }

      const result: PostStats = {
        slug: slug.eq,
        viewCount: updateResponse.Value.updatePostStatList.data.attributes.view_count,
      }

      return Result.ok(result)
    }
  }
}