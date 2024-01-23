import Header from '@domain/header';
import { HeaderResult } from '@app/getHeaderData';
import { HeaderData, HeaderResponseData, headerDataSchema } from '@dto/header-data.dto';
import { TrainingData } from '@dto/training.dto';

import { IHeaderRepository } from '@interfaces/IHeaderRepository';
import { GraphQLQueries, IContentManagerSystemRepository } from '@interfaces/contentManagementSystem';
import CacheConstants from '@lib/constants/cache';
import { Result } from '@lib/result';
import RevalidateTagConstants from '@lib/constants/revalidateTag';
import { IHeaderDataService } from '@infra/services/header-data.service';


export default class HeaderRepository implements IHeaderRepository {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private headerDataService: IHeaderDataService
  ) { }

  async getHeaderData(request?: any): Promise<Result<Header, HeaderResult>> {
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