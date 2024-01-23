import { PostStatsResult } from "@app/getPostStats"
import PostStats from "@domain/postStats"
import { Result } from "@lib/result"
import { PostStatData, PostStatDataResponse, postStatDataResponseSchema } from "@dto/post-stat.dto"
import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem"
import { IPostStatService } from "@infra/services/post-stats.service"
import { IPostStatRepository } from "@interfaces/IPostStatRepository"
import CacheConstants from "@lib/constants/cache"
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag"

export default class PostStatRepository implements IPostStatRepository {

  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postStatService: IPostStatService
  ) { }
  async updatePostStat(request?: any): Promise<Result<PostStats, PostStatsResult>> {
    const updateResponse = await this.cmsRepository.get<any>(GraphQLQueries.UPDATE_POST_STATS, request)

    if (updateResponse.IsError) {
      return updateResponse.transferError(PostStatsResult.ERROR)
    }

    /**: PostStats = {
      
      slug: slug.eq,
      viewCount: updateResponse.Value.updatePostStatList.data.attributes.view_count,
    } */

    const result = await this.postStatService.mapPostStats(request?.slug, updateResponse.Value.updatePostStatList.data satisfies PostStatData)

    return Result.ok(result)
  }
  async createPostStat(request?: any): Promise<Result<PostStats, PostStatsResult>> {

    const slug = request?.slug

    delete request.slug

    const createResponse = await this.cmsRepository.get<any>(GraphQLQueries.CREATE_POST_STATS, request)

    if (createResponse.IsError) {
      return createResponse.transferError(PostStatsResult.ERROR)
    }

    /**{
      slug: slug.eq,
      viewCount: createResponse.Value.createPostStatList.data.attributes.view_count,
    }
 */
    const result = await this.postStatService.mapPostStats(slug, createResponse.Value.createPostStatList.data satisfies PostStatData)

    return Result.ok(result)
  }


  async findPostStat(request?: any): Promise<Result<PostStats, PostStatsResult>> {
    const retrieveResponse = await this.cmsRepository.get<PostStatDataResponse>(GraphQLQueries.GET_POST_STATS, request,
      {
        revalidate: 0,//CacheConstants.ONE_HOUR,
        tags: [RevalidateTagConstants.POST],
        schema: postStatDataResponseSchema
      })

    if (retrieveResponse.IsError) {
      return retrieveResponse.transferError(PostStatsResult.ERROR)
    }

    if (!retrieveResponse.Value.postStatLists || retrieveResponse.Value.postStatLists.data.length <= 0) {
      return retrieveResponse.transferError(PostStatsResult.NO_DATA_FOUND)
    }

    const result: PostStats = await this.postStatService.mapPostStats(request?.slug, retrieveResponse.Value.postStatLists.data[0] satisfies PostStatData)

    return Result.ok(result)
  }
}