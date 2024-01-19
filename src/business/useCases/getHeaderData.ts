import { IUseCase } from "../useCaseFactory";
import Header from "../model/header";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";
import { headerDataSchema } from "../services/dto/header-data.dto";
import { IHeaderDataService } from "../services/header-data.service";

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
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HEADER_DATA, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.HEADER_DATA],
      schema: headerDataSchema
    })

    if (response.IsError) {
      return response.transferError(HeaderResult.ERROR)
    }

    if (!response.Value.header.data)
      return response.transferError(HeaderResult.NO_DATA_FOUND)

    const result: Header = await this.headerDataService.mapToHeader(response.Value.header, response.Value.trainings.data)

    return Result.ok(result)
  }
}

/**urlSet: training.attributes.background.data.map((image: any) => {

                const keys = Object.keys(image.attributes.formats)

                return keys.map((key: string) => {
                  return {
                    src: image.attributes.formats[key].url,
                    size: image.attributes.formats[key].size,
                    width: image.attributes.formats[key].width,
                    height: image.attributes.formats[key].height,
                  }
                })
              }).flat() 
              
              
                let avatarSrc = data.avatar?.src //'https://i.pravatar.cc/400'
  if (!avatarSrc) avatarSrc = `https://eu.ui-avatars.com/api/?background=random&color=random&name=${encodeURIComponent(data.username)}&size=400`

  */