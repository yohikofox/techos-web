import { IUseCase } from "../useCaseFactory";
import HeaderData from "../model/headerData";
import { IImageSetService } from "../services/imageSet.service";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { Result } from "@/lib/result";

export enum HeaderDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = 'no_data_found'
}

export default class GetHeaderDataUseCase implements IUseCase<any, Result<HeaderData, HeaderDataResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: any): Promise<Result<HeaderData, HeaderDataResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HEADER_DATA, request, { revalidate: 60 * 60 * 1 })

    if (response.IsError) {
      return response.transferError(HeaderDataResult.ERROR)
    }

    if (!response.Value.header.data)
      return response.transferError(HeaderDataResult.NO_DATA_FOUND)

    const result: HeaderData = {
      search: {
        placeholder: response.Value.header.data.attributes.placeholder,
        search_title: response.Value.header.data.attributes.search_title
      },
      trainings: {
        title: response.Value.header.data.attributes?.trainings,
        items: await Promise.all(response.Value?.trainings.data.map(async (training: any) => {
          return {
            title: training.attributes.title,
            link: `/formation${training.attributes.link}`,
            background: await this.imageSetService.mapImageSet(training.attributes.background.data.attributes)
          }
        }))
      }
    }

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