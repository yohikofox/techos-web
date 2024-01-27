import MicroPost from "@domain/microPost";
import { IUseCase } from "@infra/useCaseFactory";
import { IMicroPostRepository } from "@interfaces/IMicroPostRepository";

import { Result } from "@/lib/result";

export enum MicroPostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetMicroPostDetailsUseCase implements IUseCase<any, Result<MicroPost, MicroPostDetailsResult>> {
  constructor(
    private microPostRepository: IMicroPostRepository
  ) { }
  async execute(request?: any): Promise<Result<MicroPost, MicroPostDetailsResult>> {
    return this.microPostRepository.findOneMicroPost(request)
  }
}