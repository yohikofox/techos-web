import { IUseCase } from "../useCaseFactory";
import Header from "../model/header";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";
import { HeaderData, HeaderResponseData, headerDataSchema } from "../services/dto/header-data.dto";
import { IHeaderDataService } from "../services/header-data.service";
import { TrainingData } from "../services/dto/training.dto";

export enum HeaderResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found'
}

export default class GetHeaderUseCase implements IUseCase<any, Result<Header, HeaderResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private headerDataService: IHeaderDataService
  ) { }

  async execute(request?: any): Promise<Result<Header, HeaderResult>> {
    const response = await this.cmsRepository.get<HeaderResponseData>(GraphQLQueries.GET_HEADER_DATA, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.HEADER_DATA],
      schema: headerDataSchema
    })

    if (response.IsError) {
      return response.transferError(HeaderResult.ERROR)
    }

    if (!response.Value.header)
      return response.transferError(HeaderResult.NO_DATA_FOUND)

    const result: Header = await this.headerDataService.mapToHeader(
      response.Value.header.data.attributes satisfies HeaderData,
      response.Value.trainings?.data.map(m => m.attributes satisfies TrainingData).filter(f => f) as TrainingData[]
    )

    return Result.ok(result)
  }
}
