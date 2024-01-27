import Header from "@domain/header";
import { IUseCase } from "@infra/useCaseFactory";
import { IHeaderRepository } from "@interfaces/IHeaderRepository";
import { Result } from "@lib/result";

export interface GetHeaderRequest { }

export enum HeaderResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found'
}

export default class GetHeaderUseCase implements IUseCase<GetHeaderRequest, Result<Header, HeaderResult>> {

  constructor(
    private headerRepository: IHeaderRepository,
  ) { }

  async execute(request?: GetHeaderRequest): Promise<Result<Header, HeaderResult>> {
    return this.headerRepository.getHeaderData(request)
  }
}
