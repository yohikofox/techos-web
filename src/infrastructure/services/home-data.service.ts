import Home from "@domain/home";
import { HeroData } from "@dto/hero.dto";
import { HomePageData } from "@dto/home-data.dto";
import { IHeroService } from "@services/hero.service";

export interface IHomeDataService {
  mapToHome(data: HomePageData): Promise<Home>;
}
export default class HomeDataService implements IHomeDataService {
  constructor(private heroService: IHeroService) {}
  async mapToHome(data: HomePageData): Promise<Home> {
    return {
      hero: await this.heroService.mapToHero(
        data.homePage.hero satisfies HeroData
      ),
    };
  }
}
