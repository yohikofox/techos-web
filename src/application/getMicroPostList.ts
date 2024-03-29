import MicroPostList from "@domain/microPostList";
import { IUseCase } from "@infra/useCaseFactory";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";

import { Result } from "@/lib/result";

import { MicroPostListRequest } from "./requests/microPostList.request";

export enum MicroPostListResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "no_data_found",
  ERROR_FROM_ADAPTER = "error_from_adapter",
}

export default class GetPostListUseCase
  implements
    IUseCase<MicroPostListRequest, Result<MicroPostList, MicroPostListResult>>
{
  constructor(private microPostRepository: IMicroPostRepository) {}
  async execute(
    request?: MicroPostListRequest
  ): Promise<Result<MicroPostList, MicroPostListResult>> {
    return await this.microPostRepository.findMicroPostList(request!);
  }
}
