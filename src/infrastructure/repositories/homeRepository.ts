import { IHomeRepository } from "@interfaces/IHomeRepository";
import { GraphQLQueries, IContentManagerSystemRepository } from "@interfaces/contentManagementSystem";
import { HomePageData, homePageDataSchema } from "@dto/home-data.dto";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { HomeDataResult } from "@app/getHomeData";
import { IHomeDataService } from "@infra/services/home-data.service";
import { Result } from "@lib/result";
import Home from "@domain/home";

export default class HomeRepository implements IHomeRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private homeDataService: IHomeDataService
  ) { }

  async getHomeData(request?: any): Promise<Result<Home, HomeDataResult>> {
    const response = await this.contentManagerRepository.get<HomePageData>(GraphQLQueries.GET_HOME_DATA, request, {
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