import { MicroPostDetailsResult } from "@app/getMicroPostDetails";
import { MicroPostListResult } from "@app/getMicroPostList";
import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { Result } from "@lib/result";

export interface IMicroPostRepository {
  findOneMicroPost(request: any): Promise<Result<MicroPost, MicroPostDetailsResult>>
  findMicroPostList(request: any): Promise<Result<MicroPostList, MicroPostListResult>>
}