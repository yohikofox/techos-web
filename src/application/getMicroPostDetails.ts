import MicroPost from "@domain/microPost";
import { IUseCase } from "@infra/useCaseFactory";
import { ContentManagerFilter } from "@interfaces/IContentManagerSystemRepository";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";

import { Result } from "@/lib/result";

export enum MicroPostDetailsResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "NO_DATA_FOUND",
}

export type GetMicroPostDetailsRequest = Record<string, ContentManagerFilter>;

export default class GetMicroPostDetailsUseCase
  implements
    IUseCase<
      GetMicroPostDetailsRequest,
      Result<MicroPost, MicroPostDetailsResult>
    >
{
  constructor(private microPostRepository: IMicroPostRepository) {}
  async execute(
    request?: GetMicroPostDetailsRequest
  ): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    return this.microPostRepository.findOneMicroPost(request!);
  }
}
