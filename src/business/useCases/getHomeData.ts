import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import HomeData from "../model/homeData";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";

export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetHomeDataUseCase implements IUseCase<any, Result<HomeData, HomeDataResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: any): Promise<Result<HomeData, HomeDataResult>> {

    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_HOME_DATA, request)

    if (response.IsError) {
      return response.transferError(HomeDataResult.ERROR)
    }

    const result: HomeData = {
      hero: {
        title: response.Value.homePage.data.attributes.hero.title,
        content: response.Value.homePage.data.attributes.hero.content,
        picture: {
          src: response.Value.homePage.data.attributes.hero.picture.data.attributes.url,
          width: response.Value.homePage.data.attributes.hero.picture.data.attributes.width,
          height: response.Value.homePage.data.attributes.hero.picture.data.attributes.height,
          name: response.Value.homePage.data.attributes.hero.picture.data.attributes.name,
        },
        background: {
          src: response.Value.homePage.data.attributes.hero.background.data.attributes.url,
          width: response.Value.homePage.data.attributes.hero.background.data.attributes.width,
          height: response.Value.homePage.data.attributes.hero.background.data.attributes.height,
          name: response.Value.homePage.data.attributes.hero.background.data.attributes.name,
        },
      }
    }

    return Result.ok(result)
  }
}