import { GetMicroPostDetailsRequest, MicroPostDetailsResult } from "@app/getMicroPostDetails";
import { MicroPostListRequest, MicroPostListResult } from "@app/getMicroPostList";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { Result } from "@lib/result";

export interface IMicroPostRepository {
  findOneMicroPost(request: GetMicroPostDetailsRequest): Promise<Result<MicroPost, MicroPostDetailsResult>>
  findMicroPostList(request: MicroPostListRequest): Promise<Result<MicroPostList, MicroPostListResult>>
}