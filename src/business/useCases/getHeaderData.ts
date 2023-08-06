import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import HeaderData from "../model/headerData";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";

export enum HeaderDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetHeaderDataUseCase implements IUseCase<any, Result<HeaderData, HeaderDataResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: any): Promise<Result<HeaderData, HeaderDataResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HEADER_DATA, request)

    if (response.IsError) {
      return response.transferError(HeaderDataResult.ERROR)
    }


    const result: HeaderData = {
      search: {
        placeholder: response.Value.header.data.attributes.placeholder,
        search_title: response.Value.header.data.attributes.search_title
      },
      trainings: {
        title: response.Value.header.data.attributes.trainings,
        items: response.Value.trainings.data.map((training: any) => {

          return {
            title: training.attributes.title,
            link: training.attributes.link,
            background: {
              src: training.attributes.background.data.attributes.url,
              width: training.attributes.background.data.attributes.width,
              height: training.attributes.background.data.attributes.height,
              name: training.attributes.background.data.attributes.name,
            }
          }
        })
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
              }).flat() */