import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import CacheConstants from "@/lib/constants/cache";
import RevalidateTagConstants from "@/lib/constants/revalidateTag";
import MicroPostList from "../model/microPostList";
import { IMicroPostService } from "../services/micro-post.service";
import { MicroPostListData, microPostListDataSchema } from "../services/dto/micro-post.dto";

export enum MicroPostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found',
  ERROR_FROM_ADAPTER = 'error_from_adapter'
}

export type MicroPostListRequest = {
  index?: number,
  limit?: number,
  sort?: string
}

export default class GetPostListUseCase implements IUseCase<MicroPostListRequest, Result<MicroPostList, MicroPostListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private microPostService: IMicroPostService,
  ) { }
  async execute(request?: MicroPostListRequest): Promise<Result<MicroPostList, MicroPostListResult>> {
    const response = await this.cmsRepository.get<MicroPostListData>(GraphQLQueries.GET_MICRO_POST_LIST, request, {
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
