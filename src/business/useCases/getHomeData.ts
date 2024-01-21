import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";
import { IHomeDataService } from "../services/home-data.service";
import { HomePageData, homePageDataSchema } from "../services/dto/home-data.dto";
import Home from "../model/home";


export enum HomeDataResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetHomeDataUseCase implements IUseCase<any, Result<Home, HomeDataResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private homeDataService: IHomeDataService
  ) { }
  async execute(request?: any): Promise<Result<Home, HomeDataResult>> {

    const response = await this.cmsRepository.get<HomePageData>(GraphQLQueries.GET_HOME_DATA, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.HOME],
      schema: homePageDataSchema
    })

    if (response.IsError) {
      return response.transferError(HomeDataResult.ERROR)
    }

    if (!response.Value.homePage?.data) {
      return response.transferError(HomeDataResult.NO_DATA_FOUND)
    }

    const result: Home = await this.homeDataService.mapToHome(response.Value satisfies HomePageData)

    return Result.ok(result)
  }
}
