import { MicroPostDetailsResult } from "@app/getMicroPostDetails";
import { MicroPostListResult } from "@app/getMicroPostList";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { MicroPostData, microPostDetailResponseSchema, MicroPostListData, microPostListDataSchema } from "@dto/micro-post.dto";
import { IMicroPostService } from "@infra/services/micro-post.service";
import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class MicroPostRepository implements IMicroPostRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private microPostService: IMicroPostService
  ) { }


  async findOneMicroPost(request: any): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    const response = await this.contentManagerRepository.get<MicroPostListData>(GraphQLQueries.GET_MICRO_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: microPostDetailResponseSchema
    })

    if (response.IsError) {
      return response.transferError(MicroPostDetailsResult.ERROR)
    }

    if (!response.Value.microPosts) {
      return response.transferError(MicroPostDetailsResult.NO_DATA_FOUND)
    }

    const result: MicroPost = await this.microPostService.mapMicroPost(
      response.Value.microPosts.data[0] satisfies MicroPostData
    );

    return Result.ok(result)
  }


  async findMicroPostList(request: any): Promise<Result<MicroPostList, MicroPostListResult>> {
    const response = await this.contentManagerRepository.get<MicroPostListData>(GraphQLQueries.GET_MICRO_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: microPostListDataSchema
    })

    if (response.IsError) {
      return response.transferError(MicroPostListResult.ERROR_FROM_ADAPTER)
    }

    if (!response.Value.microPosts) {
      return response.transferError(MicroPostListResult.NO_DATA_FOUND)
    }

    const result: MicroPostList = await this.microPostService.mapMicroPostList(
      response.Value satisfies MicroPostListData
    )

    return Result.ok(result)
  }
}