import { Result } from "@lib/result";
import { IUseCase } from "@infra/useCaseFactory";
import { IHomeRepository } from "@interfaces/IHomeRepository";
import Home from "@domain/home";

export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetHomeDataUseCase implements IUseCase<any, Result<Home, HomeDataResult>> {
  constructor(
    private homeRepository: IHomeRepository,
  ) { }
  async execute(request?: any): Promise<Result<Home, HomeDataResult>> {
    return this.homeRepository.getHeaderData(request)
  }
}
