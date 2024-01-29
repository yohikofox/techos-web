import { HomeDataResult } from "@app/getHomeData";
import Home from "@domain/home";
import { HomePageData, homePageDataSchema } from "@dto/home-data.dto";
import { IHomeDataService } from "@infra/services/home-data.service";
import {
  GraphQLQueries,
  IContentManagerSystemRepository,
} from "@interfaces/IContentManagerSystemRepository";
import { IHomeRepository } from "@interfaces/IHomeRepository";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "@lib/result";

export default class HomeRepository implements IHomeRepository {
  constructor(
    private contentManagerRepository: IContentManagerSystemRepository,
    private homeDataService: IHomeDataService
  ) {}

  async getHomeData(request?: void): Promise<Result<Home, HomeDataResult>> {
    const response = await this.contentManagerRepository.get<
      HomePageData,
      void
    >(GraphQLQueries.GET_HOME_DATA, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.HOME],
      schema: homePageDataSchema,
    });

    if (response.IsError) {
      return response.transferError(HomeDataResult.ERROR);
    }

    if (response.Value.homePage?.data === undefined) {
      return response.transferError(HomeDataResult.NO_DATA_FOUND);
    }

    const result: Home = await this.homeDataService.mapToHome(
      response.Value satisfies HomePageData
    );

    return Result.ok(result);
  }
}
