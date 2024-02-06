import { GetHeaderRequest, HeaderResult } from "@app/getHeaderData";
import Header from "@domain/header";
import {
  HeaderData,
  headerDataSchema,
  HeaderResponseData,
} from "@dto/header-data.dto";
import { TrainingData } from "@dto/training.dto";
import { IHeaderDataService } from "@infra/services/header-data.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IHeaderRepository } from "@interfaces/IHeaderRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class HeaderRepository implements IHeaderRepository {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private headerDataService: IHeaderDataService
  ) {}

  async getHeaderData(
    request?: GetHeaderRequest
  ): Promise<Result<Header, HeaderResult>> {
    const response = await this.cmsRepository.get<
      HeaderResponseData,
      GetHeaderRequest
    >(GraphQLQueries.GET_HEADER_DATA, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.HEADER_DATA],
      schema: headerDataSchema,
    });

    if (response.IsError) {
      return response.transferError(HeaderResult.ERROR);
    }

    if (response.Value.header === undefined)
      return response.transferError(HeaderResult.NO_DATA_FOUND);

    const result: Header = await this.headerDataService.mapToHeader(
      response.Value.header satisfies HeaderData,
      response.Value.trainings?.items
        .map((m) => m satisfies TrainingData)
        .filter((f) => f) as TrainingData[]
    );

    return Result.ok(result);
  }
}
