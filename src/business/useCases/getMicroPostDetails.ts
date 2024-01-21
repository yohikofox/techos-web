import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";
import MicroPost from "../model/microPost";
import { IMicroPostService } from "../services/micro-post.service";
import { MicroPostData, MicroPostListData, microPostListDataSchema } from "../services/dto/micro-post.dto";


export enum MicroPostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetMicroPostDetailsUseCase implements IUseCase<any, Result<MicroPost, MicroPostDetailsResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private microPostService: IMicroPostService
  ) { }
  async execute(request?: any): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    const response = await this.cmsRepository.get<MicroPostListData>(GraphQLQueries.GET_MICRO_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: microPostListDataSchema
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
}