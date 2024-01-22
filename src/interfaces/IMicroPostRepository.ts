import { MicroPostDetailsResult } from "@app/getMicroPostDetails";
import MicroPost from "@domain/microPost";
import { Result } from "@lib/result";
import MicroPostList from "@domain/microPostList";
import { MicroPostListResult } from "@app/getMicroPostList";

export interface IMicroPostRepository {
  findOneMicroPost(request: any): Promise<Result<MicroPost, MicroPostDetailsResult>>
  findMicroPostList(request: any): Promise<Result<MicroPostList, MicroPostListResult>>
}