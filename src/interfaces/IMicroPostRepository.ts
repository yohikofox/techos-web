import {
  GetMicroPostDetailsRequest,
  MicroPostDetailsResult,
} from "@app/getMicroPostDetails";
import { MicroPostListResult } from "@app/getMicroPostList";
import { MicroPostListRequest } from "@app/requests/microPostList.request";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { Result } from "@lib/result";

export interface IMicroPostRepository {
  findOneMicroPost(
    request: GetMicroPostDetailsRequest
  ): Promise<Result<MicroPost, MicroPostDetailsResult>>;
  findMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>>;
  searchMicroPostList(
    request: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>>;
}
