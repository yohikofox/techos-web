import {
  GetMicroPostDetailsRequest,
  MicroPostDetailsResult,
} from "@app/getMicroPostDetails";
import { MicroPostListResult } from "@app/getMicroPostList";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import {
  MicroPostData,
  microPostDetailResponseSchema,
  MicroPostListData,
  microPostListDataSchema,
} from "@dto/micro-post.dto";
import { IMicroPostService } from "@infra/services/micro-post.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";
import { MicroPostListRequest } from "R/src/application/requests/microPostList.request";

export default class MicroPostRepository implements IMicroPostRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private microPostService: IMicroPostService
  ) {}
  searchMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>> {
    console.debug("🚀 ~ MicroPostRepository ~ request:", request);
    throw new Error("Method not implemented.");
  }

  async findOneMicroPost(
    request: GetMicroPostDetailsRequest
  ): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    const response = await this.contentManagerRepository.get<
      MicroPostListData,
      GetMicroPostDetailsRequest
    >(GraphQLQueries.GET_MICRO_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST],
      schema: microPostDetailResponseSchema,
    });

    if (response.IsError) {
      return response.transferError(MicroPostDetailsResult.ERROR);
    }

    if (response.Value.microPosts === undefined) {
      return response.transferError(MicroPostDetailsResult.NO_DATA_FOUND);
    }

    const result: MicroPost = await this.microPostService.mapMicroPost(
      response.Value.microPosts.items[0] satisfies MicroPostData
    );

    return Result.ok(result);
  }

  async findMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>> {
    const response = await this.contentManagerRepository.get<
      MicroPostListData,
      MicroPostListRequest
    >(GraphQLQueries.GET_MICRO_POST_LIST, request, {
      revalidate: CacheConstants.ONE_HOUR,
      tags: [RevalidateTagConstants.POST],
      schema: microPostListDataSchema,
    });

    if (response.IsError) {
      return response.transferError(MicroPostListResult.ERROR_FROM_ADAPTER);
    }

    if (response.Value.microPosts === undefined) {
      return response.transferError(MicroPostListResult.NO_DATA_FOUND);
    }

    const result: MicroPostList = await this.microPostService.mapMicroPostList(
      response.Value satisfies MicroPostListData
    );

    return Result.ok(result);
  }
}
