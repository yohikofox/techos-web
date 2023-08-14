import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import HomeData from "../model/homeData";
import { Result } from "../result";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";

export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetHomeDataUseCase implements IUseCase<any, Result<HomeData, HomeDataResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: any): Promise<Result<HomeData, HomeDataResult>> {

    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HOME_DATA, request)

    if (response.IsError) {
      return response.transferError(HomeDataResult.ERROR)
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