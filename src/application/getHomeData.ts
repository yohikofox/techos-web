import Home from "@domain/home";
import { IUseCase } from "@infra/useCaseFactory";
import { IHomeRepository } from "@interfaces/IHomeRepository";
import { Result } from "@lib/result";

export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetHomeDataUseCase implements IUseCase<void, Result<Home, HomeDataResult>> {
  constructor(
    private homeRepository: IHomeRepository,
  ) { }
  async execute(request?: void): Promise<Result<Home, HomeDataResult>> {
    return this.homeRepository.getHomeData(request)
  }
}
