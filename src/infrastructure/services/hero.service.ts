import Hero from "@domain/hero";
import { HeroData } from "@dto/hero.dto";
import { PictureData } from "@dto/picture.dto";
import { IImageSetService } from "@services/imageSet.service";

export interface IHeroService {
  mapToHero(hero: HeroData): Promise<Hero>
}

export default class HeroService implements IHeroService {
  constructor(private imageSetService: IImageSetService) { }

  async mapToHero(hero: HeroData): Promise<Hero> {
    return {
      title: hero.title,
      content: hero.content || undefined,
      picture: hero.picture?.data ? await this.imageSetService.mapImageSet(hero.picture satisfies PictureData) : undefined,
      background: hero.background?.data ? await this.imageSetService.mapImageSet(hero.background satisfies PictureData) : undefined,
    }
  }
}