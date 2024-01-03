import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import HomeData from "../model/homeData";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";


export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetHomeDataUseCase implements IUseCase<any, Result<HomeData, HomeDataResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: any): Promise<Result<HomeData, HomeDataResult>> {

    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HOME_DATA, request, { revalidate: 60 * 60 * 1, tags: [RevalidateTagConstants.HOME] })

    if (response.IsError) {
      return response.transferError(HomeDataResult.ERROR)
    }

    if (!response.Value.homePage?.data) {
      return response.transferError(HomeDataResult.NO_DATA_FOUND)
    }

    const result: HomeData = {
      hero: {
        title: response.Value.homePage.data.attributes.hero.title,
        content: response.Value.homePage.data.attributes.hero.content,
        picture: await this.imageSetService.mapImageSet(response.Value.homePage.data.attributes.hero.picture.data.attributes),
        background: await this.imageSetService.mapImageSet(response.Value.homePage.data.attributes.hero.background.data.attributes),
      }
    }

    return Result.ok(result)
  }
}